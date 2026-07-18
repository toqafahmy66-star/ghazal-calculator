document.addEventListener("DOMContentLoaded", () => {

    const productsContainer = document.getElementById("productsContainer");
    const addProductBtn = document.getElementById("addProductBtn");
    const savePostBtn = document.getElementById("savePostBtn");

    const isEditing = localStorage.getItem("isEditing") === "true";
    const editPostIndex = localStorage.getItem("editPostIndex");

    const editPost = JSON.parse(localStorage.getItem("editPost"));

    // ===========================
    // تحميل التصنيفات من الإعدادات
    // ===========================

    const categories =
    JSON.parse(localStorage.getItem("categories")) || [
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

    function loadCategories(select, selectedValue = ""){

        select.innerHTML = "";

        categories.forEach(category=>{

            const option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            if(category === selectedValue){
                option.selected = true;
            }

            select.appendChild(option);

        });

    }

    function calculate(card){

        const buy = card.querySelector(".buyPrice");
        const profit = card.querySelector(".profit");
        const discount = card.querySelector(".discount");
        const sell = card.querySelector(".sellPrice");
        const offer = card.querySelector(".offerPrice");

        let buyPrice = Number(buy.value) || 0;
        let profitPercent = Number(profit.value) || 0;
        let discountPercent = Number(discount.value) || 0;

        let sellPrice =
        buyPrice + (buyPrice * profitPercent / 100);

        let offerPrice =
        sellPrice - (sellPrice * discountPercent / 100);

        sell.value =
        sellPrice ?
        sellPrice.toFixed(2) + " جنيه"
        : "";

        offer.value =
        offerPrice ?
        offerPrice.toFixed(2) + " جنيه"
        : "";

    }

    function attachEvents(card){

        card.querySelector(".buyPrice")
        .addEventListener("input",()=>calculate(card));

        card.querySelector(".profit")
        .addEventListener("change",()=>calculate(card));

        card.querySelector(".discount")
        .addEventListener("change",()=>calculate(card));

        card.querySelector(".deleteBtn")
        .addEventListener("click",()=>{

            let cards =
            document.querySelectorAll(".post-card");

            if(cards.length===1){

                alert("لا يمكن حذف آخر منتج");

                return;

            }

            card.remove();

        });

    }

    function fillProduct(card,product){

        loadCategories(
            card.querySelector(".category"),
            product.category || ""
        );

        card.querySelector(".productName").value =
        product.name || "";

        card.querySelector(".buyPrice").value =
        product.buyPrice || "";

        card.querySelector(".profit").value =
        product.profit || "";

        card.querySelector(".discount").value =
        product.discount || "";

        calculate(card);

    }

    // ===========================
    // أول كارت
    // ===========================

    const firstCard =
    document.querySelector(".post-card");

    if(firstCard){

        loadCategories(
            firstCard.querySelector(".category")
        );

        attachEvents(firstCard);

    }

    // ===========================
    // تحميل منتجات التعديل
    // ===========================

    if(
        isEditing &&
        editPost &&
        editPost.products
    ){

        fillProduct(
            firstCard,
            editPost.products[0]
        );

        for(
            let i=1;
            i<editPost.products.length;
            i++
        ){

            let newCard =
            firstCard.cloneNode(true);

            newCard
            .querySelectorAll("input")
            .forEach(input=>{

                input.value="";

            });

            newCard.querySelector("h2").textContent =
            "المنتج " + (i+1);

            productsContainer.appendChild(newCard);

            fillProduct(
                newCard,
                editPost.products[i]
            );

            attachEvents(newCard);

        }

    }
        // ===========================
    // إضافة منتج جديد
    // ===========================

    if(addProductBtn){

        addProductBtn.addEventListener("click",()=>{

            let firstCard =
            document.querySelector(".post-card");

            let newCard =
            firstCard.cloneNode(true);

            newCard
            .querySelectorAll("input")
            .forEach(input=>{

                input.value="";

            });

            loadCategories(
                newCard.querySelector(".category")
            );

            newCard.querySelector(".profit").selectedIndex = 0;
            newCard.querySelector(".discount").selectedIndex = 0;

            newCard.querySelector("h2").textContent =
            "المنتج " +
            (document.querySelectorAll(".post-card").length + 1);

            productsContainer.appendChild(newCard);

            attachEvents(newCard);

        });

    }

    // ===========================
    // حفظ البوست
    // ===========================

    if(savePostBtn){

        savePostBtn.addEventListener("click",()=>{

            const products = [];

            document
            .querySelectorAll(".post-card")
            .forEach(card=>{

                products.push({

                    name:
                    card.querySelector(".productName").value,

                    category:
                    card.querySelector(".category").value,

                    buyPrice:
                    card.querySelector(".buyPrice").value,

                    profit:
                    card.querySelector(".profit").value,

                    discount:
                    card.querySelector(".discount").value,

                    sellPrice:
                    card.querySelector(".sellPrice").value,

                    offerPrice:
                    card.querySelector(".offerPrice").value

                });

            });

            let posts =
            JSON.parse(
                localStorage.getItem("posts")
            ) || [];

            if(isEditing){

                posts[editPostIndex].products =
                products;

                const currentPost =
                JSON.parse(
                    localStorage.getItem("currentPost")
                ) || {};

                posts[editPostIndex] = {

                    ...posts[editPostIndex],

                    ...currentPost,

                    products

                };

            }

            else{

                const currentPost =
                JSON.parse(
                    localStorage.getItem("currentPost")
                ) || {};

                posts.push({

                    ...currentPost,

                    products

                });

            }

            localStorage.setItem(
                "posts",
                JSON.stringify(posts)
            );

            localStorage.removeItem("editPost");
            localStorage.removeItem("editPostIndex");
            localStorage.removeItem("isEditing");

            alert("تم حفظ البوست بنجاح ✅");

            window.location.href =
            "saved-posts.html";

        });

    }

});