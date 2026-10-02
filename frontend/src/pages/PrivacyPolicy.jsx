import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  const lastUpdated = "July 24, 2026";

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <div style={styles.logoHeader}>
            <span style={styles.logoText}>
              E-<span style={{ color: "#ff4d4d" }}>Shop</span>
            </span>
          </div>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.lastUpdated}>Last updated: {lastUpdated}</p>
        </div>
        <div style={styles.card}>
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Introduction</h2>
            <p style={styles.paragraph}>
              Welcome to <strong>E-Shop</strong>. We respect your privacy and
              are committed to protecting your personal data. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a purchase.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
            <p style={styles.paragraph}>
              We collect information that identifies, relates to, or describes
              you ("Personal Data"). This includes:
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Personal Identifiers:</strong> Name, email address,
                phone number, and shipping/billing address.
              </li>
              <li>
                <strong>Account Credentials:</strong> Passwords and security
                details used for authentication.
              </li>
              <li>
                <strong>Payment Data:</strong> Credit card numbers, payment
                method details, and billing information (processed securely via
                our payment gateways).
              </li>
              <li>
                <strong>Usage & Device Data:</strong> IP address, browser type,
                operating system, pages visited, and cookies.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
            <p style={styles.paragraph}>
              We use the collected information for various business purposes:
            </p>
            <ul style={styles.list}>
              <li>
                To process and fulfill your orders, including sending order
                updates.
              </li>
              <li>To maintain and manage your user account and preferences.</li>
              <li>
                To improve our products, customer service, and website
                navigation.
              </li>
              <li>
                To communicate promotional offers, newsletters, and policy
                updates.
              </li>
              <li>
                To detect and prevent fraudulent transactions or security
                breaches.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              4. Cookies and Tracking Technologies
            </h2>
            <p style={styles.paragraph}>
              We use session cookies and authentication tokens (e.g., HTTP-only
              cookies) to keep you logged in, remember your shopping cart items,
              and understand how you interact with our platform. You can
              configure your browser to decline cookies, but some features of
              E-Shop may not function properly.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>5. Sharing Your Information</h2>
            <p style={styles.paragraph}>
              We do not sell or rent your personal information to third parties.
              We may share your data with trusted third-party service providers
              who assist us in operating our platform, such as payment
              processors, shipping partners, and email delivery providers.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>6. Data Security</h2>
            <p style={styles.paragraph}>
              We implement robust technical and organizational security
              measures—including encrypted connections (HTTPS/SSL) and secured
              database authentication—to protect your personal information
              against unauthorized access, loss, or alteration.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Your Rights</h2>
            <p style={styles.paragraph}>
              Depending on your location, you have rights regarding your
              personal data:
            </p>
            <ul style={styles.list}>
              <li>
                The right to access and receive a copy of your personal data.
              </li>
              <li>The right to request correction of inaccurate data.</li>
              <li>
                The right to request deletion of your account and associated
                data.
              </li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Contact Us</h2>
            <p style={styles.paragraph}>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <div style={styles.contactBox}>
              <p style={{ margin: "0 0 5px 0" }}>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:garvitsaxena111@gmail.com"
                  style={styles.emailLink}
                >
                  garvitsaxena111@gmail.com
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Support:</strong>{" "}
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

export default PrivacyPolicy;
