import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I track my order status?",
      answer:
        'Navigate to "My Orders" from your profile or navigation menu to view live status updates (Pending, Processing, Shipped, Delivered) for all your purchases.',
    },
    {
      question: "What tech stack powers this platform?",
      answer:
        "This application is built using the MERN stack (MongoDB, Express.js, React, Node.js), styled with custom CSS in JS, and uses Cloudinary for media storage.",
    },
    {
      question: "How can I report a bug or suggest a feature?",
      answer:
        "You can reach out directly via LinkedIn or check out the developer details on this page to connect.",
    },
    {
      question: "Can I cancel or update an order after placing it?",
      answer:
        'Orders can be updated or cancelled by the system administrator while they are in the "Pending" or "Processing" stage.',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.contentGrid}>
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <div style={styles.developerHeader}>
              <div style={styles.avatar}>GS</div>
              <div>
                <h2 style={styles.devName}>Garvit Saxena</h2>
                <p style={styles.devRole}>Full-Stack Developer</p>
              </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.aboutSection}>
              <h3 style={styles.sectionTitle}>About the Developer</h3>
              <p style={styles.bioText}>
                Hi! I am a 3rd-year Computer Science & Engineering student at{" "}
                <strong style={{ color: "#ffffff" }}>BIT Mesra, Ranchi</strong>.
                I enjoy engineering end-to-end full-stack applications with
                clean UI/UX and robust backend logic.
              </p>

              <div style={styles.linkGroup}>
                <a
                  href="https://in.linkedin.com/in/garvit-saxena-81687931b"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkedinBtn}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Quick Help</h3>
            <div style={styles.quickHelpGrid}>
              <Link to="/myorders" style={styles.quickLink}>
                📦 View My Orders
              </Link>
              <Link to="/profile" style={styles.quickLink}>
                👤 Account Settings
              </Link>
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Frequently Asked Questions</h2>
            <p style={styles.cardSubtitle}>
              Find quick answers to common questions about orders, features, and
              the application architecture.
            </p>

            <div style={styles.faqList}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} style={styles.faqItem}>
                    <button
                      onClick={() => toggleFaq(index)}
                      style={styles.faqQuestionBtn}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: "18px", color: "#ff4d4d" }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && <div style={styles.faqAnswer}>{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Project Highlights</h3>
            <div style={styles.techBadges}>
              <span style={styles.badge}>React.js</span>
              <span style={styles.badge}>Node.js</span>
              <span style={styles.badge}>Express.js</span>
              <span style={styles.badge}>MongoDB</span>
              <span style={styles.badge}>Cloudinary API</span>
              <span style={styles.badge}>JWT Auth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#050507",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    color: "#ffffff",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px",
    width: "100%",
    maxWidth: "1000px",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  card: {
    backgroundColor: "#101014",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
  },
  developerHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#ff4d4d",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "800",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 15px rgba(255, 77, 77, 0.3)",
  },
  devName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  devRole: {
    fontSize: "13px",
    color: "#a1a1aa",
    margin: "4px 0 0 0",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    margin: "20px 0",
  },
  aboutSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#ff4d4d",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  bioText: {
    color: "#a1a1aa",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: 0,
  },
  linkGroup: {
    marginTop: "10px",
  },
  linkedinBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#0a66c2",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    transition: "opacity 0.2s ease",
  },
  quickHelpGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "12px",
  },
  quickLink: {
    backgroundColor: "#16161a",
    border: "1px solid #27272a",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
  },
  cardSubtitle: {
    color: "#a1a1aa",
    fontSize: "14px",
    margin: "0 0 20px 0",
    lineHeight: "1.5",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  faqItem: {
    backgroundColor: "#16161a",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  faqQuestionBtn: {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqAnswer: {
    padding: "0 16px 14px 16px",
    color: "#a1a1aa",
    fontSize: "13px",
    lineHeight: "1.5",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    paddingTop: "10px",
  },
  techBadges: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px",
  },
  badge: {
    backgroundColor: "#16161a",
    border: "1px solid #27272a",
    color: "#a1a1aa",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default ContactSupport;
