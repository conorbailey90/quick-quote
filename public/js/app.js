
// Navigation

let mobileNav = document.querySelector('.mobile-nav');
let menuToggle = document.querySelector('.menu-toggle');
let menuClose = document.querySelector('.menu-close');
let mobileNavLinks = document.querySelectorAll('.mob-nav-link');

menuToggle.addEventListener('click', ()=>{
    menuClose.style.top = `${menuToggle.getBoundingClientRect().top}px`;
    mobileNav.classList.add('active')
})

menuClose.addEventListener('click', ()=>{
    mobileNav.classList.remove('active');
})

mobileNavLinks.forEach(link =>{
    link.addEventListener('click', ()=>{
        mobileNav.classList.remove('active');
    })
})



