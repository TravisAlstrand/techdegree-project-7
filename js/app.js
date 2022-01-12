const alertBanner = document.getElementById("alert");
const notifBtn = document.getElementById("notif-btn");
const notifDot = document.getElementById("notif-dot");

const trafficNav = document.getElementById("traffic");

const trafficNavBtns = document.getElementsByClassName("traffic-nav-btn");

const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");

const user = document.getElementById("user-field");
const message = document.getElementById("message-field");
const send = document.getElementById("send");

// NOTIFICATION ICON

notifBtn.addEventListener('click', (e) => {
    notifDot.setAttribute('visibility', "hidden");
});

// ALERT BANNER

alertBanner.innerHTML = `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have unread messages.</p>
        <p class="alert-banner-close">x</p>
    </div>
`;

alertBanner.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = 'none';
    }
});

// LINE CHART NAV

trafficNav.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains("traffic-nav-btn")) {
        element.classList.add("active");
    }
});

// LINE CHART

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
            2500],
        backgroundColor: 'rgba(139, 152, 214, .3)',
        borderWidth: 1,
        cubicInterpolationMode: 'monotone',
        pointHoverBackgroundColor: 'rgb(111, 199, 135)',
        pointHoverRadius: 7
    }]
};

let trafficOptions = {
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});

// BAR CHART

let dailyData = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [{
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: 'rgb(139, 152, 214)',
        borderWidth: 1
    }]
};

let dailyOptions = {
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let barChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

// DONUT CHART

let mobileData = {
    labels: ["Desktop", "Tablets", "Phones"],
    datasets: [{
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            'rgb(139, 152, 214)',
            'rgb(111, 199, 135)',
            'rgb(61, 203, 235)'
        ]
    }]
};

let mobileOptions = {
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 30,
                fontStyle: 'bold'
            }
        }
    }
};

let doughnutChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

// MESSAGE USER FORM FIELD

send.addEventListener('click', () => {
    if (user.value === "" && message.value === "")
    {
        alert("Please fill out user and message fields before sending");
    } else if (user.value === "")
    {
        alert("Please fill out user field before sending");
    } else if (message.value === "")
    {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully send to: ${user.value}`);
    }
});