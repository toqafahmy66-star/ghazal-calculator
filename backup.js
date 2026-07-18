document.addEventListener("DOMContentLoaded",()=>{


const exportBtn =
document.getElementById("exportBtn");


const importBtn =
document.getElementById("importBtn");


const importFile =
document.getElementById("importFile");





// ===========================
// تصدير النسخة الاحتياطية
// ===========================

exportBtn.addEventListener("click",()=>{


    const backup = {};


    for(let i=0; i<localStorage.length; i++){


        const key =
        localStorage.key(i);


        backup[key] =
        JSON.parse(
            localStorage.getItem(key)
        );


    }




    const data =
    JSON.stringify(
        backup,
        null,
        2
    );



    const blob =
    new Blob(
        [data],
        {
            type:"application/json"
        }
    );



    const url =
    URL.createObjectURL(blob);



    const link =
    document.createElement("a");


    link.href = url;


    link.download =
    "Ghazal_Backup.json";



    link.click();



    URL.revokeObjectURL(url);



    alert(
        "✅ تم تصدير النسخة الاحتياطية"
    );


});








// ===========================
// استرجاع النسخة الاحتياطية
// ===========================

importBtn.addEventListener("click",()=>{


    const file =
    importFile.files[0];



    if(!file){


        alert(
            "اختاري ملف النسخة أولاً"
        );


        return;


    }






    const reader =
    new FileReader();



    reader.onload = function(e){



        try{


            const backup =
            JSON.parse(
                e.target.result
            );



            if(
                !confirm(
                "سيتم استبدال البيانات الحالية. هل تريدين المتابعة؟"
                )
            ){

                return;

            }





            localStorage.clear();





            Object.keys(backup)
            .forEach(key=>{


                localStorage.setItem(

                    key,

                    JSON.stringify(
                        backup[key]
                    )

                );


            });





            alert(
                "✅ تم استرجاع النسخة بنجاح"
            );



            location.reload();



        }

        catch(error){


            alert(
                "❌ ملف النسخة غير صالح"
            );


        }



    };



    reader.readAsText(file);



});


});