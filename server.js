const http = require('http');

// Укажите целевую дату
const targetDate = new Date('2026-09-01T08:00:00+03:00');

// SVG-код колокольчика с ручкой и бантиком
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <!-- ЗАДНИЙ ПЛАН: Осенние кленовые листья -->
    <g stroke="#d47a13" stroke-width="0.5">
        <!-- Левый оранжевый лист -->
        <path d="M 32 45 L 22 40 L 25 32 L 15 35 L 18 23 L 26 25 L 25 15 L 35 22 L 40 14 L 46 25 L 52 20 L 48 35 L 55 42 Z" fill="#ff7700" opacity="0.9" />
        <!-- Верхний желтый лист -->
        <path d="M 52 35 L 48 20 L 54 14 L 62 6 L 68 15 L 75 10 L 78 22 L 88 18 L 84 30 L 92 35 L 82 42 L 80 52 L 68 45 Z" fill="#ffcc00" opacity="0.9" transform="rotate(-20 50 30)" />
        <!-- Нижний светлый лист -->
        <path d="M 25 60 L 12 62 L 10 52 L 2 50 L 5 38 L 15 42 L 18 32 L 28 38 L 35 32 L 38 45 L 48 42 L 42 55 L 48 65 Z" fill="#ffe066" opacity="0.8" />
    </g>

    <!-- ПЕРЕДНИЙ ПЛАН: Колокольчик с наклоном и бант -->
    <g transform="rotate(-25 50 55)">
        <!-- Деревянная ручка -->
        <path d="M50 35 L50 5 C50 2, 45 2, 45 5 L42 35 Z" fill="#603813" stroke="#3d220a" stroke-width="1.5"/>
        <circle cx="46" cy="5" r="3" fill="#d4a373"/>

        <!-- Золотой купол колокола -->
        <path d="M30 75 C30 45, 70 45, 70 75 L78 88 C78 91, 22 91, 22 88 Z" fill="url(#goldGrad)" stroke="#aa7c11" stroke-width="1.5"/>
        <!-- Объём ободка -->
        <ellipse cx="50" cy="88" rx="28" ry="4" fill="#b58916" opacity="0.5" />
        <!-- Язычок -->
        <circle cx="58" cy="92" r="5" fill="#8c6205"/>

        <!-- Пышный красный бант (левое крыло) -->
        <path d="M46 42 C20 25, 12 55, 45 46 Z" fill="url(#ribbonGrad)" stroke="#b30000" stroke-width="1"/>
        <!-- Пышный красный бант (правое крыло) -->
        <path d="M46 42 C72 25, 80 55, 47 46 Z" fill="url(#ribbonGrad)" stroke="#b30000" stroke-width="1"/>

        <!-- Центральный узел банта -->
        <circle cx="46" cy="44" r="5.5" fill="#cc0000" stroke="#990000" stroke-width="1"/>

        <!-- Ленты банта (свисающие вниз) -->
        <path d="M42 48 L28 72 L38 68 Z" fill="#e60000" stroke="#b30000" stroke-width="0.5"/>
        <path d="M50 48 L62 75 L54 68 Z" fill="#e60000" stroke="#b30000" stroke-width="0.5"/>
    </g>

    <!-- Градиенты для реалистичного объема (как на картинке) -->
    <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff3cc" />
            <stop offset="30%" stop-color="#ffd700" />
            <stop offset="70%" stop-color="#f1b514" />
            <stop offset="100%" stop-color="#8c6205" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ff4d4d" />
            <stop offset="50%" stop-color="#cc0000" />
            <stop offset="100%" stop-color="#800000" />
        </linearGradient>
    </defs>
</svg>
`;

const server = http.createServer((req, res) => {
    // ОТДЕЛЬНЫЙ МАРШРУТ ДЛЯ ИКОНКИ
    if (req.url === '/favicon.ico' || req.url === '/favicon.svg') {
        res.writeHead(200, {
            'Content-Type': 'image/svg+xml'
        });
        res.end(faviconSvg);
        return;
    }

    // ОСНОВНАЯ СТРАНИЦА
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Обратный отсчет</title>
            <!-- Ссылка на наш внутренний роут иконки -->
            <link rel="icon" type="image/svg+xml" href="/favicon.svg">
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    background-color: #f8f9fa;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                .title {
                    font-size: 72px;
                    font-weight: bold;
                    margin-bottom: 30px;
                    color: #212529;
                }
                .title-big-red {
                    font-size: 90px;
                    font-weight: bold;
                    margin-bottom: 30px;
                    color: #dc3545; /* Красивый красный цвет */
                }
                .timer-container {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }
                .timer-block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 110px; /* Фиксированная ширина центрирует текст внутри блока */
                }
                .numbers-part {
                    font-size: 72px;
                    font-weight: bold;
                    color: #212529;
                    line-height: 1;
                }
                .separator {
                    font-size: 72px;
                    font-weight: bold;
                    color: #212529;
                    line-height: 0.9; /* Приподнимает двоеточие чуть выше для ровности */
                    margin: 0 5px;
                }
                .labels-part {
                    font-size: 24px;
                    color: #495057;
                    margin-top: 15px;
                    text-align: center;
                    white-space: nowrap;
                }
            </style>
            <script>
                // Функция плюрализации (аналог plurals)
                function getPluralForm(number, one, two, many) {
                    let n = Math.abs(number);
                    n %= 100;
                    if (n >= 5 && n <= 20) return many;
                    n %= 10;
                    if (n === 1) return one;
                    if (n >= 2 && n <= 4) return two;
                    return many;
                }

                function updateTimer() {
                    const target = new Date("${targetDate.toISOString()}").getTime();
                    const now = new Date().getTime();
                    const diff = Math.max(0, target - now);

                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    const pad = (num) => String(num).padStart(2, '0');

                    // Записываем цифры в свои блоки по отдельности
                    document.getElementById('num-days').innerText = pad(days);
                    document.getElementById('num-hours').innerText = pad(hours);
                    document.getElementById('num-minutes').innerText = pad(minutes);
                    document.getElementById('num-seconds').innerText = pad(seconds);

                    // Плюрализация остается без изменений
                    document.getElementById('lbl-days').innerText = getPluralForm(days, 'день', 'дня', 'дней');
                    document.getElementById('lbl-hours').innerText = getPluralForm(hours, 'час', 'часа', 'часов');
                    document.getElementById('lbl-minutes').innerText = getPluralForm(minutes, 'минута', 'минуты', 'минут');
                    document.getElementById('lbl-seconds').innerText = getPluralForm(seconds, 'секунда', 'секунды', 'секунд');
                }
                setInterval(updateTimer, 1000);
            </script>
        </head>
        <body>
            <div class="title" style="color: #35dc45;">Катя и не только!</div>
			<div class="title-big-red">Скоро в школу!</div>
            <div class="timer-container">
                <!-- Дни -->
                <div class="timer-block">
                    <div id="num-days" class="numbers-part">00</div>
                    <div id="lbl-days" class="labels-part">дней</div>
                </div>

                <div class="separator">:</div>

                <!-- Часы -->
                <div class="timer-block">
                    <div id="num-hours" class="numbers-part">00</div>
                    <div id="lbl-hours" class="labels-part">часов</div>
                </div>

                <div class="separator">:</div>

                <!-- Минуты -->
                <div class="timer-block">
                    <div id="num-minutes" class="numbers-part">00</div>
                    <div id="lbl-minutes" class="labels-part">минут</div>
                </div>

                <div class="separator">:</div>

                <!-- Секунды -->
                <div class="timer-block">
                    <div id="num-seconds" class="numbers-part">00</div>
                    <div id="lbl-seconds" class="labels-part">секунд</div>
                </div>
            </div>
            <script>updateTimer();</script>
        </body>
        </html>
    `);

    res.end();
});

server.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
