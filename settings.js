document.addEventListener("DOMContentLoaded", () => {

const exportBtn = document.getElementById("exportDataBtn");
const importBtn = document.getElementById("importDataBtn");
const importFile = document.getElementById("importFile");
const resetBtn = document.getElementById("resetDataBtn");


// =====================
// تصدير البيانات
// =====================

exportBtn.addEventListener("click", () => {

    const data = {};

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);

    }

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Ghazal_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

    alert("✅ تم إنشاء النسخة الاحتياطية.");

});


// =====================
// اختيار ملف للاستيراد
// =====================

importBtn.addEventListener("click", () => {

    importFile.click();

});


// =====================
// استيراد البيانات
// =====================

importFile.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        try {

            const data = JSON.parse(reader.result);

            Object.keys(data).forEach(key => {

                localStorage.setItem(key, data[key]);

            });

            alert("✅ تم استيراد البيانات بنجاح.");

        }

        catch {

            alert("❌ الملف غير صالح.");

        }

    };

    reader.readAsText(file);

});


// =====================
// مسح البيانات
// =====================

resetBtn.addEventListener("click", () => {

    const ok = confirm("هل أنت متأكد من حذف جميع البيانات؟");

    if (!ok) return;

    localStorage.clear();

    alert("🗑️ تم حذف جميع البيانات.");

    location.href = "home.html";

});

});