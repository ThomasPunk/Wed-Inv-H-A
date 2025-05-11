// Fade-in scroll effect
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
    entry.target.classList.toggle('show',entry.isIntersecting);

});
}, {
threshold: 0.2
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
document.getElementById('thankYouMsg').classList.add('peek');
document.getElementById('weddingForm').reset(); // Kosongkan form setelah submit
}, 300);
setTimeout(() => {
document.getElementById('thankYouMsg').classList.remove('peek');
}, 3500);
  return true; // Tetap kirim form ke Google Form
}

// Ambil data dari Google Sheets
fetch('https://script.google.com/macros/s/AKfycbwU-8A9KtDovvMMTyzNOAa4LaTmmGDfdDfr_hKdepGt4wCIBm9KxwhQ-bFf3AKQxLfG/exec')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('data-container');
    let attended = 0;
    let  notAttended= 0;
    for (let i = 0; i < data.length; i += 4) {
      const block = document.createElement('div');
      block.className = 'data-block';
      

      // Ambil timestamp dan konversi
      const timestamp = new Date(data[i + 2]);
      const now = new Date();
      const diffMs = now - timestamp;

      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHr / 24);

      const sisaJam = diffHr % 24;
      const sisaMenit = diffMin % 60;

      let waktuKalimat = "";
      if (diffDay > 0) waktuKalimat += `${diffDay} hari `;
      if (sisaJam > 0) waktuKalimat += `${sisaJam} jam `;
      if (diffDay === 0 && sisaJam === 0) waktuKalimat += `${sisaMenit} menit `;
      waktuKalimat += "lalu";

      //menghitung kehadiran
      const absent = data[i + 3];
      if (typeof absent === 'string' && absent.toLowerCase().includes('ya')) {
        attended++;
      }else if (typeof absent === 'string' && absent.toLowerCase().includes('tidak')) {
        notAttended++;
      }
      document.getElementById('spanAttended').textContent = attended;
      document.getElementById('spanNotAttended').textContent = notAttended;
      //membuat elemen HTML untuk menampilkan data
      block.innerHTML = `
        <p>${data[i]}</p>
        <p>${data[i + 1]}</p>
        <p>${waktuKalimat}</p>
      `;

      container.appendChild(block);

      console.log("Jumlah yang hadir: " + attended);
      console.log("Jumlah yang tidak hadir: " + notAttended);
      console.log("data 3 :" + absent )
      
    }
  })
  .catch(error => console.error('Error:', error));
  

;

// Untuk pengaturan Copy Nomor rekening
function copyRekening(text) {
  navigator.clipboard.writeText(text).then(() => {
    const notif = document.getElementById('notif');
    notif.style.display = 'inline';
    setTimeout(() => notif.style.display = 'none', 1500);
  });
}

// untuk pengaturan display hadiah
let display = 1;
function displayHadiah() {
  const weddingGift = document.getElementById('weddingGift');
  const atmCard = document.getElementById('atmCard');
  const hadiah = document.getElementById('hadiah');
  if (display > 0) {
    display= -1;
    weddingGift.classList.add("display");
    atmCard.classList.add("display");
    hadiah.classList.add("display");
  } else {
    display = 1;
    weddingGift.classList.remove("display");
    atmCard.classList.remove("display");
    hadiah.classList.remove("display");
  }
}

//buat class untuk click openpage()
const openingPage = document.getElementById('openingPage');
const container = document.getElementById('container');
const audio = document.getElementById("soundTrack");
const pausePlay = document.getElementById("pausePlay");
const openBtn = document.getElementById('openBtn');
const openBtnText = document.getElementById('openBtnText');

audio.addEventListener('canplaythrough', () => {
    openBtn.style.pointerEvents = 'auto';  // aktifkan klik
    openBtn.style.opacity = '1';           // tampilkan penuh
    openBtnText.textContent = 'Buka Undangan'; // ganti tulisan
  });

function openPage(){
  openingPage.classList.add('hidden');
  container.classList.remove('hidden');  
  
    audio.play();
    pausePlay.classList.toggle('played')

  let elem = document.documentElement; // atau bisa juga elemen spesifik seperti document.getElementById('container')
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }

} 

//Pengaturan Show Gallery
  const galleryClick = document.querySelector('.galleryClick');
  const blur = document.querySelector('.blur');

  function gallery() {
   
      galleryClick.classList.toggle('active');
      blur.classList.toggle('active');
  
  }  


  //Pengaturan Unutk Play Pause
function playPause(){
  if (audio.paused) {
  audio.play();
  } else {
  audio.pause();
  }
  pausePlay.classList.toggle('paused')
  pausePlay.classList.toggle('played')
}

//Pengaturan untuk Validasi Form hanya submit jika sudah terisi semua baris
  const form = document.getElementById('weddingForm');
  const nameInput = form.querySelector('input[name="entry.206889230"]');
  const radios = form.querySelectorAll('input[name="entry.1617194257"]');
  const messageInput = form.querySelector('textarea[name="entry.219318329"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  function isRadioChecked() {
    return Array.from(radios).some(radio => radio.checked);
  }

  function validateForm() {
    if (nameInput.value.trim() && isRadioChecked() && messageInput.value.trim()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Event listeners
  nameInput.addEventListener('input', validateForm);
  messageInput.addEventListener('input', validateForm);
  radios.forEach(radio => radio.addEventListener('change', validateForm));

  // Disable tombol di awal
  window.addEventListener('DOMContentLoaded', () => {
    submitBtn.disabled = true;
  });

