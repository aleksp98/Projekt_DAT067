import React from 'react';
import { Link } from "react-scroll";


class navigation extends React.Component {
    render() {
      return (
          <nav className="NavigationBar">
            <Link activeClass="active"
                  to="Start"
                  spy={true}
                  smooth={true}
                  offset={-170}
                  duration={500}> 
                  Start
            </Link>
            <Link activeClass="active"
                  to="Translation"
                  spy={true}
                  smooth={true}
                  offset={-130}
                  duration={500}> 
                  Translation
            </Link>
            <Link activeClass="active"
                  to="Upload"
                  spy={true}
                  smooth={true}
                  offset={-130}
                  duration={500}> 
                  Upload
            </Link>
            <Link activeClass="active"
                  to="About"
                  spy={true}
                  smooth={true}
                  offset={-125}
                  duration={500}> 
                  About
            </Link>
          </nav>
      )
    }
  }

export default navigation;