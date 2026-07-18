document.addEventListener("DOMContentLoaded", () => {

const list = document.getElementById("categoriesList");
const input = document.getElementById("newCategory");
const addBtn = document.getElementById("addCategoryBtn");

const defaultCategories = [
    "خاتم",
    "حلق",
    "سلسلة",
    "إنسيال",
    "إسورة",
    "حظاظة",
    "ساعة",
    "رجالي",
    "باندل"
];

// تحويل الأسماء القديمة للجديدة
const renameMap = {
    "خواتم":"خاتم",
    "حلقان":"حلق",
    "سلاسل":"سلسلة",
    "أساور":"إسورة",
    "أطقم":"باندل"
};

let categories = JSON.parse(localStorage.getItem("categories"));

if(!Array.isArray(categories)){

    categories = [...defaultCategories];

}else{

    categories = categories.map(item => renameMap[item] || item);

    defaultCategories.forEach(item=>{

        if(!categories.includes(item)){
            categories.push(item);
        }

    });

    categories = [...new Set(categories)];

}

save();
render();

addBtn.addEventListener("click",()=>{

    const name = input.value.trim();

    if(name===""){

        alert("اكتبي اسم التصنيف أولاً");
        return;

    }

    if(categories.includes(name)){

        alert("هذا التصنيف موجود بالفعل");
        return;

    }

    categories.push(name);

    save();

    render();

    input.value="";

});

function render(){

    list.innerHTML="";

    categories.forEach((category,index)=>{

        const row=document.createElement("div");

        row.className="category-item";

        row.innerHTML=`
            <span>${category}</span>
            <button class="delete-category" data-index="${index}">
                🗑️
            </button>
        `;

        list.appendChild(row);

    });

    document.querySelectorAll(".delete-category").forEach(btn=>{

        btn.onclick=()=>{

            if(!confirm("هل تريد حذف هذا التصنيف؟")) return;

            categories.splice(btn.dataset.index,1);

            save();

            render();

        };

    });

}

function save(){

    localStorage.setItem(
        "categories",
        JSON.stringify(categories)
    );

}

});