document.addEventListener("DOMContentLoaded", function () {
  const langSelect = document.getElementById("languageSelect");
  const savedLang = localStorage.getItem("selectedLang") || "en";

  // Load default/saved language
  loadLanguage(savedLang);
  if (langSelect) langSelect.value = savedLang;

  // Handle user change
  if (langSelect) {
    langSelect.addEventListener("change", function () {
      const selectedLang = this.value;
      loadLanguage(selectedLang);
      localStorage.setItem("selectedLang", selectedLang);
    });
  }
});

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(response => {
      if (!response.ok) throw new Error("Language file not found");
      return response.json();
    })
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) {
          el.innerHTML = data[key];
        }
      });
    })
    .catch(error => console.error("Language load error:", error));
}
