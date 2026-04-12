
// toogle 
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

//slider
const slider=document.getElementById("slider");
const next = document.getElementById("next");
const prev=document.getElementById("prev");

let index=0;

function showslide(){
    slider.style.transform=`translateX(-${index * 100}%)`;    
}

next.addEventListener("click",() =>{
    index++;
    if(index > 2) index=0;
    showslide();
    });
prev.addEventListener("click",() =>{
    index--;
    if (index < 0) index = 2;
    showslide();
});

//contact form
const form=document.getElementById("contactForm")

form.addEventListener("submit",function(e){
    e.preventDefault();

const name=document.getElementById("name").value.trim();
const email=document.getElementById("email"). value.trim();
const message=document.getElementById("message").value.trim();

if(name==="" || email ==="" || message ===""){
    alert("please fill the fields");
}else{
    alert("Form submitted sucessfully");
}
})
