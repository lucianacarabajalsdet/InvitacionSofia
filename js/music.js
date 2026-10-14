
/* ==========================================
   LÓGICA CABINA DE DJ / MÚSICA
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const GOOGLE_SCRIPT_URL_MUSIC = "https://script.google.com/macros/s/AKfycbxu7ecHXUmO0miv6owUjidsmt_dlgx0uVA-xSLMWL-ajrPhnI0pT8E8l-YEG07Yl8NX/exec"; // Reemplazar con tu URL

    const musicSection = document.getElementById("music-section");
    const musicForm = document.getElementById("musicForm");
    const musicContainer = document.getElementById("musicContainer");

    // 🛡️ VERIFICAR ESTADO AL CARGAR: Si el RSVP NO está completo, asegurar el bloqueo visual
    const rsvpCompleted = localStorage.getItem("simsRsvpCompleted") === "true";

    if (!rsvpCompleted) {
        if (musicSection) musicSection.classList.add("locked");
    } else {
        if (musicSection) musicSection.classList.remove("locked");
        const lockNotice = document.getElementById("lockNotice");
        if (lockNotice) lockNotice.remove();
    }

    if (musicForm) {
        musicForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            //  DOBLE VALIDACIÓN DE SEGURIDAD (Por si intentan hacer trampa vía consola)
            if (localStorage.getItem("simsRsvpCompleted") !== "true") {
                alert(" ¡Atención! Debes completar y enviar la sección RSVP antes de sugerir música.");
                return;
            }

            const formData = {
                nombre: document.getElementById("djNombre").value.trim(),
                cancion: document.getElementById("cancion").value.trim(),
                comentario: document.getElementById("djComentario").value.trim()
            };

            const submitBtn = musicForm.querySelector("button[type='submit']");
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Mezclando pista...";
            submitBtn.disabled = true;

            try {
                await fetch(GOOGLE_SCRIPT_URL_MUSIC, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                showMusicSuccessState();

            } catch (error) {
                console.error("Error al enviar la sugerencia:", error);
                alert("Hubo un error al enviar tu tema. Por favor, intentalo de nuevo.");
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showMusicSuccessState() {
        if (musicContainer) {
            musicContainer.innerHTML = `
                <div class="music-success">
                    <div class="plumbob-small" style="margin-bottom: 1rem;"></div>
                    <h3>🎧 ¡Temazo Agregado!</h3>
                    <p>Tu sugerencia musical fue enviada con éxito a la cabina del DJ.</p>
                </div>
            `;
        }
    }
});