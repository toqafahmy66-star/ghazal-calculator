document.addEventListener("DOMContentLoaded", () => {


    const supplier = document.getElementById("supplier");
    const postDate = document.getElementById("postDate");
    const postNumber = document.getElementById("postNumber");
    const postCode = document.getElementById("postCode");
    const postLink = document.getElementById("postLink");
    const nextBtn = document.getElementById("nextBtn");



    const editPost = JSON.parse(localStorage.getItem("editPost"));



    if (editPost) {


        if (supplier)
            supplier.value = editPost.supplier || "";


        if (postDate)
            postDate.value = editPost.date || "";


        if (postNumber)
            postNumber.value = editPost.number || "";


        if (postCode)
            postCode.value = editPost.code || "";


        if (postLink)
            postLink.value = editPost.link || "";


    }





    function generatePostCode() {


        if (!supplier || !postDate || !postNumber || !postCode)
            return;



        if (
            supplier.value === "" ||
            postDate.value === "" ||
            postNumber.value === ""
        ) {

            postCode.value = "";

            return;

        }



        const date = new Date(postDate.value);


        const day = String(date.getDate()).padStart(2, "0");

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const number = String(parseInt(postNumber.value)).padStart(3, "0");



        postCode.value =
            supplier.value + "-" + day + month + "-" + number;


    }





    if (supplier)
        supplier.addEventListener("change", generatePostCode);


    if (postDate)
        postDate.addEventListener("change", generatePostCode);


    if (postNumber)
        postNumber.addEventListener("input", generatePostCode);







    if (postCode) {


        postCode.addEventListener("click", async () => {


            if (!postCode.value)
                return;



            postCode.select();



            try {

                await navigator.clipboard.writeText(postCode.value);

            } catch (err) {

                document.execCommand("copy");

            }


        });


    }








    if (nextBtn) {


        nextBtn.addEventListener("click", () => {



            if (!supplier.value) {

                alert("اختاري المورد");
                return;

            }



            if (!postDate.value) {

                alert("اختاري التاريخ");
                return;

            }



            if (!postNumber.value) {

                alert("اكتبي رقم البوست");
                return;

            }



            if (!postLink.value) {

                alert("أضيفي رابط البوست");
                return;

            }






            const postData = {


                supplier: supplier.value,

                date: postDate.value,

                number: postNumber.value,

                code: postCode.value,

                link: postLink.value


            };





            localStorage.setItem(
                "currentPost",
                JSON.stringify(postData)
            );





            // لو تعديل نحفظ الحالة

            if (editPost) {


                localStorage.setItem(
                    "isEditing",
                    "true"
                );


            } else {


                localStorage.removeItem("isEditing");


            }






            window.location.href = "add-products.html";



        });


    }



});