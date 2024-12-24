const countdown = () => {
    const countDate = new Date('Jan 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = textDay;
    document.getElementById('hours').innerText = textHour;
    document.getElementById('minutes').innerText = textMinute;
    document.getElementById('seconds').innerText = textSecond;

    if (gap <= 0) {
        clearInterval(x);
        document.getElementById('timer').innerText = "Happy New Year!";
        document.getElementById('fireworksSound').play();
        startFireworks();
    }
};

const startFireworks = () => {
    const container = document.getElementById('fireworks');
    const fireworks = new Fireworks(container);
    fireworks.start();
};

let x = setInterval(countdown, 1000);
