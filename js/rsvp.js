

    /* ==========================================
   LÓGICA PANEL DE NECESIDADES / RSVP (Actualizada)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEHCXPRYMFVdfVFGDPh_XzPAjy8X3p5RT7G4Ixsybp-0QE3jE3y_SkMWuG72-R-og9/exec";

    const rsvpForm = document.getElementById("rsvpForm");
    const rsvpContainer = document.getElementById("rsvpContainer");

    // 🛡️ COMPROBAR ESTADO INICIAL AL CARGAR LA PÁGINA
    // Si ya se había enviado el formulario anteriormente, desbloquear música de inmediato
    if (localStorage.getItem("simsRsvpCompleted") === "true") {
        unlockMusicSection();
    }

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // 1. Capturar los valores del formulario
            const asistenciaValue = document.getElementById("asistencia").value;
            const formData = {
                nombre: document.getElementById("nombre").value.trim(),
                asistencia: asistenciaValue,
                acompanantes: document.getElementById("acompanantes").value,
                comentarios: document.getElementById("comentarios").value.trim()
            };

            // 2. Feedback visual de carga en el botón
            const submitBtn = rsvpForm.querySelector("button[type='submit']");
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Guardando en el solar...";
            submitBtn.disabled = true;

            try {
                // 3. Petición POST a Google Sheets
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                // 4. Mostrar mensaje dinámico y desbloquear
                showSuccessState(asistenciaValue);
                localStorage.setItem("simsRsvpCompleted", "true");
                unlockMusicSection();

            } catch (error) {
                console.error("Error al enviar los datos:", error);
                alert("Hubo un error al enviar tu respuesta. Por favor, intentalo de nuevo.");
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showSuccessState(asistencia) {
        let mensajeTitulo = "✨ ¡Respuesta Registrada!";
        let mensajeTexto = "Tus datos se guardaron correctamente en el solar.";

        if (asistencia.includes("No puedo")) {
            mensajeTitulo = "🛸 ¡Qué lástima que no vengas!";
            mensajeTexto = "Tu Sim se perderá una gran fiesta, ¡esperamos que los OVNIs te devuelvan pronto!";
        } else if (asistencia.includes("llego tarde")) {
            mensajeTitulo = "⏰ ¡Anotado con demora!";
            mensajeTexto = "Tu Sim ha ganado puntos de impuntualidad con estilo. ¡Te esperamos igual!";
        } else {
            mensajeTitulo = "✨ ¡Asistencia Confirmada!";
            mensajeTexto = "Tu Sim ha ganado <strong>+100 en la barra de Socialización</strong>. ¡Nos vemos en la fiesta!";
        }

        if (rsvpContainer) {
            rsvpContainer.innerHTML = `
                <div class="success-notification">
                    <div class="plumbob-small" style="margin-bottom: 1rem;"></div>
                    <h3>${mensajeTitulo}</h3>
                    <p>${mensajeTexto}</p>
                </div>
            `;
        }
    }

    // Función auxiliar para quitar el bloqueo de la sección de música
    function unlockMusicSection() {
        const musicSection = document.getElementById("music-section");
        if (musicSection) {
            musicSection.classList.remove("locked");
            const lockNotice = document.getElementById("lockNotice");
            if (lockNotice) lockNotice.remove();
        }
    }
});