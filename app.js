/* =========================================
BLACKWOOD FURNITURES
PREMIUM FRONTEND JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", () => {



/* =========================================
MOBILE MENU
========================================= */


const menuButton =
document.querySelector(".mobile-menu-btn");


const navigation =
document.querySelector(".navigation");



if(menuButton && navigation){


menuButton.addEventListener("click",()=>{


navigation.classList.toggle("active");


menuButton.classList.toggle("open");


});


}








/* =========================================
STICKY HEADER
========================================= */


const header =
document.querySelector(".header");



window.addEventListener("scroll",()=>{


if(window.scrollY > 80){


header?.classList.add("scrolled");


}

else{


header?.classList.remove("scrolled");


}



});








/* =========================================
SCROLL REVEAL ANIMATION
========================================= */


const revealElements =
document.querySelectorAll(".reveal");



const revealObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("active");


revealObserver.unobserve(entry.target);


}



});


},

{

threshold:0.15

}

);





revealElements.forEach(element=>{


revealObserver.observe(element);


});









/* =========================================
ANIMATED STATISTICS
========================================= */


const counters =
document.querySelectorAll(".trust-box h2");



const counterObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


animateCounter(entry.target);


counterObserver.unobserve(entry.target);


}



});


},

{

threshold:.5

}

);



counters.forEach(counter=>{


counterObserver.observe(counter);


});







function animateCounter(element){


const text =
element.innerText;


const number =
parseInt(text.replace(/\D/g,""));


const suffix =
text.replace(/[0-9]/g,"");



let current = 0;



const speed =

number / 80;



const timer = setInterval(()=>{


current += speed;



if(current >= number){


element.innerText =
number + suffix;


clearInterval(timer);


}

else{


element.innerText =
Math.floor(current) + suffix;


}



},20);



}








/* =========================================
SMOOTH INTERNAL LINKS
========================================= */


document.querySelectorAll('a[href^="#"]')
.forEach(link=>{


link.addEventListener("click",(e)=>{


const target =
document.querySelector(
link.getAttribute("href")
);



if(target){


e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}



});


});









/* =========================================
IMAGE LAZY LOADING
========================================= */


const images =
document.querySelectorAll("img");



images.forEach(image=>{


image.setAttribute(
"loading",
"lazy"
);


});








/* =========================================
WHATSAPP PERSONALIZATION
========================================= */


const whatsappButtons =
document.querySelectorAll(
".whatsapp-button"
);



whatsappButtons.forEach(button=>{


button.addEventListener("click",()=>{


console.log(
"Opening Blackwood Furnitures WhatsApp enquiry"
);



});


});








/* =========================================
QUOTE FORM VALIDATION
========================================= */


const forms =
document.querySelectorAll("form");



forms.forEach(form=>{


form.addEventListener(
"submit",
(event)=>{


const requiredFields =
form.querySelectorAll(
"[required]"
);



let valid=true;



requiredFields.forEach(field=>{


if(!field.value.trim()){


valid=false;


field.style.borderColor=
"#c7a24f";


}



});





if(!valid){


event.preventDefault();


alert(
"Please complete all required fields before submitting."
);


}



});


});









/* =========================================
ACTIVE NAVIGATION
========================================= */


const currentPage =
window.location.pathname;



document.querySelectorAll(".nav-links a")
.forEach(link=>{


if(
link.href.includes(currentPage)
){


link.classList.add("active");


}



});



});