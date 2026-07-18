document.addEventListener("DOMContentLoaded", () => {


    const supplier = document.getElementById("supplier");
    const postDate = document.getElementById("postDate");
    const postNumber = document.getElementById("postNumber");
    const postCode = document.getElementById("postCode");
    const postLink = document.getElementById("postLink");
    const nextBtn = document.getElementById("nextBtn");



    // ===========================
    // تحميل الموردين من الإعدادات
    // ===========================

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



    const suppliers =
    JSON.parse(localStorage.getItem("suppliers"))
    || defaultSuppliers;



    function loadSuppliers(selectedValue=""){


        supplier.innerHTML = "";


        const firstOption =
        document.createElement("option");


        firstOption.value = "";

        firstOption.textContent =
        "اختر المورد";


        supplier.appendChild(firstOption);



        suppliers.forEach(item=>{


            const option =
            document.createElement("option");


            option.value =
            item.code;


            option.textContent =
            item.name;



            if(item.code === selectedValue){

                option.selected = true;

            }



            supplier.appendChild(option);



        });



    }




    const isEditing =
    localStorage.getItem("isEditing") === "true";


    let editPost = null;



    if(isEditing){


        const saved =
        localStorage.getItem("editPost");


        if(saved){

            editPost =
            JSON.parse(saved);

        }

    }



    // تحميل البيانات في حالة التعديل

    if(editPost){


        loadSuppliers(editPost.supplier);


        supplier.value =
        editPost.supplier || "";


        postDate.value =
        editPost.date || "";


        postNumber.value =
        editPost.number || "";


        postCode.value =
        editPost.code || "";


        postLink.value =
        editPost.link || "";


    }
    else{


        loadSuppliers();


        supplier.value = "";

        postDate.value = "";

        postNumber.value = "";

        postCode.value = "";

        postLink.value = "";


    }
    function generatePostCode(){


        if(
            supplier.value === "" ||
            postDate.value === "" ||
            postNumber.value === ""
        ){

            postCode.value = "";

            return;

        }



        const date =
        new Date(postDate.value);



        const day =
        String(date.getDate())
        .padStart(2,"0");



        const month =
        String(date.getMonth()+1)
        .padStart(2,"0");



        const number =
        String(parseInt(postNumber.value))
        .padStart(3,"0");



        postCode.value =
        supplier.value +
        "-" +
        day +
        month +
        "-" +
        number;


    }





    supplier.addEventListener(
        "change",
        generatePostCode
    );


    postDate.addEventListener(
        "change",
        generatePostCode
    );


    postDate.addEventListener(
        "input",
        generatePostCode
    );


    postNumber.addEventListener(
        "input",
        generatePostCode
    );







    postCode.addEventListener(
        "click",
        function(){


            if(!postCode.value)
                return;



            postCode.select();


            postCode.setSelectionRange(
                0,
                99999
            );



            try{


                document.execCommand("copy");


                alert(
                    "تم نسخ كود البوست"
                );


            }

            catch(error){


                alert(
                    "لم يتم النسخ"
                );


            }



        }
    );








    nextBtn.addEventListener(
        "click",
        ()=>{


            if(!supplier.value){

                alert(
                    "اختاري المورد"
                );

                return;

            }



            if(!postDate.value){

                alert(
                    "اختاري التاريخ"
                );

                return;

            }



            if(!postNumber.value){

                alert(
                    "اكتبي رقم البوست"
                );

                return;

            }



            if(!postLink.value){

                alert(
                    "أضيفي رابط البوست"
                );

                return;

            }






            const postData = {


                supplier:
                supplier.value,


                date:
                postDate.value,


                number:
                postNumber.value,


                code:
                postCode.value,


                link:
                postLink.value



            };






            localStorage.setItem(

                "currentPost",

                JSON.stringify(postData)

            );





            window.location.href =
            "add-products.html";



        }
    );


});