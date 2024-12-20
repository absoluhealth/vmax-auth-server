const authService = require("../services/auth.service");
const { errorResponse } = require("../lib/helper");

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
  const { redirectUrl, appId } = req.query;

  if (appId == null)
    return errorResponse(req, res, "Invalid Request. App Id is missing", 403);

  if (redirectUrl == null)
    return errorResponse(
      req,
      res,
      "Invalid Request. Redirect URL is missing",
      403
    );

  var error = await authService.validateAppId(appId, redirectUrl);
  if (error !== "") {
    return errorResponse(req, res, error, 403);
  }

  // if (session[appId] != null && redirectUrl != null) {
  //   const sessionId = Object.keys(session[appId])[0];

  //   if (sessionId != null) console.log(sessionId);

  //   return res.redirect(redirectUrl + "?uuid=" + sessionId);
  // }

  return res.render("login", {
    title: "SSO-Server | Login",
  });
}

async function doLogin(req, res, next) {
  const { redirectUrl, appId } = req.query;

  if (appId == null)
    return errorResponse(req, res, "Invalid Request. App Id is missing", 403);

  if (redirectUrl == null)
    return errorResponse(
      req,
      res,
      "Invalid Request. Redirect URL is missing",
      403
    );

  //tenantCheck logic to be added here

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "Email or password is empty. Please pass a valid input. ",
    });

  try {
    const { sessionId, user } = await authService.doLogin(
      email,
      password,
      "",
      appId
    );

    // if (!session[appId]) session[appId] = {};

    // session[appId][sessionId] = user;

    //  console.log(session);
    var redirect = redirectUrl + "?uuid=" + sessionId;
    return res.status(200).json({ redirect });
  } catch (exception) {
    return next(exception);
  }
}

async function getToken(req, res, next) {
  const appId = req.headers["app-id"];
  const { sessionId } = req.query;

  console.log(session);

  var session = await authService.getUserSessionById(sessionId);

  if (!sessionId || !session || session == null) {
    return errorResponse(req, res, "Invalid id. Login again. ", 401);
  }

  if (new Date(session.expiresAt) <= new Date()) {
    authService.deleteUserSession(session.id);
    return errorResponse(req, res, "Session has expired.", 401);
  }

  const user = session.user;
  if (authService.deleteUserSession(session.id) == 0) {
    return errorResponse(req, res, "Invalid id. Login again. ", 401);
  }

  const token = await authService.generateToken(user);

  return res.json({ id_token: token });
}

async function logout(req, res, next) {
  const { sessionId, appId, redirectUrl } = req.query;

  if (appId == null)
    return errorResponse(req, res, "Invalid Request. App Id is missing", 403);

  if (sessionId == null)
    return errorResponse(
      req,
      res,
      "Invalid Request. SessionId is missing",
      403
    );

  // if (!session[appId]) {
  //   return res.send("Success");
  // }

  // delete session[appId][sessionId];

  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }
  return errorResponse(req, res, "Success");
}

module.exports = { login, doLogin, getToken, logout };
