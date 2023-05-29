const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            smoothScroll(targetElement);
        }
    });
});

function smoothScroll(targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Длительность анимации в миллисекундах
    let start = null;

    function animation(currentTime) {
        if (start === null) {
            start = currentTime;
        }
        const timeElapsed = currentTime - start;
        const scrollY = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, scrollY);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Функция для плавного изменения значения от начального до конечного
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
