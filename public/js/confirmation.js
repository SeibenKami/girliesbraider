// Load booking data from localStorage
const booking = JSON.parse(localStorage.getItem('girliesBraiderBooking') || '{}');

if (booking.name) {
  document.getElementById('paymentRef').textContent = booking.bookingRef;
  // Note: Amount to pay is fixed at GHS 50 deposit as per the UI
  
  document.getElementById('detailName').textContent = booking.name;
  document.getElementById('detailPhone').textContent = booking.phone;
  document.getElementById('detailStyle').textContent = booking.style;
  document.getElementById('detailDate').textContent = booking.date;
  document.getElementById('detailTime').textContent = booking.time;
  document.getElementById('detailDuration').textContent = booking.duration;
} else {
  // If no booking found, redirect back to booking
  window.location.href = 'booking.html';
}
