// cisco_server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from public
app.use(express.static("public"));

// Serve JSON from data folder
app.use("/data", express.static(path.join(__dirname, "data")));

// Parse JSON request bodies
app.use(express.json());

// Handle form submission
app.post("/submit", (req, res) => {
  const { app_name, impact_desc, app_criticality, esp_link } = req.body;

  const content = `
=== New Application Lookup ===
App Name: ${app_name}
Service Offering: ${impact_desc}
Monitoring Criticality: ${app_criticality}
Operational Status: ${esp_link}
Timestamp: ${new Date().toLocaleString()}
------------------------------
`;

  fs.appendFile("Data.txt", content, (err) => {
    if (err) {
      console.error("❌ Failed to write file:", err);
      return res.status(500).send("Error saving data.");
    }
    console.log("✅ Data saved successfully");
    res.send("Data saved to Data.txt");
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
