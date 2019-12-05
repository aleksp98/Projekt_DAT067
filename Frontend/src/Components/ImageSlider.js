import React from 'react';
//import $ from "jquery";
import Picture1 from '../Image/bg004.jpg';
import Picture2 from '../Image/bg005.jpg';
import Picture3 from '../Image/bg006.jpg';
import Picture4 from '../Image/bg007.jpg';


class imageSlider extends React.Component {
    
    render() {


      return (
        <div className="sliderContainer">
          <img src={Picture1} className="img02" alt="Background" />
          <img src={Picture2} className="img02" alt="Background" />
          <img src={Picture3} className="img02" alt="Background" />
          <img src={Picture4} className="img02" alt="Background" />
        </div>
      )
    }
  }

  export default imageSlider;