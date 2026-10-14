/* ==========================================
   LÓGICA MÓDULO SOUND (Vanilla JS)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("simsSoundAudio");
    const toggleBtn = document.getElementById("soundToggleBtn");
    const soundIcon = document.getElementById("soundIcon");
    const soundText = document.getElementById("soundText");

    if (!audio || !toggleBtn) return;

    // Volumen suave y sutil al 15% para acompañar de fondo
    audio.volume = 0.02; 
    let isPlaying = false;

    toggleBtn.addEventListener("click", () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                soundIcon.textContent = "🎵";
                soundText.textContent = "Ambiente Activo";
                toggleBtn.style.borderColor = "rgba(56, 189, 248, 0.8)";
            }).catch(error => {
                console.warn("Reproducción bloqueada por interacción requerida:", error);
            });
        } else {
            audio.pause();
            isPlaying = false;
            soundIcon.textContent = "🔇";
            soundText.textContent = "Ambiente Sim";
            toggleBtn.style.borderColor = "rgba(56, 189, 248, 0.35)";
        }
    });
});