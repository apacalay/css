const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve hehe.html dari root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hehe.html"));
});

// Endpoint proxy
app.post("/proxy", async (req, res) => {
  try {
    const { url, method = "GET", headers = {}, body } = req.body;

    if (!url) {
      return res.status(400).send("Missing 'url' in request body.");
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get("content-type") || "text/plain";
    res.setHeader("content-type", contentType);

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
