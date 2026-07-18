document.addEventListener("DOMContentLoaded", () => {


    const supplier = document.getElementById("supplier");
    const postDate = document.getElementById("postDate");
    const postNumber = document.getElementById("postNumber");
    const postCode = document.getElementById("postCode");
    const postLink = document.getElementById("postLink");
    const nextBtn = document.getElementById("nextBtn");



    const isEditing = localStorage.getItem("isEditing") === "true";

    let editPost = null;



    if(isEditing){

        const saved = localStorage.getItem("editPost");

        if(saved){

            editPost = JSON.parse(saved);

        }

    }






    // تحميل بيانات التعديل فقط

    if(editPost){


        supplier.value = editPost.supplier || "";

        postDate.value = editPost.date || "";

        postNumber.value = editPost.number || "";

        postCode.value = editPost.code || "";

        postLink.value = editPost.link || "";


    }

    else{


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



        const date = new Date(postDate.value);



        const day = String(
            date.getDate()
        ).padStart(2,"0");



        const month = String(
            date.getMonth()+1
        ).padStart(2,"0");



        const number = String(
            parseInt(postNumber.value)
        ).padStart(3,"0");





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









    // نسخ الكود بالضغط على الكود نفسه

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

                alert("تم نسخ كود البوست");


            }

            catch(error){

                alert("لم يتم النسخ");

            }



        }
    );









    // زر التالي

    nextBtn.addEventListener(
        "click",
        ()=>{


            if(!supplier.value){

                alert("اختاري المورد");
                return;

            }



            if(!postDate.value){

                alert("اختاري التاريخ");
                return;

            }



            if(!postNumber.value){

                alert("اكتبي رقم البوست");
                return;

            }



            if(!postLink.value){

                alert("أضيفي رابط البوست");
                return;

            }








            const postData = {


                supplier:supplier.value,

                date:postDate.value,

                number:postNumber.value,

                code:postCode.value,

                link:postLink.value


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