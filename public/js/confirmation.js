// Load booking data from localStorage
const booking = JSON.parse(localStorage.getItem('girliesBraiderBooking') || '{}');

if (booking.name) {
  document.getElementById('paymentRef').textContent = booking.bookingRef;
  document.getElementById('paymentAmount').textContent = `GH₵ ${booking.price}`;

  document.getElementById('detailName').textContent = booking.name;
  document.getElementById('detailPhone').textContent = booking.phone;
  document.getElementById('detailStyle').textContent = booking.style;
  document.getElementById('detailDate').textContent = booking.date;
  document.getElementById('detailTime').textContent = booking.time;
  document.getElementById('detailDuration').textContent = booking.duration;
}
