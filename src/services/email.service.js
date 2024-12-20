require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
// Change to your SES region

const sendEmail = async (to, subject, htmlBody, body) => {
  const params = {
    Destination: {
      ToAddresses: [to], // Recipient email address
    },
    Message: {
      Body: {
        Html: { Data: htmlBody }, // HTML formatted body
      },
      Subject: { Data: subject }, // Subject of the email
    },
    Source: "noreplay@absoluhealthcare.com", // Verified sender email address
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
