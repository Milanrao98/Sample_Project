const form = document.querySelector(".form");
const appNameInput = document.querySelector(".app_name");
const impactInput = document.querySelector(".impact_desc");
const criticalityInput = document.querySelector(".app_criticality");
const espLinkInput = document.querySelector(".esp_link");
const soInput = document.querySelector(".SO");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const names = appNameInput.value
    .split(",")
    .map(name => name.trim().toLowerCase())
    .filter(name => name);

  if (names.length === 0) {
    alert("Please enter at least one application name.");
    return;
  }

  try {
    const response = await fetch("https://raw.githubusercontent.com/Milanrao98/Sample_Project/main/Application%20Info.json");
    if (!response.ok) throw new Error("Failed to load JSON");

    const data = await response.json();

    const matchedApps = data.filter(app => {
      const appName = (app["Name"] || "").trim().toLowerCase();
      return names.includes(appName);
    });

    if (matchedApps.length === 0) {
      alert("No matching apps found.");
      return;
    }

    // Use exact JSON keys: "Service Offering", "Monitoring Criticality", "Operational Status"
    impactInput.value = matchedApps.map(app => app["Service Offering"]).join(", ");
    criticalityInput.value = matchedApps.map(app => app["Monitoring Criticality"]).join(", ");
    espLinkInput.value = matchedApps.map(app => app["Operational Status"]).join(", ");
    soInput.value = matchedApps.length;

  } catch (error) {
    console.error("Error fetching JSON:", error);
    alert("Could not fetch application data.");
  }
});
