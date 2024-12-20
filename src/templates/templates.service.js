const fs = require("fs");
const path = require("path");

// Function to load and modify the HTML template
function getResetPasswordEmail(resetLink) {
  const filePath = path.join(__dirname, "", "reset-password.html");

  // Read the HTML file
  let htmlTemplate = fs.readFileSync(filePath, "utf8");

  // Replace the placeholder with the actual reset link
  htmlTemplate = htmlTemplate.replace("RESET_LINK", resetLink);

  return htmlTemplate;
}

module.exports = { getResetPasswordEmail };
