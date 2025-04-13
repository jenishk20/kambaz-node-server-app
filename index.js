// import "dotenv/config";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import "dotenv/config";
// import session from "express-session";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import Hello from "./Hello.js";
// import Lab5 from "./Lab5/index.js";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// import ModuleRoutes from "./Kambaz/Modules/routes.js";
// import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
// import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

// const CONNECTION_STRING =
//   process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

// const resp = mongoose.connect(CONNECTION_STRING);

// console.log(
//   resp
//     .then(() => {
//       console.log("MongoDB connected");
//     })
//     .catch((err) => {
//       console.error("MongoDB connection error:", err);
//     })
// );

// const app = express();

// app.set("trust proxy", 1);
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.NETLIFY_URL || "http://localhost:5173",
//   })
// );

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kambaz",
//   resave: false,
//   saveUninitialized: false,
//   proxy: true,
//   cookie: {
//     sameSite: "none",
//     secure: process.env.NODE_ENV === "production",
//   },
// };

// // if (process.env.NODE_ENV !== "development") {
// //   sessionOptions.proxy = true;
// //   sessionOptions.cookie = {
// //     sameSite: "none",
// //     secure: true,
// //     domain: process.env.NODE_SERVER_DOMAIN,
// //   };
// // }

// app.use(session(sessionOptions));

// app.use(express.json());

// UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// EnrollmentRoutes(app);
// Hello(app);
// Lab5(app);

// app.listen(process.env.PORT || 4000);

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import UserRoutes from "./Kambaz/Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();

// ✅ 1. Enable trust proxy
app.set("trust proxy", 1);

// ✅ 2. Setup CORS before session
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ frontend dev server
    credentials: true, // ✅ allow cookies
  })
);

// ✅ 3. Setup session with correct secure config
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,
//     proxy: true,
//     cookie: {
//       sameSite: "none",
//       secure: true, // ✅ true because Render uses HTTPS
//     },
//   })
// );

// ✅ 4. Parse incoming JSON
app.use(express.json());

// ✅ 5. Debug middleware
// app.use((req, res, next) => {
//   console.log("SESSION:", req.session);
//   console.log("COOKIES:", req.headers.cookie);
//   next();
// });

// ✅ 6. Routes
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
Lab5(app);

// ✅ 7. Start server
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running");
});
