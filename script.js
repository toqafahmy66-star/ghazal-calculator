const buyPrice = document.getElementById("buyPrice");
const extraCost = document.getElementById("extraCost");
const desiredProfit = document.getElementById("desiredProfit");

const totalCost = document.getElementById("totalCost");
const suggestedPrice = document.getElementById("suggestedPrice");

const sellPrice = document.getElementById("sellPrice");
const discount = document.getElementById("discount");

const finalPrice = document.getElementById("finalPrice");
const finalProfit = document.getElementById("finalProfit");



function calculate() {

    let buy = Number(buyPrice.value);
    let extra = Number(extraCost.value);
    let profitPercent = Number(desiredProfit.value);

    let sell = Number(sellPrice.value);
    let dis = Number(discount.value);



    // التكلفة الحقيقية
    let cost = buy + extra;


    // سعر البيع المقترح
    let suggested = cost + (cost * profitPercent / 100);



    // السعر بعد الخصم
    let afterDiscount = sell - (sell * dis / 100);



    // الربح النهائي بعد الخصم
    let profit = afterDiscount - cost;



    totalCost.innerHTML = cost.toFixed(2);

    suggestedPrice.innerHTML = suggested.toFixed(2);

    finalPrice.innerHTML = afterDiscount.toFixed(2);

    finalProfit.innerHTML = profit.toFixed(2);

}




buyPrice.addEventListener("input", calculate);
desiredProfit.addEventListener("input", calculate);
sellPrice.addEventListener("input", calculate);
discount.addEventListener("input", calculate);




function clearCalculator(){

    buyPrice.value = "";
    desiredProfit.value = "";
    sellPrice.value = "";
    discount.value = "";


    totalCost.innerHTML = "0";
    suggestedPrice.innerHTML = "0";
    finalPrice.innerHTML = "0";
    finalProfit.innerHTML = "0";

}