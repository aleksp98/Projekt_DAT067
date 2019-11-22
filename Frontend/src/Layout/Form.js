import React from 'react';
import ALink from './ALink';
import UserIcon from '../Image/user-512.png';
import PasswordIcon from '../Image/password.ico';
import Recaptcha from 'react-recaptcha';
import EyeIcon from '../Image/icon-eye-7.jpg';




/*

                 <Recaptcha
    sitekey="xxxxxxxxxxxxxxxxxxxx"
    render="explicit"
    onloadCallback={callback}
  />

*/


export default class form extends React.Component {

    
    
        constructor() {
            super();
            this.state = {
              fields: {},
              errors: {}
            }
      
            this.handleChange = this.handleChange.bind(this);
            this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
      
          };
      
          handleChange(e) {
            let fields = this.state.fields;
            fields[e.target.name] = e.target.value;
            this.setState({
              fields
            });
        }
            submituserRegistrationForm(e) {
                e.preventDefault();
                if (this.validateForm()) {
                    let fields = {};
                    fields["firstname"] = "";
                    fields["lastname"] = "";
                    fields["email"] = "";
                    fields["password"] = "";
                    fields["ConfirmPassword"] = "";
                    this.setState({fields:fields});
                    alert("Form submitted");
                }
          
              }
            
              validateForm() {
                let fields = this.state.fields;
                let errors = {};
                let formIsValid = true;
                
                
            
                  if(!fields["password"].match(/(?=.{8,})/)) {
                      formIsValid = false;
                      errors["password"] = "The password must be at least 8 characters";
                  
                  }
                  
                  else if (!fields["password"].match(/(?=.*[a-z])/)) {
                    formIsValid = false;
                    errors["password"] = "Must have at least one lowercase";
                  }

                  else if (!fields["password"].match(/(?=.*[A-Z])/)) {
                    formIsValid = false;
                    errors["password"] = "Must have at least one uppercase";
                  }
                  
                     else if (!fields["password"].match(/(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/)) {
                      formIsValid = false;
                      errors["password"] = "Must have at least one special character";
                    }
                    
                    else if (!fields["password"].match(/(?=.*[0-9])/)) {
                        formIsValid = false;
                        errors["password"] = "Must have at least one number";
                      }
                  
        
                   else if(!(fields["ConfirmPassword"] == fields["password"])){
                      formIsValid = false;
                      errors["ConfirmPassword"] = "The passwords must match";
                  }
                
                  
                  this.setState({
                    errors: errors
                  });
                  return formIsValid;
                
            
                };

      
        
      
      state = {
        isPasswordShown : false
        }

        togglePasswordVisiblity = () => {
            const {isPasswordShown} = this.state;
            this.setState({isPasswordShown : !isPasswordShown});
        }
    render() {
        
        const {isPasswordShown} = this.state;
        
        //alert(this.props.form);
        
        if(this.props.form === "Login"){
            return (
                
                <div className="cover">
                    <form method="post" >
                        <a href="true">X</a>
                        <h3>Please {this.props.form}</h3>
                        <div>
                            <img src={UserIcon} alt="UserIcon" />
                            <input type="email" 
                            name="email" 
                            placeholder="E-mail" required
                           
                             />
                        </div>
                        <div>
                            <img src={PasswordIcon} alt="PasswordIcon" />
                            <input type={(isPasswordShown) ? "text" : "password"} 
                            className="form-conntrol" 
                            name="password" 
                            placeholder="Password" required
                            
                             />
                            <img className="eyeIcon" 
                            onClick ={this.togglePasswordVisiblity}
                            src={EyeIcon} alt ="EyeIcon"/>
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
                    <form method="post" name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm}>
                        <a href="true">X</a>
                        <h3>{this.props.form}</h3>
                        
                        <div>
                            <input type="text" 
                            className="inputDesignFirstname" 
                            name="firstname" 
                            placeholder ="Firstname *" required 
                            />
                            
                        </div>
                        <div>
                        <input type="text" 
                            className="inputDesignLastname"
                            name="surname" 
                            placeholder="Lastname *" required 
                            
                            />
                        </div>
                        <div>
                            <input type="email" 
                            name="email" 
                            className="inputDesignEmail"
                            placeholder="E-mail address *" required
                            value={this.state.fields.email} 
                            onChange={this.handleChange} 
                            />
                        </div>
                        
                        <div>
                            <input type="password" 
                            className="inputDesignPassword"
                            name="password" 
                            placeholder="Password *" required 
                            value={this.state.fields.password}
                            onChange={this.handleChange}
                            />
                            <p className="errorMsg">{this.state.errors.password}</p>
                        </div>

                       
                        <div>
                        <input type="password" 
                        className="inputDesignConfirmPassword"
                        name="ConfirmPassword" 
                        placeholder="Confirm Password *" required 
                        value={this.state.fields.ConfirmPassword}
                        onChange={this.handleChange}
                        />
                        <p className="errorMsg">{this.state.errors.ConfirmPassword}</p>

                        </div>
                        <button>Create account</button>

       

                        <footer>
                            <ALink href="true" value="Already have an account? Sign in" />
                        </footer>
                    </form>
                </div>

            )
        }
    }
  }

