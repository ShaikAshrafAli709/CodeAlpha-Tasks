// Image data
const images = [
    {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        title: "Alpine Sunrise",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
        thumb: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400",
        title: "City Lights",
        category: "urban"
    },
    {
        src: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200",
        thumb: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400",
        title: "Neon Dreams",
        category: "abstract"
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
        thumb: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
        title: "Mountain Valley",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200",
        thumb: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400",
        title: "Urban Geometry",
        category: "urban"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200",
        thumb: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400",
        title: "Ocean Waves",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1534312527009-56c7016453e6?w=1200",
        thumb: "https://images.unsplash.com/photo-1534312527009-56c7016453e6?w=400",
        title: "Light Trails",
        category: "abstract"
    },
    {
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
        thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
        title: "Lakeside Serenity",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
        thumb: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
        title: "Downtown Dusk",
        category: "urban"
    },
    {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
        thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        title: "Color Flow",
        category: "abstract"
    },
    {
        src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200",
        thumb: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400",
        title: "Waterfall Mist",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200",
        thumb: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400",
        title: "Skyline Glow",
        category: "urban"
    }
];

// DOM elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const currentIndexEl = document.getElementById('currentIndex');
const totalCountEl = document.getElementById('totalCount');
const thumbnailsContainer = document.getElementById('thumbnails');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let filteredImages = [...images];
let lastFocusedElement = null;

// Build gallery
function buildGallery(filter = 'all') {
    filteredImages = filter === 'all'
        ? [...images]
        : images.filter(img => img.category === filter);

    gallery.innerHTML = filteredImages.map((img, index) => `
    <article class="gallery-item" tabindex="0" role="listitem" data-index="${index}">
      <img src="${img.thumb}" alt="${img.title}" loading="lazy">
      <div class="overlay">
        <div class="overlay-title">${img.title}</div>
        <div class="overlay-category">${img.category}</div>
      </div>
      <div class="zoom-icon">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      </div>
    </article>
  `).join('');

    // Attach click events
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(parseInt(item.dataset.index));
            }
        });
    });

    totalCountEl.textContent = filteredImages.length;
}

// Build thumbnails
function buildThumbnails() {
    thumbnailsContainer.innerHTML = filteredImages.map((img, index) => `
    <div class="lightbox-thumb ${index === currentIndex ? 'active' : ''}" data-index="${index}">
      <img src="${img.thumb}" alt="${img.title}">
    </div>
  `).join('');

    document.querySelectorAll('.lightbox-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            goToImage(parseInt(thumb.dataset.index));
        });
    });
}

// Open lightbox
function openLightbox(index) {
    lastFocusedElement = document.activeElement;
    currentIndex = index;
    updateLightbox();
    buildThumbnails();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.querySelector('.lightbox-close').focus();
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
}

// Update lightbox content
function updateLightbox() {
    const img = filteredImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    lightboxTitle.textContent = img.title;
    lightboxCategory.textContent = img.category.charAt(0).toUpperCase() + img.category.slice(1);
    currentIndexEl.textContent = currentIndex + 1;

    // Update active thumbnail
    document.querySelectorAll('.lightbox-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentIndex);
    });
}

// Navigate images
function goToImage(index) {
    currentIndex = index;
    updateLightbox();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

// Event listeners
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', nextImage);
document.querySelector('.lightbox-prev').addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape': closeLightbox(); break;
        case 'ArrowRight': nextImage(); break;
        case 'ArrowLeft': prevImage(); break;
    }
});

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        buildGallery(btn.dataset.filter);
    });
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? nextImage() : prevImage();
    }
}, { passive: true });

// Initialize
buildGallery();
