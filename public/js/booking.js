// ===== DATA =====
const hairstyles = [
  { id: 1, name: 'Box Braids', price: 250, duration: '3-4 hours', desc: 'Classic individual braids, perfect for any length. A timeless protective style.', img: 'public/main.jpg' },
  { id: 2, name: 'Knotless Braids', price: 350, duration: '4-5 hours', desc: 'Lightweight, no-knot braids that are gentle on your edges.', img: 'public/b3.jpg' },
  { id: 3, name: 'Cornrows', price: 150, duration: '1-2 hours', desc: 'Neat, flat braids close to the scalp. Simple and elegant.', img: 'public/b2.jpg' },
  { id: 4, name: 'Goddess Locs', price: 400, duration: '5-6 hours', desc: 'Bohemian faux locs with curly accents for a free-spirited look.', img: 'public/b3.jpg' },
  { id: 5, name: 'Fulani Braids', price: 300, duration: '3-4 hours', desc: 'Traditional patterned braids with a centre parting and side designs.', img: 'public/b1.jpg' },
  { id: 6, name: 'Passion Twists', price: 280, duration: '3-4 hours', desc: 'Soft, romantic two-strand twists with a natural textured finish.', img: 'public/b3.jpg' },
  { id: 7, name: 'Feed-in Braids', price: 200, duration: '2-3 hours', desc: 'Sleek braids that start thin and gradually thicken. Great for updos.', img: 'public/b1.jpg' },
  { id: 8, name: 'Twist Braids', price: 220, duration: '2-3 hours', desc: 'Classic two-strand twists for a clean and versatile protective style.', img: 'public/b3.jpg' },
  { id: 9, name: 'Lemonade Braids', price: 280, duration: '3-4 hours', desc: 'Side-swept cornrows inspired by Beyoncé. Bold and iconic.', img: 'public/b2.jpg' },
  { id: 10, name: 'Butterfly Locs', price: 350, duration: '4-5 hours', desc: 'Distressed faux locs with a looped, bohemian texture.', img: 'public/b4.jpg' },
  { id: 11, name: 'Tribal Braids', price: 320, duration: '3-4 hours', desc: 'Bold braids with intricate patterns and creative partings.', img: 'public/b2.jpg' },
  { id: 12, name: 'Crochet Braids', price: 180, duration: '1-2 hours', desc: 'Quick-install braids using the crochet method. Many textures available.', img: 'public/b4.jpg' },
];

const gradients = [
  'linear-gradient(135deg, #f0e0d0, #e8c4b0)',
  'linear-gradient(135deg, #d4a59a, #c4956a)',
  'linear-gradient(135deg, #c4956a, #a87a52)',
  'linear-gradient(135deg, #e8c4b0, #d4a59a)',
  'linear-gradient(135deg, #dcc5b5, #c9a68e)',
  'linear-gradient(135deg, #d4a59a, #b88a7e)',
  'linear-gradient(135deg, #c9a68e, #a87a52)',
  'linear-gradient(135deg, #f0e0d0, #d4a59a)',
  'linear-gradient(135deg, #e0c4b0, #c4956a)',
  'linear-gradient(135deg, #d4a59a, #c4956a)',
  'linear-gradient(135deg, #c9a68e, #b88a7e)',
  'linear-gradient(135deg, #f0e0d0, #dcc5b5)',
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

// ===== STATE =====
let selectedStyle = null;
let selectedDate = null;
let selectedTime = null;
let selectedDateDisplay = '';

// ===== RENDER STYLES =====
function renderStyles() {
  const grid = document.getElementById('stylesGrid');
  grid.innerHTML = hairstyles.map((style, i) => `
    <div class="style-card ${selectedStyle && selectedStyle.id === style.id ? 'selected' : ''}"
         onclick="selectStyle(${style.id})">
      <div class="style-card-image" style="background: ${gradients[i % gradients.length]}">
        <img src="${style.img}" alt="${style.name}" class="style-card-img">
      </div>
      <div class="style-card-body">
        <h3>${style.name}</h3>
        <div class="style-price">GH₵ ${style.price}</div>
        <div class="style-duration">${style.duration}</div>
        <div class="style-desc">${style.desc}</div>
        ${selectedStyle && selectedStyle.id === style.id ? `<button class="btn-card-continue" onclick="event.stopPropagation(); goToStep(2)">Continue →</button>` : ''}
      </div>
    </div>
  `).join('');
}

function selectStyle(id) {
  selectedStyle = hairstyles.find(s => s.id === id);
  renderStyles();
  document.getElementById('btnToStep2').disabled = false;
}

// ===== RENDER DATES =====
function renderDates() {
  const grid = document.getElementById('dateGrid');
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Skip Sundays
    if (d.getDay() === 0) continue;
    dates.push(d);
  }

  grid.innerHTML = dates.slice(0, 10).map(d => {
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const key = d.toISOString().split('T')[0];
    return `
      <div class="date-slot ${selectedDate === key ? 'selected' : ''}"
           onclick="selectDate('${key}', '${dayName}, ${dateStr}')">
        <div class="date-day">${dayName}</div>
        <div class="date-date">${dateStr}</div>
      </div>
    `;
  }).join('');
}

function selectDate(key, display) {
  selectedDate = key;
  selectedDateDisplay = display;
  renderDates();
  checkStep2();
}

// ===== RENDER TIMES =====
function renderTimes() {
  const grid = document.getElementById('timeGrid');
  grid.innerHTML = timeSlots.map(t => `
    <div class="time-slot ${selectedTime === t ? 'selected' : ''}"
         onclick="selectTime('${t}')">
      ${t}
    </div>
  `).join('');
}

function selectTime(t) {
  selectedTime = t;
  renderTimes();
  checkStep2();
}

function checkStep2() {
  document.getElementById('btnToStep3').disabled = !(selectedDate && selectedTime);
}

// ===== NAVIGATION =====
function goToStep(step) {
  // Hide all panels
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');

  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    indicator.classList.remove('active', 'completed');
    if (i < step) indicator.classList.add('completed');
    if (i === step) indicator.classList.add('active');
  }

  // Update connectors
  for (let i = 1; i <= 2; i++) {
    const connector = document.getElementById(`connector-${i}`);
    connector.classList.toggle('completed', i < step);
  }

  // If going to step 2, render dates and times
  if (step === 2) {
    renderDates();
    renderTimes();
  }

  // If going to step 3, update summary
  if (step === 3) {
    updateSummary();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSummary() {
  if (selectedStyle) {
    document.getElementById('summaryStyle').textContent = selectedStyle.name;
    document.getElementById('summaryDuration').textContent = selectedStyle.duration;
    document.getElementById('summaryTotal').textContent = `GH₵ ${selectedStyle.price}`;
  }
  if (selectedDateDisplay) {
    document.getElementById('summaryDate').textContent = selectedDateDisplay;
  }
  if (selectedTime) {
    document.getElementById('summaryTime').textContent = selectedTime;
  }
}

// ===== PHONE VALIDATION =====
function isValidGhanaPhone(phone) {
  const cleaned = phone.replace(/[\s\-]/g, '');
  return /^(?:\+?233|0)[2-9]\d{8}$/.test(cleaned);
}

function validateDetails() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const phoneError = document.getElementById('phoneError');

  let phoneValid = false;

  if (!phone) {
    phoneError.textContent = '';
    phoneError.style.display = 'none';
  } else if (!isValidGhanaPhone(phone)) {
    phoneError.textContent = 'Enter a valid Ghana phone number (e.g. 024 123 4567 or +233241234567)';
    phoneError.style.display = 'block';
  } else {
    phoneError.textContent = '';
    phoneError.style.display = 'none';
    phoneValid = true;
  }

  document.getElementById('btnConfirm').disabled = !(name && phoneValid);
}

// ===== CONFIRM BOOKING =====
function confirmBooking() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const notes = document.getElementById('customerNotes').value.trim();

  // Store booking data for confirmation page
  const booking = {
    style: selectedStyle.name,
    price: selectedStyle.price,
    duration: selectedStyle.duration,
    date: selectedDateDisplay,
    time: selectedTime,
    name: name,
    phone: phone,
    notes: notes,
    bookingRef: 'TGB-' + Date.now().toString(36).toUpperCase(),
  };

  localStorage.setItem('girliesBraiderBooking', JSON.stringify(booking));
  window.location.href = 'confirmation.html';
}

// ===== INIT =====
renderStyles();
