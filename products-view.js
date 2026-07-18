document.addEventListener("DOMContentLoaded", () => {

const container = document.getElementById("products-list");

const posts = JSON.parse(localStorage.getItem("posts")) || [];

if(posts.length === 0){
    container.innerHTML = "لا يوجد منتجات محفوظة حاليا";
    return;
}

let html = "";

posts.forEach(post => {

    post.products.forEach(product => {

        html += `
        <div class="product-card">
            <h2>${product.name}</h2>
            <p>النوع: ${product.category}</p>
            <p>سعر الشراء: ${product.buyPrice}</p>
            <p>سعر البيع: ${product.sellPrice}</p>
            <p>سعر العرض: ${product.offerPrice}</p>
        </div>
        `;

    });

});

container.innerHTML = html;

});