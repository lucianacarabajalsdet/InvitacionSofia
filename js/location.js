/* ==========================================
   LÓGICA MODO CONSTRUCCIÓN (Ubicación)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const copyAddressBtn = document.getElementById("copyAddressBtn");
    const copyFeedback = document.getElementById("copyFeedback");
    const addressText = "Av. Libertador 4500, CABA, Argentina"; // Dirección a copiar

    if (copyAddressBtn) {
        copyAddressBtn.addEventListener("click", async () => {
            try {
                // Usar la API moderna de portapapeles
                await navigator.clipboard.writeText(addressText);

                // Mostrar feedback visual de éxito
                copyFeedback.classList.remove("hidden");
                copyAddressBtn.textContent = "¡Copiado! ✔️";
                copyAddressBtn.style.backgroundColor = "#166534"; // Tono verde éxito

                // Ocultar feedback y restaurar botón después de 3 segundos
                setTimeout(() => {
                    copyFeedback.classList.add("hidden");
                    copyAddressBtn.textContent = "📋 Copiar Dirección";
                    copyAddressBtn.style.backgroundColor = "";
                }, 3000);

            } catch (err) {
                console.error("Error al intentar copiar al portapapeles: ", err);
                alert("No se pudo copiar automáticamente. La dirección es: " + addressText);
            }
        });
    }
});