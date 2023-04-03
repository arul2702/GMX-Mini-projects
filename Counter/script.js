const counter=document.querySelector('.counter');
const incre=document.querySelector('.plus');
const decre=document.querySelector('.minus');
let count=0;
incre.addEventListener("click",()=>{
    count+=1;
    counter.innerHTML=count;
});
decre.addEventListener("click",()=>{
    count-=1;
    counter.innerHTML=count;
});
