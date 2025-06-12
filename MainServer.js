import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./Router/RouteData.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";


const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:3001",              // ✅ Local testing
  "https://mlzs.cyberathon.com"         // ✅ Live subdomain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Handle preflight
app.options("*", cors());


app.use(express.json());
dotenv.config();

app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));
app.use("/pdfs", express.static("pdfs"));

const PORT =process.env.PORT || 7000;
const URL = process.env.MONGOURL;


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: URL,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

mongoose.connect(URL).then (() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
}).catch(error => console.log(error));

app.use("/api", route)

