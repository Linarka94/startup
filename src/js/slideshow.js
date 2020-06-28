let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 3000);
let next = document.getElementById('next');
let previous = document.getElementById('previous');

function nextSlide() {
    goToSlide(currentSlide+1);
};

function previousSlide() {
    goToSlide(currentSlide-1);
};

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide slide--show';
};

next.onclick = function() {
    nextSlide();
};

previous.onclick = function() {
    previousSlide();
};

// function nextSlide() {
//     slides[currentSlide].className = 'slide';
//     currentSlide = (currentSlide+1)%slides.length;
//     slides[currentSlide].className = 'slide slide--show';
// }