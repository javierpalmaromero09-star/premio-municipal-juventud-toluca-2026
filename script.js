
document.addEventListener("DOMContentLoaded", async () => {
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    try {
      const response = await fetch("footer.html");

      if (!response.ok) {
        throw new Error("No se pudo cargar el pie de página");
      }

      footerContainer.innerHTML = await response.text();
    } catch (error) {
      console.error("Error al cargar el pie de página:", error);
    }
  }
});
