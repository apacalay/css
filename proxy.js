const express = require("express");
const fetch = require("node-fetch"); // versi 2
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/proxy", async (req, res) => {
  const targetUrl = req.body.target;
  const { target, ...params } = req.body;

  const form = new URLSearchParams(params).toString();
  console.log("⏩ Sending to:", targetUrl);
  console.log("📦 Data:", form);

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form
    });

    const text = await response.text();
    res.set("Content-Type", "text/plain");
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", detail: err.message });
  }
});

app.listen(3000, () => console.log("✅ Proxy running at http://localhost:3000"));
