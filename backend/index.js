const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = {};

// USE ENV VARIABLES IN REAL PROJECT
const GMAIL_USER = "pandacart718@gmail.com";
const GMAIL_APP_PASSWORD = "ugqembvqvaxbtfvz";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// SEND OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore[email] = { otp, expiresAt };

  try {
    await transporter.sendMail({
      from: `PandaCart <${GMAIL_USER}>`,
      to: email,
      subject: "Your PandaCart OTP",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// VERIFY OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "OTP not found" });
  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }
  if (record.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email];
  res.json({ message: "OTP verified" });
});

// SAVE USER
const USERS_FILE = path.join(__dirname, "data", "users.json");

app.post("/save-user", (req, res) => {
  const { email, name, phone, residence } = req.body;

  if (!email || !name || !phone || !residence) {
    return res.status(400).json({ message: "Incomplete data" });
  }

  let users = [];

  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  }

  if (users.find(u => u.email === email)) {
    return res.json({ message: "User already exists" });
  }

  users.push({
    email,
    name,
    phone,
    residence,
    createdAt: new Date().toISOString(),
  });

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: "User saved successfully" });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
