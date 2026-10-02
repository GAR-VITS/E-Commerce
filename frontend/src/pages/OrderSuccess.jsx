import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const particles = Array.from({ length: 12 });

  return (
    <div className="success-page">
      <style>{`
        .success-page {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #0b0b0e;
          color: #ffffff;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Ambient Background Glow */
        .ambient-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          animation: pulseGlow 4s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }

        /* Main Glass Card */
        .success-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 20px;
          padding: 52px 36px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          animation: cardPopUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cardPopUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Checkmark & Confetti Container */
        .icon-container {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* SVG Self-Drawing Checkmark */
        .checkmark-svg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #22c55e;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #22c55e;
          animation: fillCircle 0.4s ease-in-out 0.4s forwards, scalePulse 0.3s ease-in-out 0.9s both;
        }

        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          stroke: #22c55e;
          fill: none;
          animation: strokeDraw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke: #ffffff;
          stroke-width: 4;
          animation: strokeDraw 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @keyframes strokeDraw {
          100% { stroke-dashoffset: 0; }
        }

        @keyframes fillCircle {
          100% { box-shadow: inset 0px 0px 0px 50px #22c55e; }
        }

        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        /* Confetti Particles Burst */
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          opacity: 0;
          top: 50%;
          left: 50%;
        }

        /* Dynamic Particle Directions using CSS variables */
        ${particles
          .map((_, i) => {
            const angle = (i * 360) / particles.length;
            const distance = 65;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * distance;
            const y = Math.sin(rad) * distance;
            const color =
              i % 2 === 0 ? "#22c55e" : i % 3 === 0 ? "#ff4d4d" : "#ffffff";

            return `
            .particle-${i} {
              background: ${color};
              animation: shoot-${i} 0.8s cubic-bezier(0.1, 1, 0.1, 1) 0.4s forwards;
            }
            @keyframes shoot-${i} {
              0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0); opacity: 0; }
            }
          `;
          })
          .join("")}

        /* Staggered Text Cascade */
        .stagger-1 { opacity: 0; animation: fadeUp 0.5s ease forwards 0.5s; }
        .stagger-2 { opacity: 0; animation: fadeUp 0.5s ease forwards 0.65s; }
        .stagger-3 { opacity: 0; animation: fadeUp 0.5s ease forwards 0.8s; }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        h1 {
          font-size: 1.85rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .subtitle {
          color: #a0a0a0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 36px;
          padding: 0 10px;
        }

        /* Action Buttons */
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-primary {
          background: #ff4d4d;
          color: #ffffff;
          border: none;
          padding: 15px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(255, 77, 77, 0.25);
          display: block;
        }

        .btn-primary:hover {
          background: #e63939;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 77, 77, 0.35);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-secondary {
          background: transparent;
          color: #a0a0a0;
          border: 1px solid #2d2d35;
          padding: 14px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: block;
        }

        .btn-secondary:hover {
          color: #ffffff;
          border-color: #555555;
          background: rgba(255, 255, 255, 0.03);
        }

        @media (max-width: 480px) {
          .success-card { padding: 40px 20px; }
        }
      `}</style>

      {/* Background Glowing Orb */}
      <div className="ambient-glow"></div>

      {/* Main Content Card */}
      <div className="success-card">
        {/* Animated Checkmark + Confetti Container */}
        <div className="icon-container">
          {particles.map((_, i) => (
            <span key={i} className={`particle particle-${i}`} />
          ))}

          <svg
            className="checkmark-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        {/* Staggered Content */}
        <h1 className="stagger-1">Payment Successful!</h1>

        <p className="subtitle stagger-2">
          Hooray! We've received your order and are getting it ready to be
          shipped. We've sent a confirmation email with your order details and
          receipt.
        </p>

        {/* Action Buttons */}
        <div className="button-group stagger-3">
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
          <button
            onClick={() => navigate("/MyOrders")}
            className="btn-secondary"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
