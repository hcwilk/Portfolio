import './style.css';
document.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 100) {
        header.style.opacity = 1;
    } else {
        header.style.opacity = 0;
    }
});
