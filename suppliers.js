document.addEventListener("DOMContentLoaded", () => {

const list = document.getElementById("suppliersList");

const codeInput = document.getElementById("supplierCode");

const nameInput = document.getElementById("supplierName");

const addBtn = document.getElementById("addSupplierBtn");



const defaultSuppliers = [

    {
        code:"WD",
        name:"وديع"
    },

    {
        code:"ML",
        name:"ملاك"
    },

    {
        code:"GH",
        name:"الغول"
    },

    {
        code:"BD",
        name:"البنداري"
    },

    {
        code:"MS",
        name:"مصباح"
    },

    {
        code:"BM",
        name:"بابا المجال"
    },

    {
        code:"MK",
        name:"الملوك رجالي"
    }

];



let suppliers =
JSON.parse(localStorage.getItem("suppliers"));



if(!Array.isArray(suppliers)){


    suppliers = defaultSuppliers;


    save();


}




render();





addBtn.addEventListener("click",()=>{


    const code =
    codeInput.value.trim().toUpperCase();


    const name =
    nameInput.value.trim();



    if(code==="" || name===""){


        alert("اكتبي كود واسم المورد");

        return;

    }




    const exists =
    suppliers.some(
        item=>item.code===code
    );



    if(exists){


        alert("كود المورد موجود بالفعل");

        return;

    }





    suppliers.push({

        code:code,

        name:name

    });



    save();


    render();


    codeInput.value="";

    nameInput.value="";



});







function render(){


    list.innerHTML="";



    suppliers.forEach((supplier,index)=>{



        const row =
        document.createElement("div");



        row.className =
        "category-item";



        row.innerHTML = `

        <div>

        <strong>${supplier.name}</strong>

        <br>

        <small>${supplier.code}</small>

        </div>


        <button class="delete-category" data-index="${index}">

        🗑️

        </button>

        `;



        list.appendChild(row);



    });





    document
    .querySelectorAll(".delete-category")
    .forEach(btn=>{


        btn.onclick=()=>{


            if(!confirm("هل تريد حذف المورد؟"))
            return;



            suppliers.splice(
                btn.dataset.index,
                1
            );



            save();


            render();



        };


    });



}






function save(){


    localStorage.setItem(

        "suppliers",

        JSON.stringify(suppliers)

    );


}



});