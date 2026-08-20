const http = require('http');

// Укажите целевую дату
const targetDate = new Date('2026-09-01T08:00:00+03:00');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Обратный отсчет</title>
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
