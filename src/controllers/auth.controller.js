const authService = require("../services/auth.service");

const session = {};

/*
TODO:
Since the container will be running in multiple instances, session cannot be stored in the web server memory.
Instead, some common place should be used to store the session. It can be either a memcache or nosql db.
GCP provides fire store for handling session which can be used
along with express-session package.
- https://cloud.google.com/nodejs/getting-started/session-handling-with-firestore
 
Once we finalize the cloud provider, utlize the cloud offering to handle the sessions. As of now session data is 
stored in server mememory.
*/

async function login(req, res, next) {
  const { redirectUrl, tenantId } = req.query;

  if (tenantId == null)
    return res.json(403, "Invalid Request. Tenant Id is missing");

  if (redirectUrl == null)
    return res.json(403, "Invalid Request. Redirect URL is missing");

  if (session[tenantId] != null && redirectUrl != null) {
    const sessionId = Object.keys(session[tenantId])[0];

    if (sessionId != null) console.log(sessionId);

    return res.redirect(redirectUrl + "?uuid=" + sessionId);
  }

  return res.render("login", {
    title: "SSO-Server | Login",
  });
}

async function doLogin(req, res, next) {
  const { redirectUrl, tenantId } = req.query;

  if (tenantId == null)
    return res.json(403, "Invalid Request. Tenant Id is missing");

  if (redirectUrl == null)
    return res.json(403, "Invalid Request. Redirect URL is missing");

  //tenantCheck logic to be added here

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "Email or password is empty. Please pass a valid input. ",
    });

  try {
    const { sessionId, user } = await authService.doLogin(email, password);

    if (!session[tenantId]) session[tenantId] = {};

    session[tenantId][sessionId] = user;

    console.log(session);

    return res.redirect(redirectUrl + "?uuid=" + sessionId);
  } catch (exception) {
    return next(exception);
  }
}

async function getToken(req, res, next) {
  const tenantId = req.headers["tenant-id"];
  const { sessionId } = req.query;

  console.log(session);

  if (
    !sessionId ||
    !session[tenantId] ||
    session[tenantId][sessionId] == null
  ) {
    return res.status(401).json({ message: "Invalid id. Login again. " });
  }

  const user = session[tenantId][[sessionId]];

  console.log(user);

  const token = await authService.generateToken(user);

  return res.json({ id_token: token });
}

async function logout(req, res, next) {
  const { sessionId, tenantId, redirectUrl } = req.query;

  if (tenantId == null)
    return res.json(403, "Invalid Request. Tenant Id is missing");

  if (sessionId == null)
    return res.json(403, "Invalid Request. SessionId is missing");

  if (!session[tenantId]) {
    return res.send("Success");
  }

  delete session[tenantId][sessionId];

  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }
  return res.send("Success");
}

module.exports = { login, doLogin, getToken, logout };
