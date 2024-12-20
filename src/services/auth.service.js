const { uuid } = require("uuidv4");
const AunthenticationError = require("../helpers/exception");
const jwt = require("jsonwebtoken");
const Tenant = require("../models").Tenant;
const App = require("../models").Application;
const AppTenantMapping = require("../models").AppTenantMapping;
const UserSession = require("../models").UserSession;
const ResetPasswordSession = require("../models").ResetPasswordSession;
const userService = require("./user.service");
const userAppMappingService = require("./user_app_mapping.service");
const e = require("express");
const { sendEmail } = require("./email.service");
const { getResetPasswordEmail } = require("../templates/templates.service");

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

async function doForgotPassword(appId, email, host) {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new AunthenticationError("User not found");
  }

  const apps = await userAppMappingService.GetMappingsByUserId(user.id);

  const app = apps?.find((a) => a.app_id == appId);
  if (!app) {
    throw new AuthenticationError("User not authorized for this app");
  }

  const sessionId = uuid();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const link = `http://${host}/api/auth/reset-password?token=${sessionId}`;

  const resetPasswordSession = {
    sessionId: sessionId,
    email: email,
    appId: appId,
    expiresAt: expiresAt,
  };

  const result = await ResetPasswordSession.create(resetPasswordSession);

  const template = getResetPasswordEmail(link);

  await sendEmail(email, "Password Reset Request", template);

  return result;
}

async function resetPassword(params) {}

async function doLogin(email, password, redirectURL, tenantId) {
  user = users.find(
    (a) => a.email == email && a.password == password && tenantId == tenantId
  );

  if (!user) {
    throw new AunthenticationError("Incorrect email and password");
  }

  const sessionId = uuid();
  const expiresAt = new Date(Date.now() + 1 * 15 * 60 * 1000);
  createUserSession({
    sessionId: sessionId,
    user: user,
    appId: tenantId,
    expiresAt: expiresAt,
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
      if (app.login_redirect_uri != redirectURL) {
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
    attributes: ["id", "user", "appId", "expiresAt"],
    where: {
      sessionId: id,
    },
  });

  return session;
};

async function validateToken(token) {
  try {
    if (token == null) {
      return "Invalid token";
    }

    const session = await ResetPasswordSession.findOne({
      attributes: ["id", "email", "appId", "expiresAt"],
      where: {
        sessionId: token,
      },
    });

    if (session == null) {
      return "Invalid token";
    } else if (new Date(session.expiresAt) <= new Date()) {
      return "Token expired";
    }

    return "";
  } catch (error) {
    throw new AunthenticationError("Invalid token");
  }
}

module.exports = {
  doLogin,
  generateToken,
  validateAppId,
  getUserSessionById,
  createUserSession,
  deleteUserSession,
  doForgotPassword,
  resetPassword,
  validateToken,
};
