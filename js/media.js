// Optional: lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxMedia = lightbox.querySelector('.lightbox-media');
const closeBtn = lightbox.querySelector('.close');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxMedia.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxMedia.src = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxMedia.src = '';
  }
});