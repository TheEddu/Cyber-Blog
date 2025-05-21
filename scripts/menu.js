function setupMenuToggle() {
  const toggleBtn = document.getElementById("toggleMenu");
  const sidebar = document.getElementById("sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMenuToggle);
} else {
  setupMenuToggle();
}

const observer = new MutationObserver(() => {
  setupMenuToggle();
});
observer.observe(document.body, { childList: true, subtree: true });