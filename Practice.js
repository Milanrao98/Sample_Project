const form = document.querySelector(".form");
const appNameInput = document.querySelector(".app_name");
const impactInput = document.querySelector(".impact_desc");
const criticalityInput = document.querySelector(".app_criticality");
const espLinkInput = document.querySelector(".esp_link");
const soInput = document.querySelector(".SO");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userId = appNameInput.value.trim();

  if (!userId) {
    alert("Please enter a User ID.");
    return;
  }

  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    impactInput.value = data.email || "";
    criticalityInput.value = data.company?.name || "";
    espLinkInput.value = data.phone || "";
    soInput.value = data.address?.address || "";
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not fetch user. Please check the ID.");
  }
});
