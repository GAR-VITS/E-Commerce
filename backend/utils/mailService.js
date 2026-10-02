async function sendMail(to, subject, html) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "E-SHOP",
          email: "garvitsaxena111@gmail.com", 
        },
        to: [{ email: to }], 
        subject: subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via Brevo API");
    }

    console.log("Email sent successfully via Brevo:", data);
    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

module.exports = { sendMail };