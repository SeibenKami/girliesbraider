// ===== DATA =====
const hairstyles = [
  { id: 1, name: 'Stitch Cornrow', price: '200 - 350', duration: '4-5 hours', desc: 'Neat and precise stitch-in cornrows for a sharp, defined look.', img: 'public/b2.jpg' },
  { id: 2, name: 'Patewo Braids', price: '200', duration: '2-3 hours', desc: 'A traditional and stylish "clap" style braiding pattern.', img: 'public/b1.jpg' },
  { id: 3, name: 'Cornrow Pony', price: '200 - 400', duration: '4-6 hours', desc: 'Cornrows gathered into a sleek and elegant high or low ponytail.', img: 'public/b2.jpg' },
  { id: 4, name: 'Fulani Braids (No Curls)', price: '250 - 400', duration: '3-5 hours', desc: 'Classic Fulani pattern with intricate designs and no curly additions.', img: 'public/b1.jpg' },
  { id: 5, name: 'Fulani Braids (With Curls)', price: '300 - 470', duration: '4-6 hours', desc: 'Beautiful Fulani braids enhanced with soft, bouncy curls.', img: 'public/b1.jpg' },
  { id: 6, name: 'Knotless Braids', price: '250 - 400', duration: '4-5 hours', desc: 'Lightweight, seamless braids that start naturally from the root.', img: 'public/b3.jpg' },
  { id: 7, name: 'Knotless Boho', price: '300 - 500', duration: '5-7 hours', desc: 'Knotless braids with curly strands for a bohemian, messy-chic look.', img: 'public/b3.jpg' },
  { id: 8, name: 'French/Italian Curls Boho', price: '400 - 650', duration: '5-7 hours', desc: 'High-end bohemian style using premium French or Italian curly extensions.', img: 'public/b3.jpg' },
  { id: 9, name: 'Fulani French Curls', price: '400 - 500', duration: '5-7 hours', desc: 'The elegance of Fulani braids meeting the luxury of French curls.', img: 'public/b1.jpg' },
  { id: 10, name: 'Soft Locs', price: '300 - 450', duration: '4-6 hours', desc: 'Flexible and natural-looking faux locs for a soft, textured finish.', img: 'public/b3.jpg' },
  { id: 11, name: 'Marley Twist', price: '350 - 450', duration: '3-4 hours', desc: 'Fluffy, textured two-strand twists using Marley hair.', img: 'public/b3.jpg' },
  { id: 12, name: 'Borabora Braids', price: '480 - 550', duration: '4-5 hours', desc: 'Full, voluminous braids with a signature tropical, curly aesthetic.', img: 'public/b3.jpg' },
  { id: 13, name: 'Passion Twist', price: '400 - 550', duration: '4-6 hours', desc: 'Two-strand twists with a unique, crinkly texture for a romantic look.', img: 'public/b3.jpg' },
  { id: 14, name: 'Butterfly Locs', price: '350 - 600', duration: '5-7 hours', desc: 'Distressed locs with a beautiful, looped, "butterfly" effect.', img: 'public/b4.jpg' },
  { id: 15, name: 'Sew Ins', price: '200', duration: '3-4 hours', desc: 'Traditional sew-in installation. NB: Extensions are exclusive for this service.', img: 'public/b4.jpg' },
  { id: 16, name: 'Ponytail', price: '80 - 150', duration: '1-2 hours', desc: 'Classic sleek ponytail styled to perfection.', img: 'public/main.jpg' },
  { id: 17, name: 'Half Up Half Down', price: '150', duration: '2-3 hours', desc: 'A versatile style that is half braided/styled and half loose.', img: 'public/main.jpg' },
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

// ===== STATE =====
let selectedStyle = null;

// ===== RENDER STYLES =====
function renderStyles() {
  const grid = document.getElementById('stylesGrid');
  grid.innerHTML = hairstyles.map(function (style, i) {
    var isSelected = selectedStyle && selectedStyle.id === style.id;
    return '<div class="style-card ' + (isSelected ? 'selected' : '') + '"' +
      ' onclick="selectStyle(' + style.id + ')">' +
      '<div class="style-card-image" style="background: ' + gradients[i % gradients.length] + '">' +
        '<img src="' + style.img + '" alt="' + style.name + '" class="style-card-img">' +
      '</div>' +
      '<div class="style-card-body">' +
        '<h3>' + style.name + '</h3>' +
        '<div class="style-price">GH\u20B5 ' + style.price + '</div>' +
        '<div class="style-duration">' + style.duration + '</div>' +
        '<div class="style-desc">' + style.desc + '</div>' +
        (isSelected ? '<button class="btn-card-continue" onclick="event.stopPropagation(); goToStep(2)">Continue \u2192</button>' : '') +
      '</div>' +
    '</div>';
  }).join('');
}

function selectStyle(id) {
  selectedStyle = hairstyles.find(function (s) { return s.id === id; });
  renderStyles();
}

// ===== PHONE VALIDATION =====
function isValidGhanaPhone(phone) {
  var cleaned = phone.replace(/[\s\-]/g, '');
  return /^(?:\+?233|0)[2-9]\d{8}$/.test(cleaned);
}

function validateDetails() {
  var name = document.getElementById('customerName').value.trim();
  var phone = document.getElementById('customerPhone').value.trim();
  var phoneError = document.getElementById('phoneError');
  var phoneValid = false;

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

  document.getElementById('btnToStep3').disabled = !(name && phoneValid);
}

// ===== NAVIGATION =====
function goToStep(step) {
  // Hide all panels
  document.querySelectorAll('.step-panel').forEach(function (p) { p.classList.remove('active'); });
  document.getElementById('step-' + step).classList.add('active');

  // Update step indicators (only 1-3 are visible)
  for (var i = 1; i <= 3; i++) {
    var indicator = document.getElementById('step-indicator-' + i);
    indicator.classList.remove('active', 'completed');
    if (i < step) indicator.classList.add('completed');
    if (i === step) indicator.classList.add('active');
  }

  // Update connectors
  for (var j = 1; j <= 2; j++) {
    var connector = document.getElementById('connector-' + j);
    connector.classList.toggle('completed', j < step);
  }

  // If entering step 3, load Cal.com embed with prefilled details and save progress
  if (step === 3) {
    saveBookingState();
    loadCalEmbed();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== STATE PERSISTENCE =====
function saveBookingState() {
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const bookingData = {
    name: name,
    phone: phone,
    style: selectedStyle ? selectedStyle.name : '',
    price: selectedStyle ? selectedStyle.price : 0,
    duration: selectedStyle ? selectedStyle.duration : '',
    bookingRef: 'TGB-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('girliesBraiderBooking', JSON.stringify(bookingData));
}

// ===== CAL.COM EMBED =====
function loadCalEmbed() {
  var name = document.getElementById('customerName').value.trim();
  var phone = document.getElementById('customerPhone').value.trim();
  var styleName = selectedStyle ? selectedStyle.name : '';
  var notesText = "Style: " + styleName + "\nPhone: " + phone;
  var isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile: update the popup trigger button with prefilled data
    var btn = document.getElementById('calMobileBtn');
    btn.setAttribute('data-cal-config', JSON.stringify({
      layout: "column_view",
      name: name,
      notes: notesText,
    }));
  } else {
    // Desktop: render inline embed
    document.getElementById('my-cal-inline').innerHTML = '';
    Cal("inline", {
      calLink: "frank-adu-zt1m3p",
      elementOrSelector: "#my-cal-inline",
      config: {
        layout: "month_view",
        name: name,
        notes: notesText,
      },
    });
  }
}

// ===== CONFIRMATION =====
function showConfirmation(eventData) {
  // Update local storage with date/time if available from Cal.com
  const bookingData = JSON.parse(localStorage.getItem('girliesBraiderBooking') || '{}');
  
  if (eventData && eventData.data) {
    const startTime = new Date(eventData.data.startTime);
    bookingData.date = startTime.toLocaleDateString('en-GB', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    bookingData.time = startTime.toLocaleTimeString('en-GB', { 
      hour: '2-digit', minute: '2-digit' 
    });
  } else {
    bookingData.date = 'Scheduled';
    bookingData.time = 'Confirmed';
  }
  
  localStorage.setItem('girliesBraiderBooking', JSON.stringify(bookingData));

  // Redirect to the standalone confirmation page
  window.location.href = 'confirmation.html';
}

// ===== INIT =====
renderStyles();
