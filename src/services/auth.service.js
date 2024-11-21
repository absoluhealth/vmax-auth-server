const { uuid } = require("uuidv4");
const AunthenticationError = require("../helpers/exception");
const jwt = require("jsonwebtoken");

const deHyphenatedUUID = () => uuidv4().replace(/-/gi, "");

const JWT_SECRET = process.env.JWT_SECRET || "vmax-hard-to-crack-secret";

const originAppName = {
  "http://localhost:4200": "vmax_crm",
  "http://localhost:3200": "fitdad_crm",
};

const users = [
  {
    tenantId: "1",
    id: "rv-user-id",
    email: "rv@gmail.com",
    password: "1234",
    apps: ["vmax-crm", "vmax-app"],
  },
];

const generatePayload = (userId) => {};

async function doLogin(email, password, redirectURL, tenantId) {
  user = users.find(
    (a) => a.email == email && a.password == password && tenantId == tenantId
  );

  if (!user) {
    throw new AunthenticationError("Incorrect email and password");
  }

  const sessionId = uuid();

  return { sessionId: sessionId, user: user };
}

async function generateToken(user) {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

  return token;
}

module.exports = { doLogin, generateToken };
