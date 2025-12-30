document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".carousel-btn.prev-btn");
    const nextBtn = document.querySelector(".carousel-btn.next-btn");

    let currentIndex = 0;
    let autoScrollInterval;

    function showSlide(index) {
        const translateX = -index * 100;
        carousel.style.transform = `translateX(${translateX}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 5000); // Auto scroll every 5 seconds
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        stopAutoScroll();
        startAutoScroll(); // Restart auto scroll after manual interaction
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        stopAutoScroll();
        startAutoScroll(); // Restart auto scroll after manual interaction
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showSlide(currentIndex);
            stopAutoScroll();
            startAutoScroll(); // Restart auto scroll after manual interaction
        });
    });

    // Pause auto scroll on hover
    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);

    showSlide(currentIndex);
    startAutoScroll();
});
