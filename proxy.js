const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve hehe.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "hehe.html"));
});

// Proxy route
app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch(req.body.url, {
      method: req.body.method || "GET",
      headers: req.body.headers || {},
      body: req.body.body ? JSON.stringify(req.body.body) : undefined,
    });
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
