document.addEventListener("DOMContentLoaded", () => {


    const container = document.getElementById("savedPosts");

    const searchCode = document.getElementById("searchCode");

    const searchSupplier = document.getElementById("searchSupplier");


    const exportBtn = document.getElementById("exportBtn");

    const importBtn = document.getElementById("importBtn");

    const importFile = document.getElementById("importFile");



    let posts = JSON.parse(localStorage.getItem("posts")) || [];





    function displayPosts(){


        let codeValue =
        searchCode.value.trim().toLowerCase();



        let supplierValue =
        searchSupplier.value;




        let filteredPosts = posts.filter(post => {



            let matchCode =
            (post.code || "")
            .toLowerCase()
            .includes(codeValue);



            let matchSupplier =
            supplierValue === "" ||
            post.supplier === supplierValue;



            return matchCode && matchSupplier;



        });






        if(filteredPosts.length === 0){


            container.innerHTML = `

            <div class="section">

            لا يوجد بوستات مطابقة 🔍

            </div>

            `;


            return;

        }





        let html = "";





        filteredPosts.forEach(post => {



            let index = posts.indexOf(post);



            html += `


            <div class="section">


            <h2>
            📸 البوست رقم ${index + 1}
            </h2>



            <button class="editPostBtn" data-index="${index}">
            ✏️ تعديل البوست
            </button>



            <button class="deletePostBtn" data-index="${index}">
            🗑 حذف البوست
            </button>




            <p>
            المورد: ${post.supplier || ""}
            </p>



            <p>
            التاريخ: ${post.date || ""}
            </p>



            <p>
            الكود: ${post.code || ""}
            </p>



            <p>
            الرابط:
            <a href="${post.link || '#'}" target="_blank">
            فتح البوست
            </a>
            </p>




            <hr>



            <h3>🛍 المنتجات</h3>

            `;






            if(post.products){


                post.products.forEach(product => {


                    html += `

                    <div class="product-card">

                    <h3>
                    ${product.name || ""}
                    </h3>


                    <p>
                    التصنيف:
                    ${product.category || ""}
                    </p>


                    <p>
                    سعر الشراء:
                    ${product.buyPrice || ""}
                    </p>


                    <p>
                    سعر البيع:
                    ${product.sellPrice || ""}
                    </p>


                    <p>
                    سعر العرض:
                    ${product.offerPrice || ""}
                    </p>


                    </div>

                    `;


                });


            }





            html += `

            </div>

            `;



        });





        container.innerHTML = html;



        activateButtons();


    }









    function activateButtons(){



        document.querySelectorAll(".deletePostBtn")
        .forEach(btn => {



            btn.onclick = () => {



                let index = btn.dataset.index;



                if(confirm("هل تريد حذف هذا البوست؟")){


                    posts.splice(index,1);



                    localStorage.setItem(
                        "posts",
                        JSON.stringify(posts)
                    );



                    displayPosts();


                }



            };


        });







        document.querySelectorAll(".editPostBtn")
        .forEach(btn => {



            btn.onclick = () => {



                let index = btn.dataset.index;



                localStorage.setItem(
                    "editPost",
                    JSON.stringify(posts[index])
                );



                localStorage.setItem(
                    "editPostIndex",
                    index
                );



                localStorage.setItem(
                    "isEditing",
                    "true"
                );



                window.location.href =
                "posts.html";



            };



        });



    }









    // تصدير نسخة احتياطية


    if(exportBtn){


        exportBtn.onclick = () => {



            let data = JSON.stringify(
                posts,
                null,
                2
            );



            let blob = new Blob(
                [data],
                {type:"application/json"}
            );



            let url = URL.createObjectURL(blob);



            let a = document.createElement("a");


            a.href = url;


            a.download = "ghazal-backup.json";


            a.click();



            URL.revokeObjectURL(url);



        };


    }









    // استرجاع نسخة احتياطية


    if(importBtn){


        importBtn.onclick = () => {



            if(!importFile.files[0]){


                alert("اختاري ملف النسخة الاحتياطية أولاً");

                return;


            }



            let reader = new FileReader();




            reader.onload = function(e){



                try{


                    let imported =
                    JSON.parse(e.target.result);



                    localStorage.setItem(
                        "posts",
                        JSON.stringify(imported)
                    );



                    alert("تم استرجاع النسخة بنجاح ✅");



                    location.reload();



                }
                catch{


                    alert("الملف غير صالح");


                }



            };



            reader.readAsText(
                importFile.files[0]
            );



        };


    }








    searchCode.addEventListener(
        "input",
        displayPosts
    );



    searchSupplier.addEventListener(
        "change",
        displayPosts
    );





    displayPosts();



});