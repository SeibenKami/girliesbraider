// ===== DATA =====
const hairstyles = [
  { id: 1, name: 'Box Braids', price: '250 - 350', duration: '3-4 hours', desc: 'Classic individual braids, perfect for any length. A timeless protective style.', img: 'public/main.jpg' },
  { id: 2, name: 'Knotless Braids', price: '350 - 450', duration: '4-5 hours', desc: 'Lightweight, no-knot braids that are gentle on your edges.', img: 'public/b3.jpg' },
  { id: 3, name: 'Cornrows', price: '150 - 250', duration: '1-2 hours', desc: 'Neat, flat braids close to the scalp. Simple and elegant.', img: 'public/b2.jpg' },
  { id: 4, name: 'Goddess Locs', price: '400 - 550', duration: '5-6 hours', desc: 'Bohemian faux locs with curly accents for a free-spirited look.', img: 'public/b3.jpg' },
  { id: 5, name: 'Fulani Braids', price: '300 - 400', duration: '3-4 hours', desc: 'Traditional patterned braids with a centre parting and side designs.', img: 'public/b1.jpg' },
  { id: 6, name: 'Passion Twists', price: '280 - 380', duration: '3-4 hours', desc: 'Soft, romantic two-strand twists with a natural textured finish.', img: 'public/b3.jpg' },
  { id: 7, name: 'Feed-in Braids', price: '200 - 300', duration: '2-3 hours', desc: 'Sleek braids that start thin and gradually thicken. Great for updos.', img: 'public/b1.jpg' },
  { id: 8, name: 'Twist Braids', price: '220 - 320', duration: '2-3 hours', desc: 'Classic two-strand twists for a clean and versatile protective style.', img: 'public/b3.jpg' },
  { id: 9, name: 'Lemonade Braids', price: '280 - 380', duration: '3-4 hours', desc: 'Side-swept cornrows inspired by Beyonc\u00e9. Bold and iconic.', img: 'public/b2.jpg' },
  { id: 10, name: 'Butterfly Locs', price: '350 - 450', duration: '4-5 hours', desc: 'Distressed faux locs with a looped, bohemian texture.', img: 'public/b4.jpg' },
  { id: 11, name: 'Tribal Braids', price: '320 - 420', duration: '3-4 hours', desc: 'Bold braids with intricate patterns and creative partings.', img: 'public/b2.jpg' },
  { id: 12, name: 'Crochet Braids', price: '180 - 250', duration: '1-2 hours', desc: 'Quick-install braids using the crochet method. Many textures available.', img: 'public/b4.jpg' },
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
