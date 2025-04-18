// Fade-in scroll effect
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
    entry.target.classList.toggle('show',entry.isIntersecting);

});
}, {
threshold: 0.05
});

fadeInElements.forEach(fadeInElement => {
observer.observe(fadeInElement);
});


window.addEventListener('DOMContentLoaded', () => {
    console.log("Lebar viewport: " + window.innerWidth + "px");
    console.log("Tinggi viewport: " + window.innerHeight + "px");
  });
  
  window.addEventListener('resize', () => {
    console.log("Ukuran berubah:");
    console.log("Lebar viewport: " + window.innerWidth + "px");
    console.log("Tinggi viewport: " + window.innerHeight + "px");
  });
  
// Countdown Timer
const targetDate = new Date("2025-05-25T10:00:00").getTime();

const countdown = setInterval(() => {
const now = new Date().getTime();
const distance = targetDate - now;

if (distance <= 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "<p>Acara telah dimulai!</p>";
    return;
}

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("days").textContent = days;
document.getElementById("hours").textContent = hours;
document.getElementById("minutes").textContent = minutes;
document.getElementById("seconds").textContent = seconds;
}, 1000);

// Ambil parameter dari URL
const params = new URLSearchParams(window.location.search);
const nama = params.get("nama");

// Jika ada nilai, tampilkan di halaman
if (nama) {
document.getElementById("nama").textContent = nama;
} else {
document.getElementById("nama").textContent = "Guest";
}

// Fungsi untuk menampilkan pesan terima kasih
// setelah form dikirim
function showThankYouMessage() {
// Tunggu sedikit supaya Google Forms menerima submit dulu
setTimeout(() => {
document.getElementById('thankYouMsg').textContent = "Terima kasih atas kehadiran dan ucapannya!";
document.getElementById('weddingForm').reset(); // Kosongkan form setelah submit
}, 300);

return true; // Tetap kirim form ke Google Form
}

// Ambil data dari Google Sheets
fetch('https://script.google.com/macros/s/AKfycbwU-8A9KtDovvMMTyzNOAa4LaTmmGDfdDfr_hKdepGt4wCIBm9KxwhQ-bFf3AKQxLfG/exec') //URL dapat dati App Sript Google
.then(response => response.json())
.then(data => {
const container = document.getElementById('data-container');
for (let i = 0; i < data.length; i += 3) {
    const block = document.createElement('div');
    block.className = 'data-block';

    block.innerHTML = `
    <p>${data[i]}</p>
    <p>${data[i+1]}</p>
    <p>${data[i+2]}</p>
    `;

    container.appendChild(block);
}
})
.catch(error => console.error('Error:', error));