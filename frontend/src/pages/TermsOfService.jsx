import React from "react";
import { Link } from "react-router-dom";

function TermsOfService() {
  const lastUpdated = "July 24, 2026";

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header Section */}
        <div style={styles.header}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <div style={styles.logoHeader}>
            <span style={styles.logoText}>
              E-<span style={{ color: "#ff4d4d" }}>Shop</span>
            </span>
          </div>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.lastUpdated}>Last updated: {lastUpdated}</p>
        </div>

        {/* Card Body */}
        <div style={styles.card}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Agreement to Terms</h2>
            <p style={styles.paragraph}>
              By accessing or using <strong>E-Shop</strong>, you agree to be
              bound by these Terms of Service and all applicable laws and
              regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              2. Account Registration & Security
            </h2>
            <p style={styles.paragraph}>
              To access certain features of the platform, you may be required to
              register for an account. You agree to:
            </p>
            <ul style={styles.list}>
              <li>
                Provide accurate, current, and complete account information.
              </li>
              <li>
                Maintain the security of your password and accept responsibility
                for all activities occurring under your account.
              </li>
              <li>
                Notify us immediately if you suspect unauthorized access or a
                security breach on your account.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              3. Orders, Pricing, and Payments
            </h2>
            <p style={styles.paragraph}>
              All orders placed through E-Shop are subject to availability and
              acceptance.
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Pricing:</strong> Prices for products are subject to
                change without notice. We reserve the right to modify or
                discontinue products at any time.
              </li>
              <li>
                <strong>Errors:</strong> In the event that a product is listed
                at an incorrect price due to a typographical error, we reserve
                the right to refuse or cancel any orders placed for that item.
              </li>
              <li>
                <strong>Payments:</strong> You represent and warrant that you
                have the legal right to use any payment method provided during
                checkout.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Shipping and Returns</h2>
            <p style={styles.paragraph}>
              Delivery times and shipping rates are estimated at checkout. Risk
              of loss and title for items purchased pass to you upon delivery to
              the carrier. Returns and refunds are processed according to our
              store's return policy.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Prohibited Conduct</h2>
            <p style={styles.paragraph}>When using E-Shop, you agree not to:</p>
            <ul style={styles.list}>
              <li>
                Use the site for any unlawful purpose or in violation of
                local/international laws.
              </li>
              <li>
                Attempt to gain unauthorized access to our systems, user
                accounts, or servers.
              </li>
              <li>
                Engage in any automated scraping, data harvesting, or spamming.
              </li>
              <li>
                Impersonate any person or entity, or misrepresent your
                affiliation with a person or entity.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Intellectual Property</h2>
            <p style={styles.paragraph}>
              All content on E-Shop—including text, graphics, logos, images,
              software code, and trademarks—is the property of E-Shop or its
              content suppliers and is protected by copyright and intellectual
              property laws.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p style={styles.paragraph}>
              In no event shall E-Shop, its directors, employees, or partners be
              liable for any indirect, incidental, consequential, or punitive
              damages arising out of your access to, or use of, the platform.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Termination</h2>
            <p style={styles.paragraph}>
              We reserve the right to terminate or suspend your account and
              access to E-Shop immediately, without prior notice, if you breach
              any of these Terms of Service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Contact Information</h2>
            <p style={styles.paragraph}>
              Questions regarding the Terms of Service should be sent to us at:
            </p>
            <div style={styles.contactBox}>
              <p style={{ margin: "0 0 5px 0" }}>
                <strong>Legal Dept:</strong>{" "}
                <a
                  href="mailto:garvitsaxena111@gmail.com"
                  style={styles.emailLink}
                >
                  garvitsaxena111@gmail.com
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Customer Care:</strong>{" "}
                <a
                  href="mailto:garvitsaxena111@gmail.com"
                  style={styles.emailLink}
                >
                  garvitsaxena111@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#050507",
    color: "#ffffff",
    padding: "40px 5%",
    display: "flex",
    justifyContent: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "900px",
  },
  header: {
    marginBottom: "30px",
  },
  backLink: {
    color: "#ff4d4d",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "15px",
  },
  logoHeader: {
    marginBottom: "10px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    margin: "0 0 10px 0",
    color: "#fff",
    letterSpacing: "0.5px",
  },
  lastUpdated: {
    color: "#a1a1aa",
    fontSize: "14px",
    margin: 0,
  },
  card: {
    backgroundColor: "#101014",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  section: {
    marginBottom: "35px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ff4d4d",
    marginBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "8px",
  },
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#d4d4d8",
    margin: "0 0 15px 0",
  },
  list: {
    color: "#d4d4d8",
    fontSize: "15px",
    lineHeight: "1.8",
    paddingLeft: "20px",
    margin: 0,
  },
  contactBox: {
    backgroundColor: "rgba(255, 77, 77, 0.05)",
    border: "1px solid rgba(255, 77, 77, 0.2)",
    borderRadius: "8px",
    padding: "16px 20px",
    color: "#eee",
    fontSize: "14px",
    marginTop: "10px",
  },
  emailLink: {
    color: "#ff4d4d",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default TermsOfService;
