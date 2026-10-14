/* ==========================================
   LÓGICA CALENDARIO DEL SIM (Google Calendar)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const calendarBtn = document.getElementById("calendarBtn");

    if (calendarBtn) {
        calendarBtn.addEventListener("click", () => {
            // Parámetros oficiales del evento
            const eventDetails = {
                text: "Fiesta Temática Los Sims",
                dates: "20261024T163000/20261024T173000", // Formato UTC ISO
                details: "¡No te olvides de venir con tu mejor onda sim! Habrá comida, música y mucha diversión en el solar.",
                location: "Gualeguaychú 1012, Floresta, CABA, Argentina"
            };

            // Construcción dinámica de la URL oficial de Google Calendar
            const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
            const googleCalendarUrl = `${baseUrl}&text=${encodeURIComponent(eventDetails.text)}&dates=${encodeURIComponent(eventDetails.dates)}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;

            // Apertura segura en pestaña nueva
            window.open(googleCalendarUrl, "_blank");
        });
    }
});