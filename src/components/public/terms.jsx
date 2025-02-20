import React from "react";
import "../../styles/terms.css";

const TermsAndConditions = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8f1e8", // Light beige background
        color: "#5f432c", // Soft brown text
        fontFamily: "'Georgia', serif",
        height: "100vh", // Full screen height
        width: "100vw", // Full screen width
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "50px 20px",
        boxSizing: "border-box",
        overflowY: "auto", // Enable scrolling for long content
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>
        Terms and Conditions
      </h1>
      <p style={{ fontSize: "16px", marginBottom: "20px", color: "#9c6f47" }}>
        Last updated: February, 2025
      </p>

      <div style={{ maxWidth: "800px", textAlign: "left" }}>
        <p>
          These Terms and Conditions govern your use of the Memoir app. By accessing or using the app, you agree to comply with these terms.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Memoir, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>2. User Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. 
          You agree to provide accurate information during registration and not to use the app for illegal or harmful purposes.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>3. Privacy Policy</h2>
        <p>
          Your use of Memoir is also governed by our privacy policy.
         which explains how we collect, use, and protect your personal information.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>4. Intellectual Property</h2>
        <p>
          All content, trademarks, and intellectual property on Memoir are owned by or licensed to us and are protected by copyright and other laws.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>5. Prohibited Activities</h2>
        <p>
          You agree not to use Memoir for any unlawful purpose or in any way that could damage, disable, or impair the app. 
          Prohibited activities include posting offensive or illegal content, attempting to hack or disrupt the app, and sharing accounts with others.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>6. Limitation of Liability</h2>
        <p>
          Memoir is provided "as is," and we are not liable for any damages or losses resulting from your use of the app, including app downtime, loss of data, or third-party actions.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you violate these Terms and Conditions.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>8. Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
        </p>

        <h2 style={{ fontSize: "20px", marginTop: "15px", marginBottom: "5px" }}>9. Contact Information</h2>
        <p>
          If you have any questions about these Terms and Conditions, please contact us at{" "}
          <a href="mailto:memoir123@gmail.com" style={{ color: "#9c6f47", textDecoration: "underline", fontWeight: "bold" }}>
            memoir123@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
