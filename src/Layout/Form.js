import React from 'react';
import ALink from './ALink';
import UserIcon from '../Image/user-512.png';
import PasswordIcon from '../Image/password.ico';
import Recaptcha from 'react-recaptcha';

/*

               

*/


export default class form extends React.Component {

    constructor(props){
        super(props);

        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state = {
            isVerified: false
        }
    }

    recaptchaLoaded(){
        console.log("Capcha loaded successfully!");
    }

    handleRegister(e){
        if(this.state.isVerified){
            alert("You have registred");
        }
        else{
            e.preventDefault(); //Hindrar att formuläret submitas   JE
            alert("Please verify that you are a human");
        }
    }

    verifyCallback(response){
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }

    render() {    
        //alert(this.props.form);
        
        if(this.props.form === "Login"){
            return (
                
                <div className="cover">
                    <form>
                        <a href="true">X</a>
                        <h3>Please {this.props.form}</h3>
                        <div className="inputDiv">
                            <img src={UserIcon} alt="UserIcon" />
                            <input type="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div className="inputDiv">
                            <img src={PasswordIcon} alt="PasswordIcon" />
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        <button>Login</button>
                        <footer>
                            <ALink href="true" value="Forgot Password?" />
                        </footer>
                    </form>
                </div>

            )
        }
        else if(this.props.form === "Register"){
            return (
                <div className="cover">
                    <form className="RegisterForm">
                        <a href="true">X</a>
                        <h3>Please {this.props.form}</h3>
                        <div className="inputDiv"> 
                            <input type="text" name="firstname" placeholder="Lastname" required />
                            <input type="text" name="surname" placeholder="Firstname" required />
                        </div>
                        <div className="inputDiv">
                            <input type="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div className="inputDiv">
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        
                        <button onClick={this.handleRegister}>Login</button>

                        <Recaptcha 
                            className="reCapcha"
                            sitekey="6LfWBMQUAAAAAFoGa1-TI5r-Mj0dH5rOQXgXyl5L"
                            render="explicit"
                            onloadCallback={this.recaptchaLoaded}
                            verifyCallback={this.verifyCallback}
                        />

                        <footer>
                            <ALink href="true" value="Already have an account? Sign in" />
                        </footer>
                    </form>
                </div>

            )
        }
    }
  }

 