const { uuid } = require("uuidv4");
const AunthenticationError = require("../helpers/exception");
const jwt = require("jsonwebtoken");
const Tenant = require("../models").Tenant;
const App = require("../models").Application;
const AppTenantMapping = require("../models").AppTenantMapping;
const UserSession = require("../models").UserSession;

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
  createUserSession({
    identifier: sessionId,
    user: user,
    appId: tenantId,
  });

  return { sessionId: sessionId, user: user };
}

async function generateToken(user) {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

  return token;
}

async function validateAppId(appId, redirectURL) {
  const app = await AppTenantMapping.findByPk(appId);
  if (app != null) {
    if (app.status === "active") {
      if (!app.login_redirect_uri == redirectURL) {
        return "Redirect URL is not valid";
      }

      const tenant = await Tenant.findByPk(app.tenant_id);
      if (tenant.status !== "active") {
        return "Tenant is not active";
      }
    } else {
      return "App is not active";
    }
  } else {
    return "Invalid Request. App not found.";
  }
  return "";
}

const createUserSession = async (session) => {
  const result = await UserSession.create(session);

  return result;
};

const deleteUserSession = async (id) => {
  const result = await UserSession.destroy({
    where: {
      id: id,
    },
  });

  return result;
};

const getUserSessionById = async (id) => {
  const session = await UserSession.findOne({
    attributes: ["id", "user", "appId"],
    where: {
      identifier: id,
    },
  });

  return session;
};

module.exports = {
  doLogin,
  generateToken,
  validateAppId,
  getUserSessionById,
  createUserSession,
  deleteUserSession,
};
