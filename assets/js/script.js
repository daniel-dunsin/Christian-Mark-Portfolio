/*==============SIDEBAR============== */
const sidebar = document.querySelector(".sidebar");
const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", (e) => {
  const icon = e.target;
  if (icon.classList.contains("fa-bars")) {
    sidebar.classList.add("open-sidebar");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else if (icon.classList.contains("fa-times")) {
    sidebar.classList.remove("open-sidebar");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});



/* ====================FILTER PORTFOLIO========================= */
const portfolios = document.querySelectorAll(".portfolio");
const filterBtns = document.querySelectorAll(".filter-btn");
const overlay = document.querySelector(".image-overlay");
const overlayImg = document.querySelector(".image-overlay img");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const closeBtn = document.querySelector(".close-overlay");
let imgCount = 0;

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filterCategory = btn.dataset.filter;
    btn.classList.add('active-btn');
    filterBtns.forEach(button=>{
        if(button != btn){
            button.classList.remove('active-btn');
        }
    })
    portfolios.forEach((element) => {
      const category = element.dataset.category;
      if (category != filterCategory) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }

      if (filterCategory == "all") {
        element.style.display = "block";
      }
    });
  });
});

const imageSrc = [...portfolios].map((portfolio) => {
  return portfolio.querySelector("img").src;
});

const displayImage = (count) => {
    overlayImg.src = imageSrc[count];
};

portfolios.forEach((element, index) => {
  const displayImageToggle = element.querySelector(
    ".portfolio-externals button:first-child"
  );
  const image = element.querySelector("img").src;
  displayImageToggle.addEventListener("click", () => {
    overlay.classList.add("show-overlay");
    imgCount = index;
    displayImage(imgCount);
  });
});


nextBtn.addEventListener('click', ()=>{
    if(imgCount == imageSrc.length - 1){
        imgCount = -1;
    }
    imgCount++;
    displayImage(imgCount);
});
prevBtn.addEventListener('click', ()=>{
    if(imgCount == 0){
        imgCount = imageSrc.length;
    }
    imgCount--;
    displayImage(imgCount)
});
closeBtn.addEventListener('click', ()=>{
    overlay.classList.remove('show-overlay');
})

// ===============BACK TO TOP BUTTON=====================

const button = document.querySelector('.back-to-top-btn');
window.addEventListener('scroll',()=>{
  const scrollHeight = window.pageYOffset;
  if(scrollHeight > 500){
    button.classList.add('display-btn');
  }else{
    button.classList.remove('display-btn');
  }
})

/* ================HIGHLIGHT SIDEBAR LINKS WHEN THEIR SECTIONS ARE IN VIEW======================== */
const sections = document.querySelectorAll('.section');
sections.forEach(section=>{
  const sectionId = section.getAttribute('id');
  const sectionHeight = section.getBoundingClientRect().height;
  const sectionTop = section.offsetTop;
  const linkEl = document.querySelector(`[href="#${sectionId}"]`);

  if(linkEl){
    window.addEventListener('scroll', ()=>{
      const scrollHeight = window.pageYOffset;
      if(scrollHeight > sectionTop && scrollHeight < (sectionTop+sectionHeight)){
        linkEl.classList.add('active-link')
      }else{
        linkEl.classList.remove('active-link');
      }
    })
  }
})