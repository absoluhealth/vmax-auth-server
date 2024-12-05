const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "vmax-hard-to-crack-secret";

async function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware/route
    next();
  } catch (error) {
    console.error("Token validation error:", error);
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
}

module.exports = validateToken;
