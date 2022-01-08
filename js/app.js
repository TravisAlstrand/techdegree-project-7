const alertBanner = document.getElementById("alert");

alertBanner.innerHTML = `
    <div class="alert-banner">
        <p><strong>Alert:</strong> You have unread messages.</p>
        <p class="alert-banner-close">x</p>
    </div>
`;

addEventListener.alertBanner('click', e => {
    const element = e.target;
    if (element.ClassList.contains('alert-banner-close')) {
        alertBanner.style.display = 'none';
    }
});