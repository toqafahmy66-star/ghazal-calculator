document.addEventListener("DOMContentLoaded", () => {

let productsContainer = document.getElementById("productsContainer");
let addProductBtn = document.getElementById("addProductBtn");

function calculate(card){

let buy = card.querySelector(".buyPrice");
let profit = card.querySelector(".profit");
let discount = card.querySelector(".discount");
let sell = card.querySelector(".sellPrice");
let offer = card.querySelector(".offerPrice");

let buyPrice = parseFloat(buy.value) || 0;
let profitPercent = parseFloat(profit.value) || 0;
let discountPercent = parseFloat(discount.value) || 0;

let sellPrice = buyPrice + (buyPrice * profitPercent / 100);

let offerPrice = sellPrice - (sellPrice * discountPercent / 100);

sell.value = sellPrice ? sellPrice.toFixed(2) + " جنيه" : "";

offer.value = offerPrice ? offerPrice.toFixed(2) + " جنيه" : "";

}

function attachEvents(card){

card.querySelector(".buyPrice").addEventListener("input",()=>calculate(card));

card.querySelector(".profit").addEventListener("change",()=>calculate(card));

card.querySelector(".discount").addEventListener("change",()=>calculate(card));

card.querySelector(".deleteBtn").addEventListener("click",()=>{

if(document.querySelectorAll(".post-card").length==1){

alert("لا يمكن حذف آخر منتج");

return;

}

card.remove();

});

}

attachEvents(document.querySelector(".post-card"));

addProductBtn.addEventListener("click",()=>{

let firstCard=document.querySelector(".post-card");

let newCard=firstCard.cloneNode(true);

newCard.querySelectorAll("input").forEach(input=>{

input.value="";

});

newCard.querySelector(".profit").selectedIndex=0;

newCard.querySelector(".discount").selectedIndex=0;

productsContainer.appendChild(newCard);

newCard.querySelector("h2").textContent="المنتج "+document.querySelectorAll(".post-card").length;

attachEvents(newCard);

});
document.getElementById("savePostBtn").addEventListener("click",()=>{

const post=JSON.parse(localStorage.getItem("currentPost"));

const products=[];

document.querySelectorAll(".post-card").forEach(card=>{

products.push({

name:card.querySelector(".productName").value,

category:card.querySelector(".category").value,

buyPrice:card.querySelector(".buyPrice").value,

profit:card.querySelector(".profit").value,

discount:card.querySelector(".discount").value,

sellPrice:card.querySelector(".sellPrice").value,

offerPrice:card.querySelector(".offerPrice").value

});

});

const savedPosts=JSON.parse(localStorage.getItem("posts"))||[];

savedPosts.push({

...post,

products:products

});

localStorage.setItem("posts",JSON.stringify(savedPosts));

alert("تم حفظ البوست بنجاح ✅");

window.location.href="posts.html";

});

});ٍ