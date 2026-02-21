import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ClickSpark from "@/components/ui/ClickSpark";

export const metadata: Metadata = {
  title: "Terms of Service — Quartermasters",
  description:
    "Terms of Service for Quartermasters, a California-based strategic consulting firm. Governing law: California and United States Federal Law.",
  openGraph: {
    title: "Terms of Service — Quartermasters",
    description:
      "Terms of Service governing use of quartermasters.me and all advisory services provided by Quartermasters.",
    type: "website",
    locale: "en_US",
  },
};

/* ────────────────────────────────────────────
   Effective date — update when terms change
   ──────────────────────────────────────────── */
const EFFECTIVE_DATE = "12 February 2026";
const LAST_UPDATED = "12 February 2026";

/* ────────────────────────────────────────────
   Section data
   ──────────────────────────────────────────── */
interface Section {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  /* ── 1. Acceptance of Terms ── */
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing or using the website located at{" "}
          <strong>quartermasters.me</strong> (the &ldquo;Website&rdquo;), any
          sub-domains thereof, or any services provided by{" "}
          <strong>Quartermasters</strong> (referred to herein as
          &ldquo;Quartermasters,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), you acknowledge that you have read, understood,
          and agree to be bound by these Terms of Service
          (&ldquo;Terms&rdquo;).
        </p>
        <p>
          If you do not agree to these Terms, you must immediately cease all use
          of the Website and our services. Your continued use of the Website
          following the posting of any amendments to these Terms constitutes
          your acceptance of such amendments.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you
          (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and
          Quartermasters, a strategic consulting firm
          incorporated and operating in the State of California,
          United States.
        </p>
      </>
    ),
  },

  /* ── 2. Company Information ── */
  {
    id: "company-information",
    number: "02",
    title: "Company Information",
    content: (
      <>
        <div
          className="rounded-xl p-6 mb-4"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["Legal Entity", "Quartermasters"],
              ["Jurisdiction", "State of California, United States"],
              ["Registered Address", "California, United States"],
              ["Email", "hello@quartermasters.me"],
              ["Website", "quartermasters.me"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-gold)",
                  }}
                >
                  {label}
                </dt>
                <dd
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </>
    ),
  },

  /* ── 3. Description of Services ── */
  {
    id: "service-description",
    number: "03",
    title: "Description of Services",
    content: (
      <>
        <p>
          Quartermasters is a multi-vertical consultancy firm operating under
          six (6) core service verticals. Our services are <strong>advisory and consultancy in
            nature</strong> and include:
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-4">
          <li>
            <strong>Human Resources Consultancy</strong> &mdash; Advisory
            services relating to workforce planning, talent acquisition
            strategy, HR policy development, organizational design, and
            human capital management.
          </li>
          <li>
            <strong>Management Consultancies</strong> &mdash; Strategic
            advisory, operational improvement consulting, business
            transformation guidance, and corporate governance advisory.
          </li>
          <li>
            <strong>Consulting &amp; R&amp;D in Technology Education</strong>{" "}
            &mdash; Research, consulting, and development services in the
            field of technology education, including curriculum advisory,
            edtech strategy, and learning technology consulting.
          </li>
          <li>
            <strong>Organization &amp; Event Management</strong> &mdash;
            Consulting and management services for corporate events,
            conferences, seminars, trade exhibitions, and organizational
            logistics.
          </li>
          <li>
            <strong>Banking Services Consultancy</strong> &mdash; Advisory
            and consulting services related to banking operations, financial
            strategy, regulatory compliance advisory, and financial services
            consulting.
          </li>
        </ol>
        <div
          className="rounded-xl p-5 mt-6"
          style={{
            background: "rgba(200, 135, 46, 0.06)",
            border: "1px solid rgba(200, 135, 46, 0.2)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-gold)",
            }}
          >
            Important Notice
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            All services provided by Quartermasters are consultancy and advisory
            in nature. We do not provide regulated financial services, direct
            employment or labor supply, or accredited educational
            certifications. Please refer to Section 4 (Scope Limitations) for
            detailed disclosures.
          </p>
        </div>
      </>
    ),
  },

  /* ── 4. Scope Limitations & Regulatory Disclosures ── */
  {
    id: "scope-limitations",
    number: "04",
    title: "Scope Limitations & Regulatory Disclosures",
    content: (
      <>
        <p>
          Pursuant to the scope of our services and applicable
          law, the following limitations apply to our service offerings. Users
          and clients must read and understand these limitations before engaging
          our services.
        </p>

        {/* Banking */}
        <h4
          className="mt-8 mb-3 text-base font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--sector-financial)" }}
        >
          4.1 Banking Services Consultancy
        </h4>
        <p>
          Quartermasters provides <strong>advisory and consulting services
            only</strong> in relation to banking and financial matters. We
          expressly confirm that we:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Do <strong>not</strong> accept deposits, hold client funds, or
            operate as a bank or financial institution.
          </li>
          <li>
            Do <strong>not</strong> provide lending, credit, or financing
            services of any kind.
          </li>
          <li>
            Do <strong>not</strong> engage in fund management, asset
            management, or investment management.
          </li>
          <li>
            Do <strong>not</strong> hold a license from the Securities and
            Exchange Commission (SEC), the Financial Industry Regulatory
            Authority (FINRA), or any state financial regulatory authority.
          </li>
          <li>
            Do <strong>not</strong> provide insurance, brokerage, or
            securities trading services.
          </li>
        </ul>
        <p className="mt-3">
          Any banking or financial advisory provided is strictly informational
          and strategic in nature. Clients requiring regulated financial
          services must engage appropriately licensed institutions.
        </p>

        {/* HR */}
        <h4
          className="mt-8 mb-3 text-base font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--sector-hr)" }}
        >
          4.2 Human Resources Consultancy
        </h4>
        <p>
          Our HR services are limited to <strong>consultancy and advisory</strong>.
          We expressly confirm that we:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Do <strong>not</strong> act as a direct employer, labor supplier,
            or staffing agency unless separately and explicitly authorized
            under applicable state and federal law.
          </li>
          <li>
            Do <strong>not</strong> sponsor work visas, employment permits,
            or immigration petitions for third-party personnel on behalf of clients.
          </li>
          <li>
            Do <strong>not</strong> act as a Professional Employer Organization
            (PEO) or Employer of Record (EOR) unless holding the requisite
            approvals.
          </li>
        </ul>
        <p className="mt-3">
          All HR advisory services — including workforce planning, HR policy
          development, and organizational consulting — are delivered as
          consultancy engagements. Any direct employment or labor supply
          activity would require separate regulatory approval and/or additional
          licensing under applicable state and federal law.
        </p>

        {/* Education */}
        <h4
          className="mt-8 mb-3 text-base font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--sector-tech)" }}
        >
          4.3 Consulting &amp; R&amp;D in Technology Education
        </h4>
        <p>
          Our technology education services are limited to{" "}
          <strong>consulting, research, and development</strong>. We expressly
          confirm that we:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Do <strong>not</strong> operate as an accredited educational
            institution, university, or training center.
          </li>
          <li>
            Do <strong>not</strong> issue accredited degrees, diplomas,
            certifications, or professional qualifications recognized by any
            state or federal accreditation body, including the U.S. Department
            of Education or regional accrediting agencies.
          </li>
          <li>
            Do <strong>not</strong> claim equivalency with any accredited
            educational program.
          </li>
        </ul>
        <p className="mt-3">
          Any educational content, training materials, workshops, or
          technology education research we provide is delivered solely in a
          consulting and R&amp;D capacity. Persons seeking accredited
          qualifications must engage institutions accredited by the appropriate
          state or federal authority.
        </p>

        {/* Events */}
        <h4
          className="mt-8 mb-3 text-base font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--sector-events)" }}
        >
          4.4 Organization &amp; Event Management
        </h4>
        <p>
          Event management services are provided within the scope of our
          business operations. All events organized or managed by Quartermasters are
          subject to applicable state and local health, safety, and security
          regulations. We will obtain or assist in obtaining all necessary
          event permits; however, final approval rests with the relevant
          government authorities.
        </p>

        {/* Management */}
        <h4
          className="mt-8 mb-3 text-base font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--sector-mgmt)" }}
        >
          4.5 Management Consultancies
        </h4>
        <p>
          Management consultancy services are advisory in nature.
          Quartermasters does not assume management control, fiduciary duty,
          or board-level authority over client entities unless explicitly
          contracted and agreed upon in a separate written engagement. All
          strategic recommendations remain the client&rsquo;s responsibility
          to evaluate, approve, and implement.
        </p>
      </>
    ),
  },

  /* ── 5. User Accounts ── */
  {
    id: "user-accounts",
    number: "05",
    title: "User Accounts & Client Portal",
    content: (
      <>
        <p>
          Quartermasters may, at its discretion, offer registered user accounts
          or a client portal (&ldquo;Portal&rdquo;) for the purpose of
          facilitating service delivery, document exchange, project tracking,
          and communications.
        </p>
        <p className="mt-3">If you create an account, you agree to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Provide accurate, current, and complete registration information.
          </li>
          <li>
            Maintain and promptly update your account information to keep it
            accurate and complete.
          </li>
          <li>
            Maintain the confidentiality of your login credentials and accept
            responsibility for all activities that occur under your account.
          </li>
          <li>
            Immediately notify Quartermasters of any unauthorized use of your
            account or any other breach of security at{" "}
            <strong>hello@quartermasters.me</strong>.
          </li>
        </ul>
        <p className="mt-3">
          Quartermasters reserves the right to suspend or terminate accounts
          that violate these Terms, contain fraudulent information, or are
          inactive for an extended period, upon reasonable notice where
          practicable.
        </p>
      </>
    ),
  },

  /* ── 6. Intellectual Property ── */
  {
    id: "intellectual-property",
    number: "06",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          All content on the Website — including but not limited to text,
          graphics, logos, icons, images, audio clips, digital downloads, data
          compilations, software, design elements, the Quartermasters brand identity, and
          all associated trade marks — is the exclusive property of
          Quartermasters or its licensors and is protected by United States
          intellectual property laws and applicable international treaties.
        </p>
        <p className="mt-3">You may <strong>not</strong>:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Reproduce, duplicate, copy, sell, resell, or exploit any portion
            of the Website without our express written permission.
          </li>
          <li>
            Use the Quartermasters name, logo, or branding in any manner that
            suggests endorsement, affiliation, or sponsorship without prior
            written consent.
          </li>
          <li>
            Reverse-engineer, decompile, or disassemble any software or
            technology used on or in connection with the Website.
          </li>
          <li>
            Scrape, harvest, or collect information from the Website using
            automated means without authorization.
          </li>
        </ul>
        <p className="mt-3">
          Deliverables produced under client engagements are governed by the
          applicable service agreement. Unless otherwise agreed in writing,
          methodologies, frameworks, templates, and proprietary tools remain
          the intellectual property of Quartermasters.
        </p>
      </>
    ),
  },

  /* ── 7. Payment Terms ── */
  {
    id: "payment-terms",
    number: "07",
    title: "Payment Terms",
    content: (
      <>
        <p>
          Where Quartermasters provides paid services, the following payment
          terms apply:
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          7.1 Invoicing &amp; Currency
        </h4>
        <p>
          All invoices are denominated in United States Dollars (USD)
          unless otherwise agreed in writing. Payment may also be accepted in
          other currencies at the prevailing exchange rate at our
          discretion.
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          7.2 Payment Methods
        </h4>
        <p>
          Quartermasters may accept payments via bank transfer, online payment
          gateways (including but not limited to Stripe and PayTabs), or such
          other methods as we may make available. All online payment processing
          is handled by PCI-DSS compliant third-party payment processors.
          Quartermasters does not directly store your complete payment card
          details.
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          7.3 Applicable Taxes
        </h4>
        <p>
          All fees quoted are exclusive of applicable taxes unless otherwise
          stated. Sales tax, use tax, or other applicable taxes shall be
          charged at the rate prescribed by the relevant state and local
          jurisdictions. A valid invoice will be provided for all transactions.
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          7.4 Refund Policy
        </h4>
        <p>
          Refund eligibility is determined on a case-by-case basis and is
          subject to the terms of the applicable service agreement. As a
          general policy:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Refund requests must be submitted in writing to{" "}
            <strong>hello@quartermasters.me</strong> within fourteen (14) days
            of the payment date.
          </li>
          <li>
            Services already rendered, including consultancy hours delivered
            or deliverables provided, are non-refundable.
          </li>
          <li>
            Refunds for pre-paid retainers or future service credits will be
            prorated based on unused portions.
          </li>
          <li>
            Any refund approved will be processed within thirty (30) business
            days via the original payment method where possible.
          </li>
        </ul>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          7.5 Late Payment
        </h4>
        <p>
          Invoices are due within the timeframe specified therein (typically
          thirty (30) days from the invoice date). Late payments may be subject
          to a late fee of 1.5% per month on the outstanding balance, or the
          maximum rate permitted by applicable law, whichever is lower.
          Quartermasters reserves the right to suspend services for accounts
          with outstanding balances exceeding sixty (60) days.
        </p>
      </>
    ),
  },

  /* ── 8. AI Disclaimer ── */
  {
    id: "ai-disclaimer",
    number: "08",
    title: "AI Assistant Disclaimer",
    content: (
      <>
        <div
          className="rounded-xl p-5 mb-4"
          style={{
            background: "rgba(200, 135, 46, 0.06)",
            border: "1px solid rgba(200, 135, 46, 0.2)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-gold)",
            }}
          >
            Critical Disclosure
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            &ldquo;Q&rdquo; is an artificial intelligence assistant. It is not a
            licensed professional advisor, lawyer, accountant, financial
            planner, medical professional, or any other regulated professional.
          </p>
        </div>

        <p>
          Quartermasters may deploy an AI-powered assistant known as
          &ldquo;Q&rdquo; or other AI tools on its Website or within its
          services. By interacting with Q or any AI feature, you acknowledge
          and agree that:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <strong>Informational only:</strong> All responses generated by Q
            are for general informational purposes only and do not constitute
            professional advice of any kind — including but not limited to
            legal, financial, tax, medical, or regulatory advice.
          </li>
          <li>
            <strong>No professional relationship:</strong> Interaction with Q
            does not create a professional-client, attorney-client,
            advisor-client, or any other professional relationship between you
            and Quartermasters.
          </li>
          <li>
            <strong>No guarantee of accuracy:</strong> While we strive for
            accuracy, AI-generated content may contain errors, omissions,
            outdated information, or hallucinations. You must independently
            verify any information obtained through Q before relying upon it.
          </li>
          <li>
            <strong>Not a substitute for professional advice:</strong> For
            matters requiring professional expertise, you must consult with an
            appropriately qualified and licensed professional.
          </li>
          <li>
            <strong>Data handling:</strong> Any information you share with Q
            may be processed in accordance with our Privacy Policy.
            Do not share sensitive personal data, trade secrets, or
            confidential information with the AI assistant unless you accept
            the associated risks.
          </li>
        </ul>
        <p className="mt-3">
          Quartermasters expressly disclaims all liability for any decisions
          made, actions taken, or outcomes resulting from reliance on
          AI-generated content.
        </p>
      </>
    ),
  },

  /* ── 9. Limitation of Liability ── */
  {
    id: "limitation-of-liability",
    number: "09",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            All services provided by Quartermasters are{" "}
            <strong>advisory in nature</strong>. We do not guarantee specific
            outcomes, results, returns on investment, regulatory approvals, or
            business performance arising from our advisory services.
          </li>
          <li>
            Quartermasters, its shareholders, managers, officers, employees,
            agents, and affiliates shall not be liable for any{" "}
            <strong>indirect, incidental, special, consequential, or
              punitive damages</strong>, including but not limited to loss of
            profits, loss of data, loss of business opportunity, or loss of
            goodwill, arising out of or in connection with your use of the
            Website or our services, regardless of the theory of liability.
          </li>
          <li>
            Our total aggregate liability to you for any claim arising out of
            or relating to these Terms or our services shall not exceed the{" "}
            <strong>total fees paid by you to Quartermasters in the twelve
              (12) months preceding the event giving rise to the claim</strong>,
            or USD $10,000, whichever is greater.
          </li>
          <li>
            Quartermasters does not warrant that the Website will be
            uninterrupted, error-free, secure, or free from viruses or other
            harmful components. The Website and its content are provided on an{" "}
            <strong>&ldquo;as is&rdquo;</strong> and{" "}
            <strong>&ldquo;as available&rdquo;</strong> basis without
            warranties of any kind, whether express or implied.
          </li>
          <li>
            The implementation of any advice, recommendations, or strategies
            provided by Quartermasters is solely at the client&rsquo;s own
            risk and discretion. Clients are responsible for conducting their
            own due diligence and obtaining independent professional opinions
            as necessary.
          </li>
        </ul>
      </>
    ),
  },

  /* ── 10. Governing Law & Dispute Resolution ── */
  {
    id: "governing-law",
    number: "10",
    title: "Governing Law & Dispute Resolution",
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with the{" "}
          <strong>laws of the State of California</strong> and applicable
          United States federal laws, without regard to conflict of law
          principles.
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          10.1 Jurisdiction
        </h4>
        <p>
          Any disputes arising out of or in connection with these Terms
          shall be subject to the <strong>exclusive jurisdiction of the state
          and federal courts located in California, United States</strong>.
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          10.2 Amicable Resolution
        </h4>
        <p>
          The parties shall first attempt to resolve any dispute amicably
          through good-faith negotiation for a period of thirty (30) days from
          the date of written notice of the dispute. If the dispute cannot be
          resolved amicably, it shall be referred to the competent state or
          federal courts located in California.
        </p>

        <h4
          className="mt-6 mb-2 text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          10.3 Language
        </h4>
        <p>
          These Terms are provided in English. In the event of any conflict
          between the English version and any translated version of these
          Terms, the English version shall prevail.
        </p>
      </>
    ),
  },

  /* ── 11. Privacy & Data Protection ── */
  {
    id: "privacy",
    number: "11",
    title: "Privacy & Data Protection",
    content: (
      <>
        <p>
          Your use of the Website and our services is also governed by our{" "}
          <strong>Privacy Policy</strong>, which describes how we collect, use,
          store, and protect your personal data in accordance with applicable
          United States federal and state privacy laws, including the
          California Consumer Privacy Act (CCPA) and other relevant
          regulations.
        </p>
        <p className="mt-3">
          By using our Website and services, you consent to the collection and
          processing of your personal data as described in our Privacy Policy.
          You may exercise your data rights — including the right to access,
          correct, delete, or restrict processing of your personal data — by
          contacting us at <strong>hello@quartermasters.me</strong>.
        </p>
        <p className="mt-3">
          The Privacy Policy is hereby incorporated into these Terms by
          reference. In the event of a conflict between these Terms and the
          Privacy Policy regarding data protection matters, the Privacy Policy
          shall prevail.
        </p>
      </>
    ),
  },

  /* ── 12. Modifications to Terms ── */
  {
    id: "modifications",
    number: "12",
    title: "Modifications to These Terms",
    content: (
      <>
        <p>
          Quartermasters reserves the right to modify, amend, or replace these
          Terms at any time at its sole discretion. When we make material
          changes:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            We will update the &ldquo;Last Updated&rdquo; date at the top of
            this page.
          </li>
          <li>
            For registered users, we will endeavor to provide notice of
            material changes via the email address associated with your
            account or through a prominent notice on the Website.
          </li>
          <li>
            We will make reasonable efforts to provide at least fifteen (15)
            days&rsquo; notice before material changes take effect.
          </li>
        </ul>
        <p className="mt-3">
          Your continued use of the Website or our services after any
          modifications constitutes your acceptance of the revised Terms. If
          you do not agree to the revised Terms, you must discontinue use of
          the Website and our services.
        </p>
      </>
    ),
  },

  /* ── 13. Termination ── */
  {
    id: "termination",
    number: "13",
    title: "Termination",
    content: (
      <>
        <p>
          Quartermasters reserves the right to suspend or terminate your access
          to the Website and/or services, in whole or in part, at any time and
          for any reason, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Violation of these Terms or any applicable law or regulation.</li>
          <li>
            Fraudulent, abusive, or harmful activity, including the submission
            of false or misleading information.
          </li>
          <li>
            Non-payment of fees or persistent failure to meet payment
            obligations.
          </li>
          <li>
            Conduct that we reasonably determine to be harmful to
            Quartermasters, other users, or third parties.
          </li>
          <li>
            Requests by law enforcement, judicial authorities, or regulatory
            bodies.
          </li>
        </ul>
        <p className="mt-3">
          Where practicable, Quartermasters will provide reasonable notice of
          termination and an explanation of the grounds. Termination does not
          relieve you of any obligation to pay outstanding fees or comply with
          surviving provisions of these Terms.
        </p>
        <p className="mt-3">
          The following sections survive termination: Intellectual Property
          (Section 6), Payment Terms (Section 7), Limitation of Liability
          (Section 9), Governing Law (Section 10), and any other provisions
          that by their nature should survive.
        </p>
      </>
    ),
  },

  /* ── 14. Force Majeure ── */
  {
    id: "force-majeure",
    number: "14",
    title: "Force Majeure",
    content: (
      <>
        <p>
          Quartermasters shall not be liable for any failure or delay in
          performance of its obligations under these Terms where such failure
          or delay results from circumstances beyond its reasonable control,
          including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>
            Acts of God, natural disasters, epidemics, pandemics, or
            quarantine restrictions.
          </li>
          <li>
            War, armed conflict, terrorism, civil unrest, riots, or
            insurrection.
          </li>
          <li>
            Government sanctions, embargoes, export or import restrictions,
            or regulatory actions.
          </li>
          <li>
            Failure or disruption of telecommunications networks, internet
            infrastructure, power supply, or third-party services.
          </li>
          <li>Cyberattacks, including DDoS attacks, ransomware, or data breaches caused by third parties.</li>
          <li>
            Strikes, lockouts, or other industrial action not involving our
            employees.
          </li>
        </ul>
        <p className="mt-3">
          In the event of a force majeure, Quartermasters will make reasonable
          efforts to notify affected parties promptly and resume performance as
          soon as practicable. If a force majeure event continues for more
          than ninety (90) consecutive days, either party may terminate the
          affected service agreement upon written notice.
        </p>
      </>
    ),
  },

  /* ── 15. Severability ── */
  {
    id: "severability",
    number: "15",
    title: "Severability",
    content: (
      <>
        <p>
          If any provision of these Terms is held to be invalid, illegal, or
          unenforceable by any competent court or tribunal, that provision shall
          be severed from these Terms and the remaining provisions shall
          continue in full force and effect.
        </p>
        <p className="mt-3">
          Where possible, the invalid provision shall be modified to the
          minimum extent necessary to make it valid and enforceable while
          preserving the parties&rsquo; original intent. The invalidity of any
          provision in a particular jurisdiction shall not affect the validity
          of that provision in any other jurisdiction.
        </p>
      </>
    ),
  },

  /* ── 16. Entire Agreement & Waiver ── */
  {
    id: "entire-agreement",
    number: "16",
    title: "Entire Agreement & Waiver",
    content: (
      <>
        <p>
          These Terms, together with our Privacy Policy and any applicable
          service agreements, constitute the entire agreement between you and
          Quartermasters regarding your use of the Website and our services,
          and supersede all prior agreements, understandings, representations,
          and warranties, whether written or oral.
        </p>
        <p className="mt-3">
          The failure of Quartermasters to exercise or enforce any right or
          provision of these Terms shall not constitute a waiver of such right
          or provision. Any waiver of any provision of these Terms shall be
          effective only if in writing and signed by an authorized
          representative of Quartermasters.
        </p>
      </>
    ),
  },

  /* ── 17. Contact Information ── */
  {
    id: "contact",
    number: "17",
    title: "Contact Information",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding these
          Terms of Service, please contact us:
        </p>
        <div
          className="rounded-xl p-6 mt-4"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <dl className="space-y-3">
            {[
              ["Entity", "Quartermasters"],
              ["Attention", "Compliance Department"],
              ["Address", "California, United States"],
              ["Email", "hello@quartermasters.me"],
              ["Website", "quartermasters.me"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                <dt
                  className="text-xs font-semibold uppercase tracking-widest min-w-[120px] mb-0.5 sm:mb-0"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-gold)",
                  }}
                >
                  {label}
                </dt>
                <dd
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6" style={{ color: "var(--text-light)" }}>
          We endeavor to respond to all inquiries within five (5) business
          days.
        </p>
      </>
    ),
  },
];

/* ────────────────────────────────────────────
   Table of Contents navigation items
   ──────────────────────────────────────────── */
const tocItems = sections.map((s) => ({
  id: s.id,
  number: s.number,
  title: s.title,
}));

/* ============================================================
   PAGE COMPONENT — Server Component (no "use client")
   ============================================================ */
export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* ── Hero ── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-overline mb-4">Legal</p>
              <h1 className="heading-1 mb-6">
                Terms of Service.
                <br />
                <span style={{ color: "var(--text-muted)" }}>
                  Governing Your Use of Our Services.
                </span>
              </h1>
              <p
                className="max-w-2xl text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                These Terms of Service govern your access to and use of the
                website, platforms, and advisory services operated by
                Quartermasters. Please read them carefully before
                engaging with our services.
              </p>

              {/* Meta badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-muted)",
                  }}
                >
                  Effective: {EFFECTIVE_DATE}
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-muted)",
                  }}
                >
                  Last Updated: {LAST_UPDATED}
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "rgba(200, 135, 46, 0.1)",
                    border: "1px solid rgba(200, 135, 46, 0.25)",
                    color: "var(--color-gold)",
                  }}
                >
                  California, USA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Table of Contents + Content Grid ── */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
              {/* Sidebar — Table of Contents */}
              <aside className="lg:col-span-1">
                <div
                  className="rounded-xl p-6 lg:sticky lg:top-28"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <p
                    className="mb-4 text-xs font-semibold uppercase tracking-widest"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-gold)",
                    }}
                  >
                    Table of Contents
                  </p>
                  <nav>
                    <ol className="space-y-1.5">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors"
                            style={{ color: "var(--text-light)" }}
                          >
                            <span
                              className="mt-px shrink-0 text-xs font-semibold"
                              style={{
                                fontFamily: "var(--font-heading)",
                                color: "var(--color-gold)",
                                opacity: 0.6,
                              }}
                            >
                              {item.number}
                            </span>
                            <span>{item.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-12">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="rounded-xl p-8 md:p-10 scroll-mt-28"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    {/* Section header */}
                    <div className="flex items-start gap-4 mb-6">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          background: "rgba(200, 135, 46, 0.1)",
                          color: "var(--color-gold)",
                        }}
                      >
                        {section.number}
                      </span>
                      <h2
                        className="text-xl font-semibold md:text-2xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {section.title}
                      </h2>
                    </div>

                    {/* Section body */}
                    <div
                      className="prose-terms text-sm leading-relaxed md:text-base md:leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {section.content}
                    </div>
                  </article>
                ))}

                {/* ── Closing Statement ── */}
                <div
                  className="rounded-xl p-8 md:p-10 text-center"
                  style={{
                    background: "rgba(200, 135, 46, 0.04)",
                    border: "1px solid rgba(200, 135, 46, 0.15)",
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-gold)",
                    }}
                  >
                    End of Terms
                  </p>
                  <p
                    className="text-sm max-w-xl mx-auto"
                    style={{ color: "var(--text-muted)" }}
                  >
                    By continuing to use quartermasters.me and/or engaging
                    Quartermasters for advisory services, you confirm that
                    you have read, understood, and agreed to these Terms of
                    Service in their entirety.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <ClickSpark sparkColor="#C8872E">
                      <Link
                        href="/contact"
                        className="btn-glow-line inline-block rounded-lg px-8 py-3 text-sm font-semibold transition-all"
                        style={{
                          fontFamily: "var(--font-heading)",
                          background: "var(--color-gold)",
                          color: "var(--color-white)",
                        }}
                      >
                        Contact Us
                      </Link>
                    </ClickSpark>
                    <Link
                      href="/"
                      className="inline-block rounded-lg px-8 py-3 text-sm font-semibold transition-all"
                      style={{
                        fontFamily: "var(--font-heading)",
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Return Home
                    </Link>
                  </div>
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
