

$(document).ready(function () {

    firebase.initializeApp({
        apiKey: "AIzaSyB_xd9rQlA33uaAM_3vF4KnClR0W_qpxV8",
        authDomain: "dtd-subject.firebaseapp.com",
        projectId: "dtd-subject",
        storageBucket: "dtd-subject.appspot.com",
        messagingSenderId: "826813694124",
        appId: "1:826813694124:web:976a687e07997e6fecdf09"


    });

    let db = firebase.firestore();
    let dbStorage = firebase.storage();
    

    $(".FileBtn").click(function (e) { 
        e.preventDefault();
        
        let Path = $(this).attr("id");
        let FullPath = "Computer_Progrmming/"+Path+".zip";

        dbStorage.ref(FullPath).getDownloadURL()
        .then(function(url) {

            fetch(url)
            .then(res => res.blob())
            .then(blob => {
                let a = document.createElement("a");
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = name;

                // Firefox 需要將 JS 建立出的 element appendChild 到 DOM 上才可以 work
                a.style.display = "none";
                document.body.appendChild(a);

                a.click();

                // 刪除多餘的 DOM 與 釋放記憶體
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
      });

        })
        .catch(function(error){

            alert("No File");


        });

    });

});