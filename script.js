// ============== Dark Mode ============== (unchanged)
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  moonIcon.style.display = "inline-block";
  sunIcon.style.display = "none";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  sunIcon.style.display = isDark ? "none" : "inline-block";
  moonIcon.style.display = isDark ? "inline-block" : "none";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ============== Dynamic Sidebar & Search ============== (optimized)
const sidebar = document.querySelector(".sidebar");
const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
const searchBox = document.querySelector("#search-box");

// Toggle sidebar on mobile
mobileToggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mobileToggleBtn.textContent = sidebar.classList.contains("active")
    ? "<"
    : ">";
});

// Auto-generate contentMap from all [data-value] items
const contentMap = {};
document.querySelectorAll("[data-value]").forEach((item) => {
  contentMap[item.dataset.value] = item.dataset.value;
});

// Handle dropdown arrows (works for any number of dropdowns)
document.querySelectorAll(".toggle-arrow").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const ul = arrow.parentElement.nextElementSibling;
    ul.classList.toggle("active");
    arrow.classList.toggle("collapsed");
  });
});

// Universal search (highlights matches in any dropdown)
searchBox.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  document.querySelectorAll(".sidebar li[data-value]").forEach((option) => {
    const text = option.textContent.toLowerCase();
    option.classList.remove("highlight");

    if (query.length >= 2 && text.includes(query)) {
      option.classList.add("highlight");
      const parentUl = option.closest("ul");
      if (parentUl) {
        parentUl.classList.add("active");
        const arrow =
          parentUl.previousElementSibling?.querySelector(".toggle-arrow");
        if (arrow) arrow.classList.remove("collapsed");
      }
    }

    // Auto-scroll to exact matches
    if (query === text) {
      const section = document.getElementById(contentMap[option.dataset.value]);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Click any list item to scroll to section
document.querySelectorAll(".sidebar li[data-value]").forEach((option) => {
  option.addEventListener("click", () => {
    const section = document.getElementById(contentMap[option.dataset.value]);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  });
});
