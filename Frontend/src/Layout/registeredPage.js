import React from 'react';
import '../App';
import {Link} from 'react-router-dom';
import logo from '../Image/CIAM-logo.png'


  export default class registeredPage extends React.Component  {
    render() {
    return (
        
        <section >

               

                <header className="headerDesign">
                    


                    <h1 className="h1Design">Customer Identity and Access Management</h1>


                </header>

                <div className="logoDesign">
              <Link to="/#">
              <img src={logo} alt="logo"       />
              </Link>
                 </div> 
                
            <div className="divDesign">
                <h2 className="messageDesign">Thank you for registering!</h2>
                <h2 className="messageDesign2">An email with a link to activate your account has been sent to you.</h2>
            </div>

            <div className="divDesign">
                <Link to ="/loginPage">
                    <p className="linkDesign">click here to login</p>    
                </Link> 
            
               
            </div>
            
                

              

            </section>
            
            
                
            
        );

    }
}

