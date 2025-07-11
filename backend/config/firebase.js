// config/firebase.js
import admin from "firebase-admin";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account key JSON
const serviceAccount = JSON.parse(
  await readFile(path.join(__dirname, "serviceAccountKey.json"), "utf-8")
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "aarogyasetu-b7a7b.appspot.com", // Replace with your real bucket ID
});

export default admin;
