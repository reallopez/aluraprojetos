document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateX(0)";
            }
        });
    }, { threshold: 0.5 });
    
    images.forEach(image => {
        observer.observe(image);
    });

    // Carousel script
    const carousel = document.querySelector(".video-carousel");
    const carouselButtons = document.querySelectorAll(".carousel-button");
    let currentIndex = 0;
    const totalItems = carousel.children.length;
    const videoWidth = carousel.children[0].clientWidth;

    function cloneSlides() {
        for (let i = 0; i < totalItems; i++) {
            const cloneFirst = carousel.children[i].cloneNode(true);
            carousel.appendChild(cloneFirst);
        }
    }

    function updateCarousel() {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
    }

    function moveToNext() {
        currentIndex++;
        updateCarousel();
        if (currentIndex >= totalItems) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(0)`;
            }, 500);
        }
    }

    function moveToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            currentIndex = totalItems - 1;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
                updateCarousel();
            }, 500);
        }
    }

    cloneSlides();
    updateCarousel();

    carouselButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("left")) {
                moveToPrev();
            } else if (button.classList.contains("right")) {
                moveToNext();
            }
        });
    });

    // Infinite loop functionality
    setInterval(moveToNext, 5000);
});
