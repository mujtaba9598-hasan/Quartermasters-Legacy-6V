import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Quartermasters F.Z.C",
  description:
    "Privacy Policy for Quartermasters F.Z.C. Learn how we collect, use, store, and protect your personal data in compliance with UAE PDPL, GDPR, CCPA/CPRA, and CAN-SPAM regulations.",
  openGraph: {
    title: "Privacy Policy — Quartermasters F.Z.C",
    description:
      "Privacy Policy for Quartermasters F.Z.C. Learn how we collect, use, store, and protect your personal data.",
    type: "website",
    locale: "en_AE",
  },
};

/* ------------------------------------------------------------------ */
/*  SECTION COMPONENT — glassmorphism card for each policy section     */
/* ------------------------------------------------------------------ */
function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div
        className="glass rounded-xl p-8 md:p-10"
        style={{
          borderColor: "transparent",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <div className="mb-6 flex items-start gap-4">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              background: "rgba(200, 135, 46, 0.1)",
              color: "var(--color-gold)",
            }}
          >
            {number}
          </span>
          <h2
            className="text-xl font-semibold md:text-2xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>
        </div>
        <div
          className="space-y-4 text-sm leading-relaxed md:text-base md:leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TABLE OF CONTENTS NAV                                              */
/* ------------------------------------------------------------------ */
const tocItems = [
  { id: "data-controller", label: "1. Data Controller" },
  { id: "data-we-collect", label: "2. Data We Collect" },
  { id: "legal-basis", label: "3. Legal Basis for Processing" },
  { id: "purpose-limitation", label: "4. Purpose of Processing" },
  { id: "data-retention", label: "5. Data Retention" },
  { id: "third-party-sharing", label: "6. Third-Party Data Sharing" },
  { id: "international-transfers", label: "7. International Transfers" },
  { id: "your-rights", label: "8. Your Rights" },
  { id: "cookie-policy", label: "9. Cookie Policy" },
  { id: "ai-automated-decisions", label: "10. AI & Automated Decisions" },
  { id: "childrens-data", label: "11. Children's Data" },
  { id: "data-security", label: "12. Data Security" },
  { id: "changes-to-policy", label: "13. Changes to This Policy" },
  { id: "contact-complaints", label: "14. Contact & Complaints" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* ======================================================== */}
        {/*  HERO                                                     */}
        {/* ======================================================== */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.12em",
                  color: "var(--color-gold)",
                }}
              >
                Legal &middot; Compliance
              </p>
              <h1
                className="mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                Privacy Policy
              </h1>
              <p
                className="max-w-2xl text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                This Privacy Policy explains how Quartermasters F.Z.C
                (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                collects, uses, discloses, and safeguards your personal data
                when you visit{" "}
                <span style={{ color: "var(--color-gold)" }}>
                  example.com
                </span>{" "}
                or interact with our services. We are committed to protecting
                your privacy in accordance with the UAE Personal Data Protection
                Law (PDPL), the EU General Data Protection Regulation (GDPR),
                the California Consumer Privacy Act / California Privacy Rights
                Act (CCPA/CPRA), and the CAN-SPAM Act.
              </p>
              <div
                className="mt-6 flex flex-wrap items-center gap-4 text-xs"
                style={{ color: "var(--text-light)" }}
              >
                <span
                  className="rounded-full border px-3 py-1"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  Effective: 12 February 2026
                </span>
                <span
                  className="rounded-full border px-3 py-1"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  Last Updated: 12 February 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/*  TABLE OF CONTENTS + POLICY BODY                          */}
        {/* ======================================================== */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
              {/* -------------------------------------------------- */}
              {/*  SIDEBAR — Table of Contents (sticky on desktop)    */}
              {/* -------------------------------------------------- */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-28">
                  <nav
                    className="glass rounded-xl p-6"
                    aria-label="Table of contents"
                  >
                    <p
                      className="mb-4 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-gold)",
                      }}
                    >
                      Contents
                    </p>
                    <ol className="space-y-2">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block text-sm transition-colors"
                            style={{ color: "var(--text-light)" }}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>

              {/* -------------------------------------------------- */}
              {/*  MAIN CONTENT — Policy Sections                     */}
              {/* -------------------------------------------------- */}
              <div className="flex flex-col gap-8 lg:col-span-3">
                {/* ================================================ */}
                {/*  1. DATA CONTROLLER                               */}
                {/* ================================================ */}
                <PolicySection
                  id="data-controller"
                  number="01"
                  title="Data Controller Identity & Contact Information"
                >
                  <p>
                    The data controller responsible for your personal data is:
                  </p>
                  <div
                    className="rounded-lg p-6"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <p
                      className="mb-1 text-base font-semibold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Quartermasters F.Z.C
                    </p>
                    <p>Free Zone Company &mdash; Limited Liability</p>
                    <p>(removed — placeholder for US registration)</p>
                    <p>
                      California, United States
                    </p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:hello@example.com"
                        style={{ color: "var(--color-gold)" }}
                      >
                        hello@example.com
                      </a>
                    </p>
                    <p>
                      Website:{" "}
                      <a
                        href="https://example.com"
                        style={{ color: "var(--color-gold)" }}
                      >
                        example.com
                      </a>
                    </p>
                  </div>
                  <p>
                    Quartermasters F.Z.C is licensed by relevant California regulatory authorities and operates under applicable law. For any
                    privacy-related inquiries or to exercise your data subject
                    rights, please contact us at{" "}
                    <a
                      href="mailto:hello@example.com"
                      style={{ color: "var(--color-gold)" }}
                    >
                      hello@example.com
                    </a>
                    .
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  2. DATA WE COLLECT                               */}
                {/* ================================================ */}
                <PolicySection
                  id="data-we-collect"
                  number="02"
                  title="What Personal Data We Collect"
                >
                  <p>
                    We collect personal data only to the extent necessary for the
                    purposes described in this policy. The categories of data we
                    collect are as follows:
                  </p>

                  {/* 2a — Contact Form */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    2.1 Contact Form Data
                  </h3>
                  <p>
                    When you submit an inquiry via our contact form, we collect:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Organization / company name (optional)</li>
                    <li>Service of interest</li>
                    <li>Message content</li>
                  </ul>

                  {/* 2b — Cookie / Analytics */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    2.2 Cookie & Analytics Data
                  </h3>
                  <p>
                    We use cookies and analytics tools (PostHog) to collect
                    technical and usage data, including:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>IP address (anonymized where technically feasible)</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Device type</li>
                    <li>Pages visited, time on page, and interaction events</li>
                    <li>Referring URL</li>
                    <li>Preference settings (e.g., language, theme)</li>
                  </ul>

                  {/* 2c — AI Chatbot */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    2.3 AI Chatbot Conversation Logs (Future)
                  </h3>
                  <p>
                    We plan to introduce an AI-powered assistant (&ldquo;Q AI
                    Assistant&rdquo;) that will process natural language queries.
                    When this feature is active, we may collect:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>
                      Text of your conversation with the AI assistant
                    </li>
                    <li>Session identifiers</li>
                    <li>Timestamps</li>
                  </ul>
                  <p>
                    Conversation data may be processed by Anthropic (Claude API)
                    as our AI infrastructure provider. No conversation data will
                    be used to train third-party AI models without your explicit
                    consent.
                  </p>

                  {/* 2d — Client Portal */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    2.4 Client Portal Data (Future)
                  </h3>
                  <p>
                    When our client portal becomes available, registered users
                    may provide:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>Account credentials (email and password)</li>
                    <li>Project information and documents</li>
                    <li>Internal messages and communications</li>
                    <li>Profile information</li>
                  </ul>

                  {/* 2e — Payment */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    2.5 Payment Information (Future)
                  </h3>
                  <p>
                    Payment processing will be handled by PCI-DSS compliant
                    third-party providers (Stripe and/or PayTabs).{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      We do not store credit card numbers, CVV codes, or full
                      payment card details on our servers.
                    </strong>{" "}
                    We may receive and retain:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>Transaction reference IDs</li>
                    <li>Billing name and address</li>
                    <li>Last four digits of the payment card (for reference)</li>
                    <li>Transaction amounts and dates</li>
                  </ul>

                  {/* 2f — Analytics */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    2.6 Analytics Data
                  </h3>
                  <p>
                    We use PostHog for product analytics. Data collected
                    includes:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>Page views and navigation paths</li>
                    <li>Click and interaction events</li>
                    <li>Feature usage patterns</li>
                    <li>Session recordings (if enabled, with sensitive fields masked)</li>
                    <li>Performance metrics</li>
                  </ul>
                </PolicySection>

                {/* ================================================ */}
                {/*  3. LEGAL BASIS FOR PROCESSING                   */}
                {/* ================================================ */}
                <PolicySection
                  id="legal-basis"
                  number="03"
                  title="Legal Basis for Processing"
                >
                  <p>
                    We process your personal data under one or more of the
                    following legal bases, as applicable under the UAE PDPL, GDPR,
                    and CCPA/CPRA:
                  </p>

                  <div className="mt-2 space-y-4">
                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Consent (PDPL Art. 5; GDPR Art. 6(1)(a))
                      </p>
                      <p>
                        Where you have given clear, affirmative consent for us to
                        process your personal data for a specific purpose &mdash;
                        for example, subscribing to communications, enabling
                        non-essential cookies, or using the AI chatbot.
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Contractual Necessity (PDPL Art. 5; GDPR Art. 6(1)(b))
                      </p>
                      <p>
                        Processing that is necessary for the performance of a
                        contract to which you are a party, or to take
                        pre-contractual steps at your request &mdash; such as
                        responding to consultation requests, managing client
                        portal accounts, and processing payments.
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Legitimate Interest (PDPL Art. 5; GDPR Art. 6(1)(f))
                      </p>
                      <p>
                        Processing that is necessary for our legitimate business
                        interests, provided those interests are not overridden by
                        your rights &mdash; such as improving our website,
                        analyzing usage patterns, ensuring security, and
                        preventing fraud. We conduct a balancing test to ensure
                        your fundamental rights are protected.
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Legal Obligation (PDPL Art. 5; GDPR Art. 6(1)(c))
                      </p>
                      <p>
                        Processing required to comply with applicable laws,
                        regulations, or lawful government requests &mdash;
                        including UAE federal law, AFZA regulations, anti-money
                        laundering (AML) requirements, and tax obligations.
                      </p>
                    </div>
                  </div>
                </PolicySection>

                {/* ================================================ */}
                {/*  4. PURPOSE OF PROCESSING                        */}
                {/* ================================================ */}
                <PolicySection
                  id="purpose-limitation"
                  number="04"
                  title="Purpose of Processing (Purpose Limitation)"
                >
                  <p>
                    We process personal data strictly for the following purposes
                    and do not use it beyond these stated objectives:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Service delivery:
                      </strong>{" "}
                      Responding to inquiries, providing consultancy services
                      across our five licensed verticals (Human Resources
                      Consultancy, Management Consultancies, Consulting &amp;
                      R&amp;D in Technology Education, Organization &amp; Event
                      Management, and Banking Services Consultancy), and
                      managing client relationships.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Communication:
                      </strong>{" "}
                      Sending service-related correspondence, responding to your
                      messages, and (with your consent) sending updates about our
                      services.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Website improvement:
                      </strong>{" "}
                      Analyzing usage patterns, diagnosing technical issues, and
                      optimizing our platform experience.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Security:
                      </strong>{" "}
                      Protecting against unauthorized access, fraud, and abuse of
                      our systems.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Legal compliance:
                      </strong>{" "}
                      Fulfilling our obligations under UAE law, AFZA
                      regulations, and other applicable legislation.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Payment processing:
                      </strong>{" "}
                      Facilitating transactions through third-party payment
                      processors when our billing features become active.
                    </li>
                  </ul>
                </PolicySection>

                {/* ================================================ */}
                {/*  5. DATA RETENTION                                */}
                {/* ================================================ */}
                <PolicySection
                  id="data-retention"
                  number="05"
                  title="Data Retention Periods"
                >
                  <p>
                    We retain personal data only for as long as necessary to
                    fulfill the purposes outlined in this policy, unless a
                    longer retention period is required or permitted by law.
                  </p>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid var(--glass-border)",
                          }}
                        >
                          <th
                            className="pb-3 pr-6 font-semibold"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--text-primary)",
                            }}
                          >
                            Data Category
                          </th>
                          <th
                            className="pb-3 pr-6 font-semibold"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--text-primary)",
                            }}
                          >
                            Retention Period
                          </th>
                          <th
                            className="pb-3 font-semibold"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--text-primary)",
                            }}
                          >
                            Basis
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: "var(--glass-border)" }}>
                        <tr>
                          <td className="py-3 pr-6">Contact form submissions</td>
                          <td className="py-3 pr-6">24 months from submission</td>
                          <td className="py-3">Legitimate interest</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-6">Client portal data</td>
                          <td className="py-3 pr-6">
                            Duration of engagement + 5 years
                          </td>
                          <td className="py-3">Contract / legal obligation</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-6">AI chatbot logs</td>
                          <td className="py-3 pr-6">12 months</td>
                          <td className="py-3">Consent / legitimate interest</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-6">Payment transaction records</td>
                          <td className="py-3 pr-6">7 years</td>
                          <td className="py-3">Legal obligation (UAE tax law)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-6">Cookie / analytics data</td>
                          <td className="py-3 pr-6">13 months</td>
                          <td className="py-3">Consent</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-6">Server &amp; security logs</td>
                          <td className="py-3 pr-6">90 days</td>
                          <td className="py-3">Legitimate interest</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4">
                    Upon expiry of the applicable retention period, personal data
                    is securely deleted or anonymized such that it can no longer
                    be associated with you. Where anonymized data is retained for
                    statistical purposes, it is no longer considered personal
                    data.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  6. THIRD-PARTY DATA SHARING                     */}
                {/* ================================================ */}
                <PolicySection
                  id="third-party-sharing"
                  number="06"
                  title="Third-Party Data Sharing"
                >
                  <p>
                    We do not sell, rent, or trade your personal data. We share
                    data with the following categories of third-party service
                    providers, strictly for the purposes described in this
                    policy:
                  </p>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        name: "Supabase",
                        purpose: "Database & Authentication",
                        detail:
                          "Stores contact form submissions, client portal accounts, and application data. Data processed in accordance with Supabase's SOC 2 Type II certified infrastructure.",
                      },
                      {
                        name: "Vercel",
                        purpose: "Website Hosting & CDN",
                        detail:
                          "Hosts our website and processes HTTP request data (IP address, user agent). Vercel operates a global edge network and complies with GDPR.",
                      },
                      {
                        name: "Resend",
                        purpose: "Transactional Email",
                        detail:
                          "Sends service-related emails on our behalf. Receives recipient email addresses and email content. Does not use data for independent marketing.",
                      },
                      {
                        name: "Stripe / PayTabs",
                        purpose: "Payment Processing (Future)",
                        detail:
                          "Processes payment transactions. These providers are PCI-DSS Level 1 compliant. We do not have access to full card details.",
                      },
                      {
                        name: "PostHog",
                        purpose: "Product Analytics",
                        detail:
                          "Collects anonymized usage data including page views, interactions, and session information to help us improve our platform.",
                      },
                      {
                        name: "Anthropic (Claude API)",
                        purpose: "AI Processing (Future)",
                        detail:
                          "Powers our Q AI Assistant. Conversation inputs are processed via Anthropic's API. Anthropic does not use API inputs to train its models. Data is processed under Anthropic's data processing terms.",
                      },
                    ].map((provider) => (
                      <div
                        key={provider.name}
                        className="rounded-lg p-5"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--glass-border)",
                        }}
                      >
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span
                            className="text-sm font-semibold"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--text-primary)",
                            }}
                          >
                            {provider.name}
                          </span>
                          <span
                            className="rounded-full px-2 py-0.5 text-xs"
                            style={{
                              background: "rgba(200, 135, 46, 0.1)",
                              color: "var(--color-gold)",
                            }}
                          >
                            {provider.purpose}
                          </span>
                        </div>
                        <p className="text-sm">{provider.detail}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4">
                    We may also disclose personal data where required by law,
                    regulation, legal process, or enforceable governmental
                    request, including requests from UAE authorities and AFZA.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  7. INTERNATIONAL DATA TRANSFERS                  */}
                {/* ================================================ */}
                <PolicySection
                  id="international-transfers"
                  number="07"
                  title="International Data Transfers & Safeguards"
                >
                  <p>
                    Quartermasters F.Z.C is headquartered in the United Arab
                    Emirates. However, some of our third-party service providers
                    operate in jurisdictions outside the UAE, including the
                    United States and the European Economic Area (EEA).
                  </p>
                  <p>
                    When personal data is transferred outside the UAE or the
                    EEA, we ensure that appropriate safeguards are in place, in
                    compliance with the UAE PDPL and GDPR Chapter V:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Standard Contractual Clauses (SCCs):
                      </strong>{" "}
                      We enter into EU-approved Standard Contractual Clauses
                      with service providers that process data outside the EEA.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Adequacy decisions:
                      </strong>{" "}
                      Where transfers are to jurisdictions recognized by the
                      European Commission or the UAE Data Office as providing an
                      adequate level of data protection.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Data Processing Agreements (DPAs):
                      </strong>{" "}
                      All third-party processors are bound by DPAs that require
                      them to process data only on our instructions and to
                      implement appropriate technical and organizational security
                      measures.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Supplementary measures:
                      </strong>{" "}
                      Including encryption in transit and at rest, access
                      controls, and regular security assessments of our
                      processors.
                    </li>
                  </ul>
                  <p>
                    You may request a copy of the relevant transfer safeguards
                    by contacting us at{" "}
                    <a
                      href="mailto:hello@example.com"
                      style={{ color: "var(--color-gold)" }}
                    >
                      hello@example.com
                    </a>
                    .
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  8. YOUR RIGHTS                                   */}
                {/* ================================================ */}
                <PolicySection
                  id="your-rights"
                  number="08"
                  title="Your Rights as a Data Subject"
                >
                  <p>
                    Depending on your location and applicable law, you may have
                    the following rights regarding your personal data:
                  </p>

                  {/* Rights under UAE PDPL + GDPR */}
                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Under UAE PDPL &amp; EU GDPR
                  </h3>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right of Access:
                      </strong>{" "}
                      Request confirmation as to whether your personal data is
                      being processed and, if so, obtain a copy of that data.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Rectification:
                      </strong>{" "}
                      Request correction of inaccurate or incomplete personal
                      data.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Erasure (&ldquo;Right to Be Forgotten&rdquo;):
                      </strong>{" "}
                      Request deletion of your personal data where it is no
                      longer necessary for the purposes for which it was
                      collected, or where you withdraw consent.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Restriction of Processing:
                      </strong>{" "}
                      Request that we limit the processing of your data under
                      certain circumstances.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Data Portability:
                      </strong>{" "}
                      Receive your personal data in a structured, commonly used,
                      and machine-readable format, and transmit it to another
                      controller.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Object:
                      </strong>{" "}
                      Object to processing based on legitimate interest or for
                      direct marketing purposes.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Withdraw Consent:
                      </strong>{" "}
                      Where processing is based on consent, you may withdraw
                      that consent at any time without affecting the lawfulness
                      of processing carried out before the withdrawal.
                    </li>
                  </ul>

                  {/* Rights under CCPA/CPRA */}
                  <h3
                    className="mt-6 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Additional Rights for California Residents (CCPA/CPRA)
                  </h3>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Know:
                      </strong>{" "}
                      Request disclosure of the categories and specific pieces
                      of personal information we have collected about you, the
                      sources, the business purposes, and the categories of
                      third parties with whom we share it.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Delete:
                      </strong>{" "}
                      Request that we delete personal information we have
                      collected from you, subject to certain exceptions.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Correct:
                      </strong>{" "}
                      Request correction of inaccurate personal information.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Opt-Out of Sale or Sharing:
                      </strong>{" "}
                      We do not sell or share your personal information for
                      cross-context behavioral advertising. As such, there is no
                      need to opt out. Should this change, we will provide a
                      &ldquo;Do Not Sell or Share My Personal Information&rdquo;
                      link.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to Non-Discrimination:
                      </strong>{" "}
                      We will not discriminate against you for exercising any of
                      your CCPA/CPRA rights.
                    </li>
                  </ul>

                  {/* How to exercise */}
                  <div
                    className="mt-6 rounded-lg p-5"
                    style={{
                      background: "rgba(200, 135, 46, 0.05)",
                      border: "1px solid rgba(200, 135, 46, 0.2)",
                    }}
                  >
                    <p
                      className="mb-2 text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-gold)",
                      }}
                    >
                      How to Exercise Your Rights
                    </p>
                    <p>
                      To exercise any of these rights, email us at{" "}
                      <a
                        href="mailto:hello@example.com"
                        style={{ color: "var(--color-gold)" }}
                      >
                        hello@example.com
                      </a>{" "}
                      with the subject line &ldquo;Data Subject Request.&rdquo;
                      We will verify your identity and respond within 30 days
                      (UAE PDPL / GDPR) or 45 days (CCPA/CPRA). If we need
                      additional time, we will notify you of the extension and
                      the reason for it.
                    </p>
                  </div>
                </PolicySection>

                {/* ================================================ */}
                {/*  9. COOKIE POLICY                                 */}
                {/* ================================================ */}
                <PolicySection
                  id="cookie-policy"
                  number="09"
                  title="Cookie Policy"
                >
                  <p>
                    Cookies are small text files placed on your device when you
                    visit our website. We use them to enhance your experience,
                    analyze traffic, and remember your preferences.
                  </p>

                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Types of Cookies We Use
                  </h3>

                  <div className="mt-2 space-y-3">
                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Strictly Necessary Cookies
                      </p>
                      <p>
                        Essential for the website to function. These cannot be
                        disabled. They include session cookies for security,
                        load balancing, and user authentication (when the client
                        portal is active).
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Analytics Cookies
                      </p>
                      <p>
                        Help us understand how visitors interact with our
                        website by collecting information anonymously (PostHog).
                        These cookies are only placed with your consent.
                      </p>
                    </div>

                    <div
                      className="rounded-lg p-5"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <p
                        className="mb-1 text-sm font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--text-primary)",
                        }}
                      >
                        Preference Cookies
                      </p>
                      <p>
                        Allow our website to remember choices you make (such as
                        language or theme preferences) and provide enhanced,
                        personalized features.
                      </p>
                    </div>
                  </div>

                  <h3
                    className="mt-6 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Managing Cookies
                  </h3>
                  <p>
                    When you first visit our website, you will be presented with
                    a cookie consent banner allowing you to accept or reject
                    non-essential cookies. You can change your preferences at any
                    time by:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>
                      Adjusting your browser settings to block or delete cookies
                    </li>
                    <li>
                      Using the cookie preference controls on our website (when
                      available)
                    </li>
                  </ul>
                  <p className="mt-2">
                    Please note that disabling certain cookies may affect the
                    functionality of our website.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  10. AI / AUTOMATED DECISION-MAKING               */}
                {/* ================================================ */}
                <PolicySection
                  id="ai-automated-decisions"
                  number="10"
                  title="AI & Automated Decision-Making Disclosure"
                >
                  <p>
                    We are committed to transparency regarding our use of
                    artificial intelligence and automated processing:
                  </p>

                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Q AI Assistant (Planned)
                  </h3>
                  <p>
                    We intend to deploy an AI-powered chatbot (&ldquo;Q AI
                    Assistant&rdquo;) on our website, powered by Anthropic&rsquo;s
                    Claude API. This assistant is designed to:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>Answer general questions about our services</li>
                    <li>
                      Assist visitors in navigating the website and finding
                      relevant information
                    </li>
                    <li>
                      Provide preliminary guidance (not constituting
                      professional advice)
                    </li>
                  </ul>

                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Important Safeguards
                  </h3>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        No consequential automated decisions:
                      </strong>{" "}
                      The AI assistant does not make decisions that produce legal
                      effects or similarly significantly affect you. All material
                      business decisions are made by qualified human
                      professionals.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Human oversight:
                      </strong>{" "}
                      AI outputs are subject to review. The assistant is a
                      supplementary tool, not a replacement for professional
                      human judgment.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Data handling:
                      </strong>{" "}
                      Conversation data sent to Anthropic&rsquo;s API is
                      processed under their enterprise data processing terms.
                      Anthropic does not use API inputs/outputs to train its
                      general models.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Right to object:
                      </strong>{" "}
                      Under GDPR Article 22 and UAE PDPL, you have the right
                      not to be subject to solely automated decision-making.
                      You may request human intervention at any time by
                      contacting us.
                    </li>
                  </ul>

                  <h3
                    className="mt-4 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Analytics & Profiling
                  </h3>
                  <p>
                    We use PostHog analytics to understand aggregate usage
                    patterns. This analysis does not involve individual
                    profiling that produces legal or similarly significant
                    effects. We do not use automated profiling to make decisions
                    about individuals.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  11. CHILDREN'S DATA                              */}
                {/* ================================================ */}
                <PolicySection
                  id="childrens-data"
                  number="11"
                  title="Children's Data"
                >
                  <p>
                    Our services are intended for businesses and professionals.{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      We do not knowingly collect, solicit, or process personal
                      data from individuals under the age of 18.
                    </strong>
                  </p>
                  <p>
                    If we become aware that we have inadvertently collected
                    personal data from a person under 18, we will take immediate
                    steps to delete that data from our systems. If you believe
                    that we may have collected data from a minor, please contact
                    us at{" "}
                    <a
                      href="mailto:hello@example.com"
                      style={{ color: "var(--color-gold)" }}
                    >
                      hello@example.com
                    </a>{" "}
                    so we can investigate and take appropriate action.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  12. DATA SECURITY                                */}
                {/* ================================================ */}
                <PolicySection
                  id="data-security"
                  number="12"
                  title="Data Security Measures"
                >
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal data against unauthorized
                    access, alteration, disclosure, or destruction. These
                    measures include:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Encryption:
                      </strong>{" "}
                      All data transmitted between your browser and our servers
                      is encrypted using TLS 1.2+ (HTTPS). Data at rest is
                      encrypted using AES-256 or equivalent standards by our
                      infrastructure providers.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Access controls:
                      </strong>{" "}
                      Access to personal data is restricted to authorized
                      personnel on a need-to-know basis, with role-based access
                      controls and multi-factor authentication.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Infrastructure security:
                      </strong>{" "}
                      Our hosting providers (Vercel, Supabase) maintain SOC 2
                      Type II compliance, regular penetration testing, and 24/7
                      monitoring.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Vendor assessments:
                      </strong>{" "}
                      We evaluate the security posture of all third-party
                      processors before engaging their services and require
                      contractual security obligations.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Incident response:
                      </strong>{" "}
                      We maintain a data breach response plan. In the event of a
                      personal data breach, we will notify affected individuals
                      and the relevant supervisory authority in accordance with
                      applicable law (within 72 hours under GDPR and as
                      required under UAE PDPL).
                    </li>
                  </ul>
                  <p>
                    While we take reasonable precautions, no method of electronic
                    transmission or storage is 100% secure. We cannot guarantee
                    absolute security but are committed to continuous improvement
                    of our security measures.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  13. CHANGES TO THIS POLICY                      */}
                {/* ================================================ */}
                <PolicySection
                  id="changes-to-policy"
                  number="13"
                  title="Changes to This Policy"
                >
                  <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices, technologies, legal
                    requirements, or other factors. When we make changes:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      We will update the &ldquo;Last Updated&rdquo; date at the
                      top of this page.
                    </li>
                    <li>
                      For material changes, we will provide a prominent notice
                      on our website or send a direct notification to affected
                      users (where feasible and where we have contact details).
                    </li>
                    <li>
                      Where required by law (e.g., under GDPR or UAE PDPL),
                      we will obtain your renewed consent before applying
                      changes that affect the legal basis for processing.
                    </li>
                  </ul>
                  <p>
                    We encourage you to review this policy periodically. Your
                    continued use of our website and services after any changes
                    constitutes acceptance of the updated policy, to the extent
                    permitted by applicable law.
                  </p>
                </PolicySection>

                {/* ================================================ */}
                {/*  14. CONTACT & COMPLAINTS                        */}
                {/* ================================================ */}
                <PolicySection
                  id="contact-complaints"
                  number="14"
                  title="Contact Us & File Complaints"
                >
                  <p>
                    If you have questions, concerns, or requests regarding this
                    Privacy Policy or our data processing practices, please
                    contact us:
                  </p>
                  <div
                    className="mt-4 rounded-lg p-6"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <p
                      className="mb-1 text-base font-semibold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Quartermasters F.Z.C &mdash; Data Privacy
                    </p>
                    <p>
                      California, United States
                    </p>
                    <p className="mt-2">
                      Email:{" "}
                      <a
                        href="mailto:hello@example.com"
                        style={{ color: "var(--color-gold)" }}
                      >
                        hello@example.com
                      </a>
                    </p>
                    <p>
                      Subject line: &ldquo;Privacy Inquiry&rdquo; or
                      &ldquo;Data Subject Request&rdquo;
                    </p>
                  </div>

                  <h3
                    className="mt-6 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Supervisory Authority Complaints
                  </h3>
                  <p>
                    If you are not satisfied with our response, or believe we
                    are processing your data unlawfully, you have the right to
                    lodge a complaint with a supervisory authority:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-2">
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        UAE:
                      </strong>{" "}
                      The UAE Data Office (established under Federal Decree-Law
                      No. 45 of 2021 on the Protection of Personal Data), or
                      the relevant California regulatory authorities.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        EU/EEA:
                      </strong>{" "}
                      The data protection authority in your country of residence.
                      A list of EU Data Protection Authorities is available on
                      the European Data Protection Board website.
                    </li>
                    <li>
                      <strong style={{ color: "var(--text-primary)" }}>
                        California:
                      </strong>{" "}
                      The California Attorney General&rsquo;s Office or the
                      California Privacy Protection Agency (CPPA).
                    </li>
                  </ul>

                  <h3
                    className="mt-6 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    CAN-SPAM Compliance
                  </h3>
                  <p>
                    In accordance with the CAN-SPAM Act, all marketing emails
                    sent by Quartermasters F.Z.C will:
                  </p>
                  <ul className="ml-4 list-inside list-disc space-y-1">
                    <li>
                      Clearly identify the message as an advertisement (where
                      applicable)
                    </li>
                    <li>
                      Include our valid physical postal address
                    </li>
                    <li>
                      Provide a clear and conspicuous opt-out / unsubscribe
                      mechanism
                    </li>
                    <li>
                      Honor opt-out requests within 10 business days
                    </li>
                    <li>
                      Not use deceptive subject lines or false header
                      information
                    </li>
                  </ul>
                </PolicySection>

                {/* ================================================ */}
                {/*  GOVERNING LAW NOTICE                             */}
                {/* ================================================ */}
                <div
                  className="glass rounded-xl p-8 text-center md:p-10"
                  style={{
                    borderColor: "var(--color-gold)",
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  <p
                    className="mb-2 text-xs font-semibold uppercase tracking-widest"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-gold)",
                    }}
                  >
                    Governing Law
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    This Privacy Policy is governed by and construed in
                    accordance with the laws of the United Arab Emirates,
                    including Federal Decree-Law No. 45 of 2021 on the
                    Protection of Personal Data (as amended), and the
                    regulations of relevant California regulatory authorities. For EU
                    residents, the GDPR applies as supplementary law. For
                    California residents, the CCPA/CPRA applies in addition.
                  </p>
                  <div
                    className="mx-auto my-6 h-px w-24"
                    style={{ background: "var(--glass-border)" }}
                  />
                  <p
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Quartermasters F.Z.C
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-light)" }}
                  >
                    (removed — placeholder for US registration) &middot; Subject to UAE Government
                    Authority Approvals
                  </p>
                </div>

                {/* Back to top */}
                <div className="mt-8 text-center">
                  <Link
                    href="/privacy#"
                    className="inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    Back to Top
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
