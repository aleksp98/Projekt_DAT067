import React from 'react';
import ALink from './ALink';
import UserIcon from '../Image/user-512.png';
import PasswordIcon from '../Image/password.ico';
import Recaptcha from 'react-recaptcha';

/*

                 <Recaptcha
    sitekey="xxxxxxxxxxxxxxxxxxxx"
    render="explicit"
    onloadCallback={callback}
  />

*/


export default class form extends React.Component {

    
    render() {

        
        alert(this.props.form);
        
        if(this.props.form === "Login"){
            return (
                
                <div className="cover">
                    <form method="post">
                        <a href="true">X</a>
                        <h3>Please {this.props.form}</h3>
                        <div>
                            <img src={UserIcon} alt="UserIcon" />
                            <input type="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div>
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
                    <form method="post" className="RegisterForm">
                        <a href="true">X</a>
                        <h3>Please {this.props.form}</h3>
                        <div>
                            <input type="text" name="firstname" placeholder="Lastname" required />
                            <input type="text" name="surname" placeholder="Firstname" required />
                        </div>
                        <div>
                            <input type="email" name="email" placeholder="E-mail" required />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        
                        <button>Login</button>

       

                        <footer>
                            <ALink href="true" value="Already have an account? Sign in" />
                        </footer>
                    </form>
                </div>

            )
        }
    }
  }

 