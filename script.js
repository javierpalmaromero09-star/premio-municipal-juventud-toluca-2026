
/* ==========================================
   PORTAFOLIO CURRICULAR
   Componentes compartidos y navegación
   ========================================== */

document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  // Carga un componente HTML compartido.
  async function loadComponent(container, path) {
    if (!container) return;

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`No se pudo cargar ${path}: ${response.status}`);
      }

      container.innerHTML = await response.text();
    } catch (error) {
      console.error("Error al cargar el componente:", error);
      container.innerHTML = "";
    }
  }

  // Carga el encabezado y el pie de página.
  await Promise.all([
    loadComponent(headerContainer, "components/header.html"),
    loadComponent(footerContainer, "components/footer.html")
  ]);

  // Identifica el archivo de la página actual.
  const currentFile = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  const currentPage = currentFile === "" || currentFile === "index.html"
    ? "index"
    : currentFile.replace(/\.html$/, "");

  // Resalta automáticamente el apartado actual.
  const navLinks = document.querySelectorAll(".nav a[data-page]");

  navLinks.forEach((link) => {
    const isCurrent = link.dataset.page === currentPage;

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }

    link.classList.toggle("active", isCurrent);
  });

  // Configura el menú móvil.
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    function closeMenu() {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Cerrar menú de navegación"
          : "Abrir menú de navegación"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });
  }

  // Actualiza el año del pie de página.
  const footerYear = document.getElementById("footer-year");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
