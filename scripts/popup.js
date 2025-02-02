function showPopup(event) {
    event.preventDefault();
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('emailPopup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('emailPopup').style.display = 'none';
}

function copyEmail() {
    const emailText = document.getElementById('emailText');
    emailText.select();
    document.execCommand('copy');
    const copyButton = document.getElementById('copyButton');
    copyButton.textContent = '✔';
    setTimeout(() => {
        copyButton.textContent = '📋';
    }, 3000);
}