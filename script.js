let countdownInterval;

const getYearFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year');
    return year ? parseInt(year, 10) : new Date().getFullYear() + 1;
};

const getMusicFromUrl = () => {
    const defaultMusicUrl = 'https://open.spotify.com/embed/playlist/5xAAZCzx1MEAGsaf2hWbXD?utm_source=generator&theme=0';
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('music') || defaultMusicUrl;
};

const updateHeading = (year) => {
    const headingElement = document.getElementById('countdownHeading');
    headingElement.innerText = `Countdown to New Year ${year}`;
};

const updateSpotifyPlayer = (musicUrl) => {
    const spotifyPlayer = document.getElementById('spotifyPlayer');
    spotifyPlayer.src = musicUrl;
};

const updateCountdownDisplay = (textDay, textHour, textMinute, textSecond) => {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const daysLabel = document.getElementById('days-label');
    const hoursLabel = document.getElementById('hours-label');
    const minutesLabel = document.getElementById('minutes-label');
    const secondsLabel = document.getElementById('seconds-label');

    if (textDay > 0) {
        daysElement.innerText = textDay;
        daysElement.style.display = 'inline';
        daysLabel.style.display = 'inline';
    } else {
        daysElement.style.display = 'none';
        daysLabel.style.display = 'none';
    }

    if (textHour > 0 || textDay > 0) {
        hoursElement.innerText = textHour;
        hoursElement.style.display = 'inline';
        hoursLabel.style.display = 'inline';
    } else {
        hoursElement.style.display = 'none';
        hoursLabel.style.display = 'none';
    }

    if (textMinute > 0 || textHour > 0 || textDay > 0) {
        minutesElement.innerText = textMinute;
        minutesElement.style.display = 'inline';
        minutesLabel.style.display = 'inline';
    } else {
        minutesElement.style.display = 'none';
        minutesLabel.style.display = 'none';
    }

    secondsElement.innerText = textSecond;

    if (textDay === 0 && textHour === 0 && textMinute === 0) {
        secondsLabel.style.display = 'none';
    } else {
        secondsLabel.style.display = 'inline';
    }
};

const countdown = () => {
    const year = getYearFromUrl();
    updateHeading(year);
    const countDate = new Date(`Jan 1, ${year} 00:00:00`).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const totalSeconds = Math.floor(gap / 1000);

    if (totalSeconds <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').innerText = "Happy New Year!";
        document.getElementById('countdownHeading').innerText = "";
        startFireworks();
        return;
    }

    const second = 1;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(totalSeconds / day);
    const textHour = Math.floor((totalSeconds % day) / hour);
    const textMinute = Math.floor((totalSeconds % hour) / minute);
    const textSecond = Math.floor((totalSeconds % minute) / second);

    updateCountdownDisplay(textDay, textHour, textMinute, textSecond);
};

const startFireworks = () => {
    const container = document.getElementById('fireworks');
    const fireworks = new Fireworks.default(container); // Use Fireworks.default if using ES module
    const fireworksSound = document.getElementById('fireworksSound');
    fireworksSound.loop = true; // Ensure the sound loops
    fireworksSound.play();
    fireworks.start();
};

const startCountdown = () => {
    document.getElementById('countdownContainer').classList.remove('hidden');
    countdown();
    countdownInterval = setInterval(countdown, 1000);
};

const celebrateNow = () => {
    clearInterval(countdownInterval);
    document.getElementById('timer').innerText = "Happy New Year!";
    document.getElementById('countdownHeading').innerText = "";
    document.getElementById('disclaimerMessage').style.display = 'none';
    document.getElementById('startButton').remove();
    document.getElementById('celebrateNowButton').remove();
    startFireworks();
};

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('celebrateNowButton').classList.add('hidden');
    document.getElementById('disclaimerMessage').style.display = 'none';
    startCountdown();
});

document.getElementById('celebrateNowButton').addEventListener('click', celebrateNow);

// Set the Spotify player source dynamically
const musicUrl = getMusicFromUrl();
updateSpotifyPlayer(musicUrl);