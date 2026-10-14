/* ==========================================
   LÓGICA HEADER / PANTALLA DE CARGA (Ajustada)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progressBar");
    const loadingTip = document.getElementById("loadingTip");
    const enterBtn = document.getElementById("enterBtn");
    const loadingScreen = document.getElementById("loading-screen");

    // Frases clásicas estilo pantallas de carga de Los Sims
    const simsTips = [
        "Simulando conversaciones agradables...",
        "Quemando waffles en el microondas...",
        "Quejándose de que hay un plato en el suelo...",
        "Bailando canal Sims en la sala...",
        "Ajustando el nivel de diversión al máximo...",
        "¡Sul Sul! Preparando la mejor fiesta..."
    ];

    let progress = 0;
    
    // Cambiar los tips de carga a un ritmo cómodo
    const tipInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * simsTips.length);
        loadingTip.textContent = simsTips[randomIndex];
    }, 1800); // Ligeramente más pausado para leer el tip

    // Simular el progreso de carga un poco más lento y fluido
    const loadingInterval = setInterval(() => {
        // Incremento más chico (entre 2 y 5) por ciclo para que avance más gradual
        progress += Math.floor(Math.random() * 4) + 2;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            clearInterval(tipInterval);

            // Actualizar interfaz al finalizar carga
            progressBar.style.width = "100%";
            loadingTip.textContent = "¡Contenido cargado con éxito!";
            
            // Ocultar barra y mostrar botón de entrada con transición
            setTimeout(() => {
                progressBar.parentElement.style.opacity = "0";
                loadingTip.style.opacity = "0";
                enterBtn.classList.remove("hidden");
            }, 500);
        } else {
            progressBar.style.width = progress + "%";
        }
    }, 130); // Intervalo de milisegundos ajustado para suavizar la velocidad

    // Evento al hacer clic en entrar a la fiesta
    enterBtn.addEventListener("click", () => {
        loadingScreen.classList.add("fade-out");
        
        // Remover el elemento del DOM tras la transición
        setTimeout(() => {
            loadingScreen.remove();
        }, 600);
    });
});