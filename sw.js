if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("SW Registrado:", reg))
      .catch((err) => console.error("Error registrando SW:", err));
  });
}
