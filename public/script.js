// DOM elements
const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
const contentDiv = document.getElementById("content");

// Function to load subject data dynamically
async function loadSubjectData(subject, className) {
  try {
    const response = await fetch(`/data/${className}`);
    const data = await response.json();

    const subjectData = data[subject];

    if (!subjectData) {
      contentDiv.innerHTML = `<p>🚫 No data found for ${subject} in ${className}.</p>`;
      return;
    }

    // Display data
    contentDiv.innerHTML = `<h2>${subject.toUpperCase()} - ${className.toUpperCase()}</h2>`;
    subjectData.chapters.forEach((chapter) => {
      contentDiv.innerHTML += `
        <div style="margin-bottom: 1.2rem;">
          <h3>${chapter.title}</h3>
          <p>${chapter.summary}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading subject data:", error);
    contentDiv.innerHTML = "<p>❌ Failed to load content.</p>";
  }
}

// Event listeners for dropdown links
dropdownLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const subject = e.target.dataset.subject;
    const className = e.target.dataset.class;
    loadSubjectData(subject, className);
  });
});
