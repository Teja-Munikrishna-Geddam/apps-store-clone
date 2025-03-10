document.addEventListener("DOMContentLoaded", function () {
  async function displayApps() {
    try {
      // Fetch the JSON data
      const response = await fetch("appData.json");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Categories:", data.categories);

      // Get the container where all categories and apps will be displayed
      const container = document.getElementById("app-container");

      // Loop through each category
      data.categories.forEach((category) => {
        // Create a new category section
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        // Create and set the category title
        const categoryTitle = document.createElement("h2");
        categoryTitle.classList.add("category-title");
        categoryTitle.textContent = category.title;

        // Create a container for apps (horizontal scrolling)
        const appsContainer = document.createElement("div");
        appsContainer.classList.add("apps-container");

        // Loop through each app in the category
        category.apps.forEach((app) => {
          // Create an app card
          const appDiv = document.createElement("div");
          appDiv.classList.add("app-card");

          // App logo
          const appLogo = document.createElement("img");
          appLogo.classList.add("app-logo");
          appLogo.src = app.logo;
          appLogo.alt = `${app.name} logo`;

          // App name
          const appName = document.createElement("p");
          appName.classList.add("app-name");
          appName.textContent = app.name;

          // Download link
          const downloadLink = document.createElement("a");
          downloadLink.classList.add("app-link");
          downloadLink.href = app.downloadLink;
          downloadLink.target = "_blank";
          downloadLink.textContent = "Download";

          // Append elements to the app card
          appDiv.appendChild(appLogo);
          appDiv.appendChild(appName);
          appDiv.appendChild(downloadLink);

          // Append the app card to the apps container
          appsContainer.appendChild(appDiv);
        });

        // Append category title and apps container to category div
        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(appsContainer);

        // Append the category div to the main container
        container.appendChild(categoryDiv);
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  // Call the function to display apps when the page loads
  displayApps();
});
