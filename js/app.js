const alertBanner = document.getElementById("alert");
const notifBtn = document.getElementById("notif-btn");
const notifBell = document.getElementById("bell-icon");
const notifDot = document.getElementById("notif-dot");
const notifMenu = document.getElementById("notifications");

const trafficNav = document.getElementById("traffic");
const trafficNavBtns = document.getElementsByClassName("traffic-nav-btn");

const trafficHourlyBtn = document.getElementById("hourly");
const trafficDailyBtn = document.getElementById("daily");
const trafficWeeklyBtn = document.getElementById("weekly");
const trafficMonthlyBtn = document.getElementById("monthly");

const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-chart");

const user = document.getElementById("user-field");
const message = document.getElementById("message-field");
const send = document.getElementById("send");

let notifsOpen = false;

// NOTIFICATION ICON / MENU

notifBtn.addEventListener('click', (e) => {
    notifDot.setAttribute('visibility', "hidden");

    if (notifsOpen === false) {
        openNotifsMenu();
    } else {
        closeNotifsMenu();
    }
});

function openNotifsMenu() {
    notifMenu.style.display = "initial";
    notifBell.classList.add("notif-active");
    notifsOpen = true;
}

function closeNotifsMenu() {
    notifMenu.style.display = "none";
    notifBell.classList.remove("notif-active");
    notifsOpen = false;
}

// ALERT BANNER

alertBanner.innerHTML = `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have new notifications!</p>
        <p class="alert-banner-close">x</p>
    </div>
`;

alertBanner.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = 'none';
    }
});

// ------------------------------------------------------------------------- //

// LINE CHART


// LINE CHART HOURLY DATA
const trafficDataHourly =
    [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500];

// LINE CHART DAILY DATA
const trafficDataDaily = 
    [450, 250, 1200, 2250, 500, 1450, 1300, 2150, 700, 500, 2000];

// LINE CHART WEEKLY DATA
const trafficDataWeekly = 
    [1750, 250, 1200, 2500, 1100, 750, 1550, 150, 2450, 950, 650];

// LINE CHART MONTHLY DATA
const trafficDataMonthly = 
    [950, 1550, 1000, 2350, 700, 350, 1850, 1150, 2000, 1200, 950];

// LINE CHART OPTIONS

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

//  INITIAL LINE CHART SET

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: {
        labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
            "4-10", "11-17", "18-24", "25-31"],
        datasets: [{
            data: trafficDataHourly,
            backgroundColor: 'rgba(139, 152, 214, .3)',
            borderWidth: 1,
            cubicInterpolationMode: 'monotone',
            pointHoverBackgroundColor: 'rgb(111, 199, 135)',
            pointHoverRadius: 7
            }]
        },
    options: trafficOptions
});

// ------------------------------------------------------------------------- //

// CHANGING LINE CHART DATA

function updateChart(chart, newData) {
    chart.data.datasets[0].data.pop();
    chart.update();
    chart.data.datasets[0].data.push(newData);
    chart.update();
    console.log(chart.data.datasets[0].data);
};

// ------------------------------------------------------------------------- //

// TRAFFIC NAV BUTTONS

trafficNav.addEventListener('click', (e) => {
    const element = e.target;

    for (i = 0; i < trafficNavBtns.length; i++) {
        trafficNavBtns[i].classList.remove('active');
    }

    element.classList.add("active");

    if (element.innerHTML === 'Hourly') {
        updateChart(trafficChart, trafficDataHourly);
    } else if (element.innerHTML === 'Daily') {
        updateChart(trafficChart, trafficDataDaily);
    } else if (element.innerHTML === 'Weekly') {
        updateChart(trafficChart, trafficDataWeekly);
    } else if (element.innerHTML === 'Monthly') {
        updateChart(trafficChart, trafficDataMonthly);
    }
});

// ------------------------------------------------------------------------- //

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

// DOUGHNUT CHART

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

send.addEventListener('click', (event) => {
    event.preventDefault();
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