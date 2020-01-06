import React from 'react';
import $ from "jquery";
import Picture1 from '../Image/bg004.jpg';
import Picture2 from '../Image/bg005.jpg';
import Picture3 from '../Image/bg006.jpg';
import Picture4 from '../Image/bg007.jpg';


class imageSlider extends React.Component {

    imgAnimation(){
      //alert("ds");

      $(".slideContainer section div:nth-child(1)").css('background-color', 'grey');

      var elem = document.getElementsByClassName("imgSlider");   
      var pos = 0;
      var slidePos = 0;
      var id = setInterval(frame, 5000);
      
      function frame() {
        if(pos == 4){
          //clearInterval(id);
          pos = 0;
          slidePos = 0;
        } 
        else{
          var preImg;
          pos++;

          if(pos == 1){
            preImg = 4;
          }
          else{
            preImg = (pos - 1 );
          }

          $(elem).css('right', slidePos + '%');
          $(".slideContainer section div:nth-child(" + preImg  + ")").css('background-color', 'lightgrey');
          $(".slideContainer section div:nth-child(" + pos + ")").css('background-color', 'grey');

          slidePos = slidePos + 100;

          console.log(pos);
        }
      }


    }

    componentDidMount(){
      this.imgAnimation();
    }
    
    render() {


      return (
        <div className="slideContainer">
          <div className="imgSlider">
            <img src={Picture1} className="imgSlide" alt="Background" />
            <img src={Picture2} className="imgSlide" alt="Background" />
            <img src={Picture3} className="imgSlide" alt="Background" />
            <img src={Picture4} className="imgSlide" alt="Background" />
          </div>
          <section>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </section>
          </div>
      )
    }
  }

  export default imageSlider;