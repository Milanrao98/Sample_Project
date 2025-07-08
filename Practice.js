const form = document.querySelector(".form");
const appNameInput = document.querySelector(".app_name");
const impactInput = document.querySelector(".impact_desc");
const criticalityInput = document.querySelector(".app_criticality");
const espLinkInput = document.querySelector(".esp_link");
const soInput = document.querySelector(".SO");
const suggestionsBox = document.querySelector(".autocomplete-box");

let appList = [];

async function loadAppNames() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Milanrao98/Sample_Project/main/Application%20Info.json");
    const data = await response.json();
    appList = data.map(app => app["Name"]);
  } catch (error) {
    console.error("Error loading app names:", error);
  }
}
loadAppNames();

// Show autocomplete suggestions while typing
appNameInput.addEventListener("input", () => {
  const currentText = appNameInput.value.split(",").pop().trim().toLowerCase();

  if (!currentText) {
    suggestionsBox.innerHTML = "";
    return;
  }

  const matches = appList.filter(name =>
    name.toLowerCase().includes(currentText)
  );

  if (matches.length === 0) {
    suggestionsBox.innerHTML = "";
    return;
  }

  const listItems = matches.map(match => `<li>${match}</li>`).join("");
  suggestionsBox.innerHTML = `<ul>${listItems}</ul>`;
});

// Click on suggestion
suggestionsBox.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selected = e.target.textContent;
    const parts = appNameInput.value.split(",");
    parts[parts.length - 1] = selected;
    appNameInput.value = parts.join(", ") + ", ";
    suggestionsBox.innerHTML = "";
  }
});

// Handle submit
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
      return names.some(input => appName.includes(input));
    });

    if (matchedApps.length === 0) {
      alert("No matching apps found.");
      return;
    }

    impactInput.value = matchedApps.map(app => app["Service Offering"]).join(", ");
    criticalityInput.value = matchedApps.map(app => app["Monitoring Criticality"]).join(", ");
    espLinkInput.value = matchedApps.map(app => app["Operational Status"]).join(", ");
    soInput.value = matchedApps.length;

  } catch (error) {
    console.error("Error fetching JSON:", error);
    alert("Could not fetch application data.");
  }
});
