let index ;


$(document).resize(function () { 
    
    index = 0;
    $(".Filecarousel").css("transform" , "translateY(" +(-index* elementHieght)+"px)" );


});

$(document).ready(function () {

    

    $(".navbar-toggler").click(function () {
        $(".collapse").toggleClass("active");
        $(".collapse").toggleClass("inactive");
        $(".navbar-toggler-icon").toggleClass("open");
    });



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

    // 檔案下載區

    $(".FileBtn").click(function (e) { 
        e.preventDefault();
        
        $(this).html(`<span class="spinner-border" style="width: 1.5vw; height: 1.5vw;"  ></span>`);

        let Path = $(this).attr("id");
        let FullPath = "Computer_Progrmming/"+Path+".zip";

        
        dbStorage.ref(FullPath).getDownloadURL()
        .then(function(url) {

            fetch(url ,{

                mode:"no-cors"

            }).then(function(){
                
            let a = document.createElement("a");
            
            // 用 createObjectURL 將 blob 創建一個我們本地端瀏覽器中的 URL 對象
            a.href = url;
            a.download = Path;
    
            // Firefox 需要將 JS 建立出的 element appendChild 到 DOM 上才可以 work
            a.style.display = "none";
            document.body.appendChild(a);
    
            a.click();
    
            // 刪除多餘的 DOM 與 釋放記憶體
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
           
         });
          
              
         })
         .then(function(){

            $(".FileBtn").html(`<img src="./img/47504268.jpg" height="100%" width="100%" alt="">`);
         })
         .catch(function(error){


            $(".FileBtn").html(`<img src="./img/47504268.jpg" height="100%" width="100%" alt="">`);
            alert("No File");


        })

    });



    // 聊天室後臺擷取
    let ChatRoomMessage = db.collection("chatRoom").doc("Room1");
    let messageCollection = ChatRoomMessage.collection("Message");
    const $messageList = $("#message-list");
    const $messageField = $("#message-field");

    $messageField.keypress(function (e) { 

        if(e.keyCode == 13){

            SendData($messageField , messageCollection );
        }

    });


    $("#SubmitBtn").click(function (e) { 
        e.preventDefault();


        SendData($messageField , messageCollection );

    });

    // 聊天室後臺擷取並顯示

    let queryMessageCollectionRef = messageCollection.orderBy("SendTime","asc");

    queryMessageCollectionRef.onSnapshot(function(querySnapshot){

        $messageList.html("");

        querySnapshot.forEach(doc => {
            
            let message = doc.data().message;
            let mesTime = new Date(doc.data().SendTime);

            let messageItem = `
            <li class="message-item">
                <img class ="UserImg" src="./@Resoure/Computer _Programming/Account.webp" >
                <div class="chat">${message}</div>
                <div class="chatTime">${mesTime}</div>

            </li>
            `

            $messageList.append(messageItem);
            


        });

        $messageList[0].scrollTop = $messageList[0].scrollHeight;

    });
   

     // 檔案區滾動
    

     index=0;
     let IndexCount = $(".FileItemBox").length;


     $("#controlUp").click(function (e) { 
        e.preventDefault();
        index-=1;
        console.log(index);

        if(index<0){
            index=IndexCount-2;
        }
        let elementHieght = $(".FileItemBox").outerHeight(true);
        console.log(elementHieght);
        $(".Filecarousel").css("transform" , "translateY(" +(-index* elementHieght)+"px)" );
        
    });
    
    $("#controlDown").click(function (e) { 
        e.preventDefault();
        index+=1;
        console.log(index);

        if(index>IndexCount-2){
            index=0;
        }
        let elementHieght = $(".FileItemBox").outerHeight(true);
        console.log(elementHieght);
        $(".Filecarousel").css("transform" , "translateY(" +(-index* elementHieght)+"px)" );
        
    });
    
     



});


function SendData( M , FireBase ){

    let message = M.val();
    if(message[0] != " " && message != ""){
        if(message.length >=34 ){
            alert("屁話一堆! 字數過多");
        }
        else{
            FireBase.add({

        
                SendTime: Date.now(),
                message: message,
        
        
            });
        }
      
    }
   

    M.val('');


}