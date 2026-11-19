const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d\s().-]+$/;

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

export async function POST(request) {
  let lead;

  try {
    lead = await request.json();
  } catch {
    return Response.json({ error: "Corpo JSON inválido." }, { status: 400 });
  }

  const phoneDigits =
    typeof lead?.phone === "string"
      ? (lead.phone.match(/\d/g) || []).length
      : 0;
  const valid =
    lead &&
    typeof lead.name === "string" &&
    lead.name.trim().length >= 2 &&
    lead.name.trim().length <= 120 &&
    typeof lead.email === "string" &&
    lead.email.length <= 254 &&
    emailPattern.test(lead.email.trim()) &&
    typeof lead.phone === "string" &&
    lead.phone.trim().length <= 30 &&
    phonePattern.test(lead.phone.trim()) &&
    phoneDigits >= 8 &&
    phoneDigits <= 15;

  if (!valid) {
    return Response.json(
      { error: "Confira nome, e-mail e telefone." },
      { status: 400 },
    );
  }

  const cleanLead = {
    name: cleanText(lead.name, 120),
    email: cleanText(lead.email, 254),
    phone: cleanText(lead.phone, 30),
  };
  const apiKey = process.env.RESEND_API_KEY;
  const recipient =
    process.env.CONTACT_EMAIL ||
    process.env.ECLASSE_CONTACT_EMAIL;
  const from = process.env.EMAIL_FROM || "EClasse <contato@eclasse.com.br>";

  if (!apiKey || !recipient || !emailPattern.test(recipient.trim())) {
    console.error("Lead email service is not configured");
    return Response.json(
      { error: "O envio está indisponível no momento. Tente novamente mais tarde." },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: cleanLead.email,
        subject: `Novo contato pelo site - ${cleanLead.name}`,
        text: [
          "Novo contato enviado pelo formulário do site EClasse",
          "",
          `Nome: ${cleanLead.name}`,
          `E-mail: ${cleanLead.email}`,
          `Telefone: ${cleanLead.phone}`,
        ].join("\n"),
        html: `
          <h2>Novo contato pelo site EClasse</h2>
          <p><strong>Nome:</strong> ${escapeHtml(cleanLead.name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(cleanLead.email)}</p>
          <p><strong>Telefone:</strong> ${escapeHtml(cleanLead.phone)}</p>
        `,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("Lead email provider returned an error", {
        status: response.status,
      });
      return Response.json(
        { error: "Não foi possível enviar seus dados. Tente novamente." },
        { status: 502 },
      );
    }

    return Response.json({
      success: true,
      message: "Mensagem enviada com sucesso!",
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      console.error("Lead email provider timed out");
      return Response.json(
        { error: "O serviço demorou para responder. Tente novamente." },
        { status: 504 },
      );
    }

    console.error("Lead email provider request failed");
    return Response.json(
      { error: "Não foi possível enviar seus dados. Tente novamente." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
