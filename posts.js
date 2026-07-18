document.addEventListener("DOMContentLoaded", () => {

    const supplier = document.getElementById("supplier");
    const postDate = document.getElementById("postDate");
    const postNumber = document.getElementById("postNumber");
    const postCode = document.getElementById("postCode");
    const postLink = document.getElementById("postLink");
    const nextBtn = document.getElementById("nextBtn");

    function generatePostCode() {

        if (!supplier || !postDate || !postNumber || !postCode) return;

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

    // نسخ الكود بالضغط على خانة الكود نفسها

    if (postCode) {

        postCode.addEventListener("click", async () => {

            if (!postCode.value) return;

            postCode.select();
                        try {

                await navigator.clipboard.writeText(postCode.value);

            } catch (err) {

                document.execCommand("copy");

            }

            const oldBorder = postCode.style.borderColor;
            const oldBackground = postCode.style.background;

            postCode.style.borderColor = "#2E7D32";
            postCode.style.background = "#E8F5E9";

            const oldValue = postCode.value;

            postCode.value = "✅ تم نسخ الكود";

            setTimeout(() => {

                postCode.value = oldValue;
                postCode.style.borderColor = oldBorder;
                postCode.style.background = oldBackground;

            }, 1200);

        });

    }

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            if (!supplier.value) {
                alert("اختاري المورد");
                return;
            }

            if (!postDate.value) {
                alert("اختاري تاريخ البوست");
                return;
            }

            if (!postNumber.value) {
                alert("اكتبي رقم البوست");
                return;
            }

            if (!postLink.value) {
                alert("أضيفي لينك البوست");
                return;
            }

            const postData = {

                supplier: supplier.value,
                date: postDate.value,
                number: postNumber.value,
                code: postCode.value,
                link: postLink.value

            };

            localStorage.setItem("currentPost", JSON.stringify(postData));

            window.location.href = "add-products.html";

        });

    }

});