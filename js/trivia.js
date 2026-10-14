/* ==========================================
   LÓGICA TRIVIA SIMS (Desafío de Lore y Simoleones)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Banco completo de preguntas sobre el universo de Los Sims (11 en total)
    const allQuestions = [
        {
            question: "¿Cómo se llama el famoso idioma ficticio que hablan los Sims?",
            options: ["Simlish", "Llamatí", "Plumbobés", "Oompa Loompa"],
            correct: 0
        },
        {
            question: "¿Qué forma y color tiene el icónico indicador de estado de ánimo flotante?",
            options: ["Un círculo rojo", "Un diamante verde", "Una estrella dorada", "Un cuadrado azul"],
            correct: 1
        },
        {
            question: "¿Qué ocurre normalmente si un Sim pasa demasiado tiempo en la piscina y le quitan la escalera?",
            options: ["Aprende a nadar como pez", "Gana puntos de condición física", "Se cansa y no puede salir", "Se teleporta a su casa"],
            correct: 2
        },
        {
            question: "¿Cuál es el apellido de la mítica familia vecina inicial en Los Sims?",
            options: ["Los Pérez", "Los Gómez", "Los Lápida (Goth)", "Los Simonson"],
            correct: 2
        },
        {
            question: "¿Qué truco legendario se usaba en Los Sims para obtener 50,000 Simoleones instantáneamente?",
            options: ["motherlode", "kaching", "freedelivery", "givemoney50k"],
            correct: 0
        },
        {
            question: "¿Cómo se llama la famosa parca o entidad de la muerte en Los Sims?",
            options: ["La Parca (Grim Reaper)", "El Huesitos", "Don Calavera", "El Ángel Sim"],
            correct: 0
        },
        {
            question: "¿Cuál es el nombre de la ciudad predeterminada en Los Sims 2",
            options: ["SimCity", "Las Rarezas", "Vista Hermosa (Pleasantview)", "Veronaville"],
            correct: 2
        },
        {
            question: "¿Qué criatura sobrenatural fue introducida en la expansión 'Y Las Cuatro Estaciones'?",
            options: ["Los Vampiros", "Los Aliens", "Los Plantasims (PlantSims)", "Los Hombres Lobo"],
            correct: 2
        },
        {
            question: "¿Cómo se llama la zona comercial nocturna típica para citas en Los Sims 2?",
            options: ["El Parque Central", "Centro de la Ciudad (Downtown)", "El Bazar Sim", "Plaza Bohemia"],
            correct: 1
        },
        {
            question: "¿Qué habilidad necesita nivel máximo un Sim para poder reparar electrodomésticos sin electrocutarse?",
            options: ["Cocina", "Lógica", "Mecánica", "Carisma"],
            correct: 2
        },
        {
            question: "¿Cuál es el nombre del famoso vecindario misterioso lleno de OVNIs y experimentos en Los Sims 2?",
            options: ["Las Rarezas (Strangetown)", "Valle Desiderata", "Colinas del Río", "Puerto Bluffs"],
            correct: 0
        },
        {
            question: "¿Cuál es el nombre del famoso vecindario playero introducido en la expansión 'Los Sims 2: Y Sus Hobbies' o 'Abren Negocios' (Costa Bonita)?",
            options: ["Valle Desiderata (Desiderata Valley)", "Plaza Sim", "Las Rarezas", "Colinas del Río"],
            correct: 0
        },
        {
            question: "¿Cómo se llama el infame servicio secreto o entidad militar que puede abducir a tus Sims si usan el telescopio por la noche?",
            options: ["Los Militares", "El FBI Sim", "La Abducción Extraterrestre (OVNI)", "La Agencia Plumbob"],
            correct: 2
        },
        {
            question: "¿Qué objeto clásico de Los Sims permite a los adolescentes y niños escaparse o jugar bromas telefónicas?",
            options: ["El teléfono fijo", "La computadora", "La televisión de plasma", "El intercomunicador"],
            correct: 0
        },
        {
            question: "¿Cómo se llama la moneda oficial que se utiliza en todas las entregas de la saga Los Sims?",
            options: ["Dólares", "Monedas Sim", "Simoleones", "Plumbobcoins"],
            correct: 2
        },
        {
            question: "¿Qué estado emocional o de humor adquiere un Sim cuando come demasiado queso con grillos o comida en mal estado?",
            options: ["Mareado / Náuseas", "Eufórico", "Inspirado", "Aburrido"],
            correct: 0
        },
        {
            question: "¿Cuál es el nombre de la mítica mansión encantada o lúgubre que aparece en Los Sims 2 en Las Rarezas?",
            options: ["Mansión Espectral", "Mansión Curiosa (Specter)", "Villa Oculta", "Casona Sombría"],
            correct: 1
        },
        {
            question: "¿Qué tipo de animal doméstico se pudo crear por primera vez con total personalización en 'Los Sims 2: Mascotas'?",
            options: ["Delfines y loros", "Perros, gatos y pájaros (y lobos)", "Dragones mágicos", "Monos espaciales"],
            correct: 1
        },
        {
            question: "¿Cómo se llama el barman o cantinero oficial y eterno del vecindario nocturno en Los Sims 2: Comparten Piso / Nightlife?",
            options: ["El barman misterioso", "El Oso Sim", "Gordon King o camareros genéricos del Downtown", "Elmo"],
            correct: 2
        },
        {
            question: "¿Qué sucede si un Sim deja la comida en el horno y este se incendia sin que nadie llame a los bomberos?",
            options: ["Se apaga solo con agua de lluvia", "Aparece la Parca y puede llevarse al Sim", "El Sim gana nivel de cocina automáticamente", "La casa se teletransporta"],
            correct: 1
        },
        {
            question: "¿Cómo se le llama popularmente al modo de construcción y diseño libre donde los jugadores pasan horas construyendo casas sin control?",
            options: ["Modo Arquitecto / Build Mode", "Modo Dios", "Modo Simulación", "Modo Creativo Libre"],
            correct: 0
        }
    ];

    const MAX_ATTEMPTS = 3; 
    let activeQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let currentSimoleones = 0;

    // Referencias al DOM
    const startScreen = document.getElementById("triviaStartScreen");
    const gameScreen = document.getElementById("triviaGameScreen");
    const resultScreen = document.getElementById("triviaResultScreen");
    const startTriviaBtn = document.getElementById("startTriviaBtn");
    const restartTriviaBtn = document.getElementById("restartTriviaBtn");
    const attemptsLeftSpan = document.getElementById("attemptsLeft");
    const questionCounter = document.getElementById("questionCounter");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const questionTitle = document.getElementById("questionTitle");
    const optionsContainer = document.getElementById("optionsContainer");
    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");

    // Obtener cuántos intentos se han hecho de forma segura
    function getAttemptsUsed() {
        const attempts = localStorage.getItem("simsTriviaAttempts");
        const parsed = parseInt(attempts, 10);
        return isNaN(parsed) ? 0 : parsed;
    }

    // Actualizar interfaz y estado de los intentos
    function updateAttemptsUI() {
        const attemptsUsed = getAttemptsUsed();
        const remaining = Math.max(0, MAX_ATTEMPTS - attemptsUsed);
        
        if (attemptsLeftSpan) {
            attemptsLeftSpan.textContent = remaining;
        }

        if (attemptsUsed >= MAX_ATTEMPTS) {
            startTriviaBtn.disabled = true;
            startTriviaBtn.innerHTML = `🔒 Sin intentos disponibles <small style="display:block; font-size:11px; cursor:pointer; text-decoration:underline; margin-top:4px;" id="resetAttemptsLink">🔄 (Reiniciar intentos para probar)</small>`;
            startTriviaBtn.style.opacity = "0.7";
            startTriviaBtn.style.cursor = "default";

            // Enlace de emergencia para resetear en desarrollo sin ir a la consola
            const resetLink = document.getElementById("resetAttemptsLink");
            if (resetLink) {
                resetLink.onclick = (e) => {
                    e.stopPropagation();
                    localStorage.removeItem("simsTriviaAttempts");
                    updateAttemptsUI();
                };
            }
        } else {
            startTriviaBtn.disabled = false;
            startTriviaBtn.innerHTML = `🚀 Iniciar Trivia (Intentos: <span id="attemptsLeft">${remaining}</span>/3)`;
        }
    }

    // Inicializar estado visual al cargar
    updateAttemptsUI();

    if (startTriviaBtn) {
        startTriviaBtn.addEventListener("click", () => {
            const attemptsUsed = getAttemptsUsed();
            
            if (attemptsUsed >= MAX_ATTEMPTS) {
                return;
            }

            // Registrar el nuevo intento usado
            localStorage.setItem("simsTriviaAttempts", attemptsUsed + 1);
            updateAttemptsUI();

            // Selección aleatoria de 5 preguntas de las 11 totales
            activeQuestions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);

            // Reiniciar variables de la partida
            currentQuestionIndex = 0;
            score = 0;
            currentSimoleones = 0;

            // Cambiar de pantalla
            startScreen.classList.add("hidden");
            gameScreen.classList.remove("hidden");
            loadQuestion();
        });
    }

    function loadQuestion() {
        if (currentQuestionIndex >= activeQuestions.length) {
            showResults();
            return;
        }

        const q = activeQuestions[currentQuestionIndex];
        questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1}/${activeQuestions.length}`;
        scoreDisplay.textContent = `💰 ${currentSimoleones} Simoleones`;
        questionTitle.textContent = q.question;
        optionsContainer.innerHTML = "";

        q.options.forEach((optionText, index) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "option-btn";
            btn.textContent = optionText;
            btn.addEventListener("click", () => selectAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function selectAnswer(selectedIndex, selectedBtn) {
        const q = activeQuestions[currentQuestionIndex];
        const allButtons = optionsContainer.querySelectorAll(".option-btn");

        allButtons.forEach(b => b.disabled = true);

        if (selectedIndex === q.correct) {
            selectedBtn.classList.add("correct");
            score++;
            currentSimoleones += 1000;
        } else {
            selectedBtn.classList.add("incorrect");
            allButtons[q.correct].classList.add("correct");
        }

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < activeQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1200);
    }

    function showResults() {
        gameScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

        let title = "";
        let msg = "";

        if (score === 5) {
            title = "🏆 ¡Sim Expertísimo!";
            msg = `¡Respondiste todo bien! Ganaste <strong>${currentSimoleones} Simoleones</strong>. ¡Tienes el título oficial de Arquitecto del Simlish!`;
        } else if (score >= 3) {
            title = "✨ ¡Buen Trabajo!";
            msg = `Obtuviste ${score}/5 aciertos y acumulaste <strong>${currentSimoleones} Simoleones</strong>. ¡Tu Sim sobrevivirá a la fiesta sin quemar la cocina!`;
        } else {
            title = "🔥 ¡Ñiqui-Ñiqui Fallido!";
            msg = `Apenas conseguiste ${score}/5 aciertos y ${currentSimoleones} Simoleones. ¡Parece que te pasaste mucho tiempo con los OVNIs y te olvidaste del lore!`;
        }

        resultTitle.textContent = title;
        resultMessage.innerHTML = msg;
    }

    if (restartTriviaBtn) {
        restartTriviaBtn.addEventListener("click", () => {
            resultScreen.classList.add("hidden");
            startScreen.classList.remove("hidden");
            updateAttemptsUI();
        });
    }
});