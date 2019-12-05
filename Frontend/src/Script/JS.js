import $ from "jquery";

window.onscroll = function(){myFunction()};

function myFunction(){
    if(document.body.scrollTop > 150 || document.documentElement.scrollTop > 150){
        //$("header").hide();
        $("header").addClass("headShrinker");
        $("header h1").addClass("h1Mover");
    }
    else{
        $("header").removeClass("headShrinker");
        $("header h1").removeClass("h1Mover");
    }
}

