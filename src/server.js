const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const session = require("express-session");
const engine = require("ejs-mate");
require("dotenv").config();
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (e.g., from forms)
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const corsOptions = {
  origin: "http://localhost:4200", // Replace with the allowed origin(s)
  methods: "GET,POST", // Allowed methods
  allowedHeaders: "Content-Type,Authorization, tenant-id", // Allowed headers
};
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  session({
    secret: "vmax-hard-to-guess-the-secret",
    resave: false,
    saveUninitialized: true,
  })
);

/*************************MIDDLEWARES***************************/

const tenantMiddleware = require("./middlewares/tenant.middleware");
// app.use('/api/auth/login', tenantMiddleware.tenantAndOriginChecker);
app.use("/api/auth/get-token", tenantMiddleware.tenantChecker);
// app.use('/api/auth/logout', tenantMiddleware.tenantChecker);

/***************************************************************/

/*********************** ROUTES  ********************************/
// const userRouter = require('./routes/user.router');
// app.use('/api/users', userRouter);

const authRouter = require("./routes/auth.router");

app.use("/api/auth", authRouter);

app.get("/api/auth/new-login", (req, res) => {
  // Pass data to the EJS template
  return res.render("login", {
    title: "SSO-Server | Login",
  });
});

/* *************************************************************/

// Handle other endpoints or invalid requests
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
