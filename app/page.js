"use client";

import { useState } from "react";
import { Analytics } from "@vercel/analytics/next";

const features = [
  {
    title: "Comunicação instantânea",
    text: "Notificações automáticas para pais e alunos via WhatsApp e app.",
    image: "communication.fd6ac017.svg",
  },
  {
    title: "Transparência total",
    text: "Acompanhamento em tempo real de notas, presença e comportamento.",
    image: "conduct.875f03a6.svg",
  },
  {
    title: "Organização eficiente",
    text: "Cronogramas e informações centralizadas para alunos, pais e professores.",
    image: "cronogram.abc94f5c.svg",
  },
];

const questions = [
  [
    "Há suporte técnico disponível para escolas e usuários?",
    "Sim. Oferecemos suporte técnico para escolas e usuários, com atendimento dedicado e SLA de até 12 horas.",
  ],
  [
    "É possível integrar o app com outros sistemas escolares?",
    "No momento, não há integração direta com outros sistemas. É possível importar ou migrar dados para a plataforma.",
  ],
  [
    "Quantos usuários podem ser cadastrados?",
    "O número de usuários é ilimitado, para que toda a comunidade escolar possa usar a plataforma.",
  ],
  [
    "Qual é o custo e o modelo de assinatura do app?",
    "O modelo é baseado em assinaturas mensais. Consulte nossa equipe para conhecer os planos disponíveis para sua instituição.",
  ],
  [
    "As notificações via WhatsApp têm custo adicional?",
    "As notificações via WhatsApp possuem um pequeno custo adicional e seu uso é opcional para a instituição.",
  ],
  [
    "Como os pais justificam ausências pelo app?",
    "Na conta do responsável, é possível informar que o aluno estará ausente e, se desejar, preencher uma justificativa.",
  ],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function submitLead(event) {
    event.preventDefault();
    setSending(true);
    setFeedback("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
        }),
      });
      const result = await response.json();
      setFeedback(result.error || "Não foi possível enviar seus dados.");
    } catch {
      setFeedback("Não foi possível conectar. Tente novamente mais tarde.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="EClasse, início">
          <span className="brand-mark">e</span>classe
          <span className="brand-dot">.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">
            {menuOpen ? "Fechar menu" : "Abrir menu"}
          </span>
          <span />
          <span />
        </button>
        <nav
          id="main-nav"
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Navegação principal"
        >
          <a onClick={() => setMenuOpen(false)} href="#home">
            Home
          </a>
          <a onClick={() => setMenuOpen(false)} href="#resources">
            Recursos
          </a>
          <a onClick={() => setMenuOpen(false)} href="#faq">
            FAQ
          </a>
          <a
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
            href="#contact"
          >
            Comece hoje mesmo!
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <span className="eyebrow">A escola mais perto de todos</span>
            <h1>
              Colabore com um mundo <span>mais educativo</span>
            </h1>
            <p className="hero-lead">
              Conectando escolas, famílias e alunos: educação na palma da mão!
            </p>
            <a className="button button-primary" href="#contact">
              Comece hoje mesmo <span aria-hidden="true">↗</span>
            </a>
            <div className="hero-note">
              <span className="note-dot" /> Mais conexão, transparência e
              tranquilidade no dia a dia escolar.
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <img
              className="class-art"
              src="/assets/class.6ad9b498.svg"
              alt="Ilustração de alunos aprendendo juntos"
            />
          </div>
        </section>

        <section
          className="features section"
          aria-label="Benefícios do EClasse"
        >
          {features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className={`feature-icon feature-icon-${index}`}>
                <img src={`/assets/${feature.image}`} alt="" />
              </div>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="resources section" id="resources">
          <div className="section-heading">
            <span className="eyebrow">Tudo em um só lugar</span>
            <h2>
              Descubra como a tecnologia pode{" "}
              <span>transformar sua escola</span>
            </h2>
            <p>
              Uma solução completa e integrada para diretores, professores, pais
              e alunos — com eficiência, transparência e engajamento em cada
              etapa do processo escolar.
            </p>
          </div>
          <div className="resource-grid">
            <article className="resource-card resource-teacher">
              <div className="resource-heading">
                <span className="resource-number">01</span>
                <h3>Para professores</h3>
              </div>
              <p>Mais tempo para ensinar, menos tarefas repetitivas.</p>
              <ul>
                <li>Registro de presença com notificações automáticas.</li>
                <li>Avaliação de comportamento e acompanhamento contínuo.</li>
                <li>Lançamento de notas de forma prática e rápida.</li>
              </ul>
              <img
                src="/assets/bag-bird.f983844c.svg"
                alt="Ilustração de professor e aluno"
              />
            </article>
            <article className="resource-card resource-family">
              <div className="resource-heading">
                <span className="resource-number">02</span>
                <h3>Para as famílias</h3>
              </div>
              <p>Informação clara para acompanhar cada etapa.</p>
              <ul>
                <li>Acesso em tempo real a faltas, notas e comportamento.</li>
                <li>Comunicados automáticos via WhatsApp ou pelo app.</li>
                <li>Registro de ausências com justificativa opcional.</li>
              </ul>
              <img
                src="/assets/doubt-dog.f98df8ea.svg"
                alt="Ilustração de uma família"
              />
            </article>
            <article className="resource-card resource-student">
              <div className="resource-heading">
                <span className="resource-number">03</span>
                <h3>Para os alunos</h3>
              </div>
              <p>Uma rotina escolar organizada e acessível.</p>
              <ul>
                <li>Visualização do cronograma diário de disciplinas.</li>
                <li>Comunicados da escola e dos professores direto no app.</li>
              </ul>
              <img
                src="/assets/cronogram.abc94f5c.svg"
                alt="Ilustração de cronograma escolar"
              />
            </article>
          </div>
        </section>

        <section className="faq-section section" id="faq">
          <div className="faq-intro">
            <span className="eyebrow">Estamos aqui para ajudar</span>
            <h2>
              Perguntas <span>frequentes</span>
            </h2>
            <p>Encontre respostas rápidas sobre a plataforma EClasse.</p>
            <img
              src="/assets/support-rat.8b7436ad.svg"
              alt="Ilustração de suporte"
            />
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>
                  {question}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">Vamos conversar?</span>
            <h2>
              Descubra o que o EClasse pode fazer pela <span>sua escola</span>
            </h2>
            <p>
              Deixe seus dados e nossa equipe entrará em contato para apresentar
              a plataforma.
            </p>
            <div className="contact-illustration">
              <img
                src="/assets/communication.fd6ac017.svg"
                alt="Ilustração de comunicação entre escola e famílias"
              />
            </div>
          </div>
          <form className="contact-form" onSubmit={submitLead}>
            <h3>Entre em contato</h3>
            <label htmlFor="lead-name">Nome</label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              minLength="2"
              maxLength="120"
              required
              placeholder="Seu nome"
            />
            <label htmlFor="lead-email">E-mail</label>
            <input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength="254"
              required
              placeholder="voce@escola.com.br"
            />
            <label htmlFor="lead-phone">Telefone</label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              minLength="8"
              maxLength="30"
              required
              placeholder="(00) 00000-0000"
            />
            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={sending}
            >
              {sending ? "Enviando…" : "Enviar"}
              <span aria-hidden="true">↗</span>
            </button>
            <p className="form-disclaimer">
              A captura de contatos está temporariamente indisponível. Seus
              dados não serão armazenados.
            </p>
            <p className="form-feedback" role="status" aria-live="polite">
              {feedback}
            </p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-mark">e</span>classe
          <span className="brand-dot">.</span>
        </a>
        <p>Conectando escolas, famílias e alunos.</p>
        <span>
          Uma solução{" "}
          <a
            href="https://codepact.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodePact
          </a>
        </span>
      </footer>

      <Analytics />
    </>
  );
}
