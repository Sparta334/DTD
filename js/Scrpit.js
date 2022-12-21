let index = 1;
$(document).ready(function () {

    new WOW().init();
    index = 1;
    var StepWidth = $(".typed-out").html().toString();
    $(".typed-out").css("animation", "typing 1s steps(" + (StepWidth.length) + ", end) forwards,blink .8s infinite");
    $("#first").css("animation", "typing 1s steps(" + (StepWidth.length - 6) + ", end) forwards,blink .8s infinite");


    

    console.log(StepWidth.length);

});

setInterval(function () {

    $(".typer-content:nth-child("+index+") div").removeClass("typed-stop");
    $(".typer-content:nth-child("+index+") div").addClass("typed-out");

    if(index >1 && index <=6) {
        $(".typer-content:nth-child("+(index-1 )+") .typed-out").css("border-right" , "0 solid lightblue");
    }



    index += 1;
    if(index >=7){
        index  = 7;
    }


}, 1500);

setInterval(function () {

    for(let i = 0 ; i< 7 ;i++){
        $(".typer-content:nth-child("+(i)+") .typed-out").css("border-right" , ".15em solid lightblue");
        $(".typer-content:nth-child("+i+") div").removeClass("typed-out");
        $(".typer-content:nth-child("+i+") div").addClass("typed-stop");
       
    }
    index = 1;

}, 20000);





$(".navbar-toggler").click(function () {
    $(".collapse").toggleClass("active");
    $(".collapse").toggleClass("inactive");
    $(".navbar-toggler-icon").toggleClass("open");
});






