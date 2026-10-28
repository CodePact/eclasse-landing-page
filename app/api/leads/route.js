const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d\s().-]+$/;

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

  // A captura fica indisponível até existir uma integração com persistência real.
  return Response.json(
    { error: "A captura de contatos está temporariamente indisponível." },
    { status: 503 },
  );
}
