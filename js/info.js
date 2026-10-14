/* ==========================================
   LÓGICA PANEL DE CONTROL / INFO DEL SIM
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const traitBadges = document.querySelectorAll(".trait-badge");

    // Interactividad para los rasgos: muestra una burbuja de pensamiento al hacer clic
    traitBadges.forEach(badge => {
        badge.addEventListener("click", () => {
            const tooltipText = badge.getAttribute("data-tooltip");
            showSimThought(badge, tooltipText);
        });
    });

    function showSimThought(element, text) {
        // Remover burbuja anterior si ya existe abierta
        const existingBubble = document.querySelector(".sim-thought-bubble");
        if (existingBubble) existingBubble.remove();

        const bubble = document.createElement("div");
        bubble.className = "sim-thought-bubble";
        bubble.textContent = text;
        
        // Estilos dinámicos de la burbuja flotante
        bubble.style.position = "absolute";
        bubble.style.bottom = "115%";
        bubble.style.left = "50%";
        bubble.style.transform = "translateX(-50%)";
        bubble.style.background = "#ffffff";
        bubble.style.color = "#002200";
        bubble.style.padding = "0.5rem 0.8rem";
        bubble.style.borderRadius = "12px";
        bubble.style.fontSize = "0.75rem";
        bubble.style.fontWeight = "bold";
        bubble.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        bubble.style.zIndex = "10";
        bubble.style.whiteSpace = "nowrap";
        bubble.style.animation = "fadeInOut 2.5s forwards";

        element.style.position = "relative";
        element.appendChild(bubble);

        // Auto eliminar después de la animación
        setTimeout(() => {
            bubble.remove();
        }, 2500);
    }
});