import express from "express";
const app = express();
const port = 5000; // Registry runs on port 5000
app.use(express.json());

const services = {};

// Register service
app.post("/register", (req, res) => {
  const { name, url } = req.body;
  services[name] = { url, timestamp: Date.now() };
  res.json({ success: true, message: `${name} registered at ${url}` });
});

// Discover service
app.get("/discover/:name", (req, res) => {
  const { name } = req.params;
  const service = services[name];

  if (service) {
    res.json({ success: true, url: service.url });
  } else {
    res.status(404).json({ success: false, message: "Service not found" });
  }
});

// Cleanup old services
setInterval(() => {
  const now = Date.now();
  for (let name in services) {
    if (now - services[name].timestamp > 60000) {
      delete services[name];
    }
  }
}, 10000);

app.listen(port, () => {
  console.log(`✅ Service Registry running on http://localhost:${port}`);
});
