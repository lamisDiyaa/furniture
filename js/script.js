"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
let header = document.querySelector(".header");
let nav = document.querySelector(".nav");
let navCloseBtn=document.querySelector(".nav__responsive__btn")
let sectioOne = document.querySelector("#section--1");
let allSections = document.querySelectorAll(".section");
let tabsContainer=document.querySelector(".operations__tab-container")
const allTabs=document.querySelectorAll(".operations__tab")
const tabsContent=document.querySelectorAll(".operations__content")
let targetHeight = nav.getBoundingClientRect().height;
const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const sliderNext = document.querySelector(".slider__btn--right");
const sliderBefore = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");
const dots = document.querySelectorAll(".dots__dot");
const lazyImgs=document.querySelectorAll("img[data-src]")


let slideCount = 0;


navCloseBtn.addEventListener("click",function(){
  nav.classList.toggle("nav__responsive")
  })

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// to make the button scroll smoothy to the first section
btnScrollTo.addEventListener("click", function () {
  sectioOne.scrollIntoView({ behavior: "smooth" });
});

// to make the nav scroll smoothy
nav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    let id = e.target.getAttribute("href");
    let section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  }
});

const options = {
  root: null,
  rootMargin: `-${targetHeight}px`,
};
const navObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
  console.log(entries);
}, options);

navObserver.observe(header);

let classObserver = new IntersectionObserver(
  (entries) => {
    let [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    classObserver.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.2,
  }
);

allSections.forEach(function (ele) {
  ele.classList.add("section--hidden");
  classObserver.observe(ele);
});


// tabs 
tabsContainer.addEventListener("click",function(e){
  if ((e.target.classList.contains("operations__tab") ) || (e.target.closest(".operations__tab"))){
    allTabs.forEach(function(ele){
      ele.classList.remove("operations__tab--active")
    })
    
    e.target.closest(".operations__tab").classList.add("operations__tab--active")
    let id=e.target.closest(".operations__tab").id
    tabsContent.forEach(function(ele){
      ele.classList.remove("operations__content--active")
    })
    document.querySelector(`.${id}`).classList.add("operations__content--active")
    console.log(id)
    console.log(document.querySelector(`.${id}`))
  
  }

})

























// slider
function showSlides(index) {
  slide.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}
showSlides(slideCount);

function showDots(slide) {
  dots.forEach(function (ele) {
    ele.classList.remove("dots__dot--active");
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  });
}
showDots(0)

function nextSlideShow() {
  if (slideCount === slide.length - 1) {
    slideCount = 0;
  } else {
    slideCount++;
  }
  showSlides(slideCount);
  showDots(slideCount);
}

function prevSlideShow() {
  if (slideCount === 0) {
    slideCount = slide.length - 1;
  } else {
    slideCount--;
  }
  showSlides(slideCount);
  showDots(slideCount);
}

sliderNext.addEventListener("click", nextSlideShow);
sliderBefore.addEventListener("click", prevSlideShow);

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    showDots(slide);
    showSlides(slide);
  }
});


// lazy loading
let lazyObserver= new IntersectionObserver(function(lazyEntries){
  let [lazyEntry]=lazyEntries
  console.log(lazyEntry)
 if(!lazyEntry.isIntersecting) return

 lazyEntry.target.src=lazyEntry.target.dataset.src
 lazyEntry.target.addEventListener("load",function(){
  lazyEntry.target.classList.remove("lazy-img")
 })

 lazyObserver.unobserve(lazyEntry.target)
 
},
{root:null,
  threshold:0
})

lazyImgs.forEach(img=>lazyObserver.observe(img))
