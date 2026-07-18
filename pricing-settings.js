document.addEventListener("DOMContentLoaded", () => {

const defaultExpenses = document.getElementById("defaultExpenses");
const defaultProfit = document.getElementById("defaultProfit");
const minProfit = document.getElementById("minProfit");
const saveBtn = document.getElementById("savePricingBtn");


// =========================
// تحميل الإعدادات المحفوظة
// =========================

defaultExpenses.value = localStorage.getItem("defaultExpenses") || "";
defaultProfit.value = localStorage.getItem("defaultProfit") || "";
minProfit.value = localStorage.getItem("minProfit") || "";


// =========================
// حفظ الإعدادات
// =========================

saveBtn.addEventListener("click", () => {

    const expenses = defaultExpenses.value.trim();
    const profit = defaultProfit.value.trim();
    const min = minProfit.value.trim();

    console.log("Expenses:", expenses);
    console.log("Profit:", profit);
    console.log("Min:", min);

    localStorage.setItem("defaultExpenses", expenses);
    localStorage.setItem("defaultProfit", profit);
    localStorage.setItem("minProfit", min);

    console.log("Saved Expenses:", localStorage.getItem("defaultExpenses"));
    console.log("Saved Profit:", localStorage.getItem("defaultProfit"));
    console.log("Saved Min:", localStorage.getItem("minProfit"));

    alert("✅ تم حفظ إعدادات التسعير.");

});
});