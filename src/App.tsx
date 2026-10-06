import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  FileSearch,
  Flame,
  HeartPulse,
  Hotel,
  Landmark,
  Mail,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Scale,
  ShieldCheck,
  Ship,
  Store,
  Truck,
  Warehouse,
  Wrench,
  X,
  Zap,
} from "lucide-react";

type Icon = typeof ShieldCheck;

const WEB3FORMS_ACCESS_KEY = "fb16044c-1843-49ec-b617-3aa9beb596d5";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const solutions: {
  title: string;
  description: string;
  icon: Icon;
}[] = [
  {
    title: "Property & Fire Insurance",
    description:
      "Protection for buildings, stock, equipment and key operating assets.",
    icon: Flame,
  },
  {
    title: "Engineering Insurance",
    description:
      "Solutions for projects, machinery, erection, installation and operational risks.",
    icon: Wrench,
  },
  {
    title: "Marine Insurance",
    description:
      "Cargo and transit protection across supply-chain movements.",
    icon: Ship,
  },
  {
    title: "Liability Insurance",
    description:
      "Thoughtful cover for legal liabilities and third-party exposures.",
    icon: Scale,
  },
  {
    title: "Motor Insurance",
    description:
      "Protection options for commercial fleets and individual vehicles.",
    icon: Truck,
  },
  {
    title: "Group Health & Personal Accident",
    description:
      "Employee-focused health and accident protection solutions.",
    icon: HeartPulse,
  },
  {
    title: "Business Interruption",
    description:
      "Support against insured disruptions affecting business continuity.",
    icon: Zap,
  },
  {
    title: "Specialty & Corporate Risks",
    description:
      "Structured solutions for complex and evolving business exposures.",
    icon: ShieldCheck,
  },
];

const industries: {
  title: string;
  icon: Icon;
}[] = [
  { title: "Manufacturing", icon: Building2 },
  { title: "Infrastructure & Construction", icon: Landmark },
  { title: "Logistics & Warehousing", icon: Warehouse },
  { title: "Retail & Commercial", icon: Store },
  { title: "Hospitality", icon: Hotel },
  { title: "SMEs & Corporate", icon: PackageCheck },
];

const claims = [
  {
    number: "01",
    title: "Intimate",
    detail: "Notify us about the incident and immediate circumstances.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Document",
    detail: "We help organise the relevant information and documents.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Assess",
    detail: "Coordinate with the involved parties through the assessment.",
    icon: FileSearch,
  },
  {
    number: "04",
    title: "Resolve",
    detail: "Support clear communication through the claim's conclusion.",
    icon: CircleCheck,
  },
];

const navigation = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Insurance Solutions", "#solutions"],
  ["Industries", "#industries"],
  ["Claims Assistance", "#claims"],
  ["Contact", "#contact"],
] as const;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [botOpen, setBotOpen] = useState(false);
  const [botStep, setBotStep] = useState(1);
  const [botRequirement, setBotRequirement] = useState("");
  const [botName, setBotName] = useState("");
  const [botPhone, setBotPhone] = useState("");
  const [botSending, setBotSending] = useState(false);
  const [botSent, setBotSent] = useState(false);
  const [botError, setBotError] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function closeMenu() {
    setMenuOpen(false);
  }

  function resetBot() {
    setBotStep(1);
    setBotRequirement("");
    setBotName("");
    setBotPhone("");
    setBotSending(false);
    setBotSent(false);
    setBotError("");
  }

  function openBot() {
    setBotOpen(true);
    setBotError("");
  }

  function closeBot() {
    setBotOpen(false);
    resetBot();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    setSubmitted(false);
    setSubmitError("");

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Insurance Enquiry - Gitvisha");
    formData.append("from_name", "Gitvisha Website");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        setSubmitted(true);
      } else {
        setSubmitError(
          result.message || "Unable to send enquiry. Please try again."
        );
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please check your internet connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleBotSubmit() {
    if (!botName.trim() || !botPhone.trim()) return;

    setBotSending(true);
    setBotError("");

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Chatbot Enquiry - Gitvisha");
    formData.append("from_name", "Gitvisha Website Chatbot");
    formData.append("Name", botName.trim());
    formData.append("Phone", botPhone.trim());
    formData.append(
      "Insurance Requirement",
      botRequirement || "Talk to an Expert"
    );
    formData.append("Source", "Website Chatbot");
    formData.append(
      "message",
      `Chatbot enquiry received from ${botName.trim()} (${botPhone.trim()}). Requirement: ${
        botRequirement || "Talk to an Expert"
      }.`
    );

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setBotSent(true);
      } else {
        setBotError(
          result.message || "Unable to send enquiry. Please try again."
        );
      }
    } catch {
      setBotError(
        "Something went wrong. Please check your internet connection and try again."
      );
    } finally {
      setBotSending(false);
    }
  }

  return (
    <div className="site-shell">
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#home"
            aria-label="Gitvisha home"
          >
            <img
              src="/assets/gitvisha-logo.png"
              alt="Gitvisha - Infinite Trust, Secure Peace"
            />
          </a>

          <nav
            className={`desktop-nav ${menuOpen ? "is-mobile-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navigation.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}

            <a
              className="nav-cta"
              href="#contact"
              onClick={closeMenu}
            >
              Get a Quote
              <ArrowRight size={17} />
            </a>
          </nav>

          <button
            className="mobile-menu-btn"
            type="button"
            aria-label={
              menuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                INSURANCE
                <span />
                RISK
                <span />
                CLAIMS
              </div>

              <h1>
                Protecting What Matters.
                <strong>Securing What's Ahead.</strong>
              </h1>

              <p>
                Thoughtful insurance broking and risk advisory to help
                businesses and individuals understand exposure, choose
                suitable protection, and navigate claims with confidence.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  Get a Quote
                  <ArrowRight size={18} />
                </a>

                <a className="btn btn-ghost" href="#solutions">
                  Explore Solutions
                  <ChevronRight size={18} />
                </a>
              </div>

              <div className="hero-note">
                <ShieldCheck size={20} />
                <span>Clarity in cover. Consistency in support.</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="visual-ring ring-one" />
              <div className="visual-ring ring-two" />

              <div className="visual-core">
                <ShieldCheck size={92} strokeWidth={1.15} />
              </div>

              <div className="visual-line visual-line-left" />
              <div className="visual-line visual-line-right" />
              <div className="visual-dot visual-dot-one" />
              <div className="visual-dot visual-dot-two" />
            </div>
          </div>
        </section>

        {/* INSURANCE SOLUTIONS */}
        <section id="solutions" className="section section-light">
          <div className="container">
            <div className="section-intro">
              <div>
                <div className="section-kicker">Insurance solutions</div>
                <h2>
                  Protection structured around real-world risk.
                </h2>
              </div>

              <p>
                From core business assets to complex corporate exposures,
                we help identify and evaluate relevant coverage options.
              </p>
            </div>

            <div className="solution-grid">
              {solutions.map(({ title, description, icon: Icon }, index) => (
                <article className="solution-card" key={title}>
                  <div className="card-top">
                    <div className="icon-box">
                      <Icon size={22} strokeWidth={1.65} />
                    </div>
                    <span>0{index + 1}</span>
                  </div>

                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="section-intro compact">
              <div>
                <div className="section-kicker">About Gitvisha</div>
                <h2>Advice grounded in understanding, not assumptions.</h2>
              </div>

              <p>
                Gitvisha is an insurance broking and risk advisory firm
                focused on helping clients make informed protection
                decisions. We begin by understanding your operations,
                assets, people and priorities, then work to identify relevant
                insurance solutions and support across the policy lifecycle.
              </p>
            </div>

            <div className="about-statement">
              <blockquote>
                “Insurance should create clarity and confidence — not
                complexity.”
              </blockquote>

              <p>
                Our role is to make risk easier to understand, coverage
                easier to evaluate, and the claims process easier to
                navigate.
              </p>
            </div>
          </div>
        </section>

        {/* WHY GITVISHA */}
        <section className="section dark-section">
          <div className="container">
            <div className="section-intro dark-intro compact">
              <div>
                <div className="section-kicker">Why Gitvisha</div>
                <h2>A steady partner across the insurance journey.</h2>
              </div>
            </div>

            <div className="strength-grid">
              {[
                "Tailored risk solutions",
                "End-to-end policy support",
                "Dedicated claims assistance",
                "Transparent advisory",
                "Corporate risk expertise",
              ].map((item, index) => (
                <div className="strength-item" key={item}>
                  <span>0{index + 1}</span>
                  <Check size={19} />
                  <h3>{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="section section-light">
          <div className="container industries-grid">
            <div className="section-intro compact">
              <div>
                <div className="section-kicker">Industries</div>
                <h2>Industry context shapes better risk conversations.</h2>
              </div>

              <p>
                Every sector faces a different blend of operational, asset,
                liability and people risks.
              </p>
            </div>

            <div className="industry-list">
              {industries.map(({ title, icon: Icon }) => (
                <div className="industry-item" key={title}>
                  <Icon size={24} strokeWidth={1.55} />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLAIMS */}
        <section id="claims" className="section claims-section">
          <div className="container">
            <div className="claims-header">
              <div className="section-intro compact">
                <div>
                  <div className="section-kicker">Claims assistance</div>
                  <h2>Clear support when it matters most.</h2>
                </div>

                <p>
                  We help you understand requirements, organise information
                  and coordinate throughout the claims process.
                </p>
              </div>

              <a className="btn btn-primary" href="#contact">
                Need help with a claim?
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="claims-grid">
              {claims.map(({ number, title, detail, icon: Icon }, index) => (
                <article className="claim-card" key={title}>
                  <div className="claim-top">
                    <Icon size={23} />
                    <span>{number}</span>
                  </div>

                  <h3>{title}</h3>
                  <p>{detail}</p>

                  {index < claims.length - 1 && (
                    <div className="claim-arrow">
                      <ChevronRight size={18} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / QUOTE */}
        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <div className="section-intro compact">
                <div>
                  <div className="section-kicker">Start a conversation</div>
                  <h2>Let's understand your insurance needs.</h2>
                </div>

                <p>
                  Share a few details and our team can follow up to discuss
                  the next step.
                </p>
              </div>

              <div className="contact-details">
                <a href="mailto:info@gitvishainsurance.com">
                  <Mail size={20} />
                  info@gitvishainsurance.com
                </a>

                <a href="tel:+918287739726">
                  <Phone size={20} />
                  +91 XXXXX XXXXX
                </a>

                <div>
                  <Building2 size={20} />
                  Delhi NCR, India
                </div>
              </div>
            </div>

            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input
                    name="name"
                    placeholder="Your full name"
                    minLength={2}
                    required
                  />
                </label>

                <label>
                  <span>Company Name</span>
                  <input
                    name="company"
                    placeholder="Company or organisation"
                    minLength={2}
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Phone</span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    pattern="[0-9+() -]{8,}"
                    required
                  />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Insurance Requirement</span>
                <select name="requirement" defaultValue="" required>
                  <option value="" disabled>
                    Select a requirement
                  </option>

                  {solutions.map((solution) => (
                    <option key={solution.title} value={solution.title}>
                      {solution.title}
                    </option>
                  ))}

                  <option value="Claims Assistance">Claims Assistance</option>
                  <option value="Other / Not Sure">Other / Not Sure</option>
                </select>
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  placeholder="Tell us briefly about your requirement"
                  minLength={10}
                  required
                />
              </label>

              <div className="form-footer">
                <p>
                  Your enquiry will be sent to the email configured in your
                  Web3Forms account.
                </p>

                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Enquiry"}
                  {!submitting && <ArrowRight size={18} />}
                </button>
              </div>

              {submitted && (
                <div className="form-success" role="status">
                  <CircleCheck size={21} />
                  <div>
                    <strong>Enquiry sent successfully.</strong>
                    <span>
                      Thank you. Our team will get back to you shortly.
                    </span>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="form-error" role="alert">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <img
                src="/assets/png.png"
                alt="Gitvisha - Infinite Trust, Secure Peace"
                className="footer-logo"
              />
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              {navigation.slice(1).map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Gitvisha. All rights reserved.</span>

            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span>·</span>
              <a href="#terms">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= CHATBOT ================= */}
      <div className={`chatbot-wrapper ${botOpen ? "is-open" : ""}`}>
        {botOpen && (
          <div className="chatbot-window" role="dialog" aria-label="Gitvisha Assistant">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <MessageCircle size={18} />
                </div>

                <div>
                  <strong>Gitvisha Assistant</strong>
                  <span>We're here to help</span>
                </div>
              </div>

              <button
                className="chatbot-close"
                type="button"
                onClick={closeBot}
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>

            <div className="chatbot-body">
              {botSent ? (
                <div className="chatbot-success">
                  <CircleCheck size={38} />
                  <strong>Thank you!</strong>
                  <p>
                    Your enquiry has been received. Our team will get back to
                    you shortly.
                  </p>
                  <button
                    type="button"
                    className="chatbot-reset"
                    onClick={resetBot}
                  >
                    Start Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="chat-message bot-message">
                    👋 Hi! Welcome to Gitvisha.
                    <br />
                    How can we help you today?
                  </div>

                  {botStep === 1 && (
                    <div className="chat-options">
                      <button type="button" onClick={() => setBotStep(2)}>
                        Get a Quote
                      </button>
                      <button type="button" onClick={() => setBotStep(2)}>
                        Understand Insurance
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBotRequirement("Claims Assistance");
                          setBotStep(3);
                        }}
                      >
                        Claims Assistance
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBotRequirement("Talk to an Expert");
                          setBotStep(3);
                        }}
                      >
                        Talk to an Expert
                      </button>
                    </div>
                  )}

                  {botStep === 2 && (
                    <>
                      <div className="chat-message bot-message">
                        Great! What type of insurance are you looking for?
                      </div>

                      <div className="chat-options">
                        {solutions.map((solution) => (
                          <button
                            key={solution.title}
                            type="button"
                            onClick={() => {
                              setBotRequirement(solution.title);
                              setBotStep(3);
                            }}
                          >
                            {solution.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {botStep === 3 && (
                    <>
                      <div className="chat-message bot-message">
                        Please share your details and our team will contact you.
                      </div>

                      <div className="chatbot-form">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={botName}
                          onChange={(event) => setBotName(event.target.value)}
                          autoComplete="name"
                        />

                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          value={botPhone}
                          onChange={(event) => setBotPhone(event.target.value)}
                          autoComplete="tel"
                        />

                        <button
                          type="button"
                          onClick={handleBotSubmit}
                          disabled={
                            botSending ||
                            !botName.trim() ||
                            !botPhone.trim()
                          }
                        >
                          {botSending ? "Sending..." : "Send Enquiry"}
                          {!botSending && <ArrowRight size={16} />}
                        </button>
                      </div>

                      {botError && (
                        <div className="form-error" role="alert">
                          {botError}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="chatbot-footer">
              Gitvisha · Infinite Trust, Secure Peace
            </div>
          </div>
        )}

        <button
          className="chatbot-button"
          type="button"
          onClick={() => {
            if (botOpen) {
              closeBot();
            } else {
              openBot();
            }
          }}
          aria-label={botOpen ? "Close Gitvisha chatbot" : "Open Gitvisha chatbot"}
        >
          {botOpen ? <X size={23} /> : <MessageCircle size={23} />}
          {!botOpen && <span className="chatbot-pulse" />}
        </button>
      </div>
    </div>
  );
}

export default App;
