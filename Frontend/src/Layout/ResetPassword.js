import React from 'react';
import {Link} from 'react-router-dom';
import { sendHTTP } from './EmailConfirmation'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import ALink from './ALink';
import UserIcon from '../Image/user-512.png';
import PasswordIcon from '../Image/password.ico';
import Recaptcha from 'react-recaptcha';
import EyeIcon from '../Image/icon-eye-7.jpg';

import logo from '../Image/CIAM-logo.png'
import registeredPage from './registeredPage';
import { withRouter } from 'react-router-dom';

import { bool } from 'prop-types';



export default class ResetPassword extends React.Component  {
  
    
    constructor(props) {
      super(props);



      this.state = {
        response : false,loading : true ,visible: true, fields: {},errors: {}, mail: " "
      }
        
      this.handleRegister = this.handleRegister.bind(this);

      this.verifyCallback = this.verifyCallback.bind(this);

      this.ResetPassword = this.ResetPassword.bind(this);

      this.handleChange = this.handleChange.bind(this);
      this.recaptchaLoaded = this.recaptchaLoaded.bind(this);

    }

    componentDidMount(){this.setState({mail: this.props.match.params.mail})}
    
    async ResetPassword(e) {
        e.preventDefault();
          //fixa riktig popup
         //  const value = await sendHTTP(this.props.match.params.token);
        // var mail = this.props.match.params.mail;

        if (this.validateForm()) {

         let user = {};
        user["email"] = this.state.mail;
        user["password"] = this.state.fields.password;
         const url = 'https://localhost:5001/api/User/ChangePassword/';
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         const requestOptions = {
             method: 'POST',
             headers,
            body: JSON.stringify(user)

         };
        const request = new Request(url, requestOptions);
        const response = await fetch(request);
        const value = await response.json();

        this.setState({response: value})
        this.setState({loading : false})
        }
     }
        
     
     
     
     render() {
          const children = this.props.children;

       if(this.state.loading){
        return (  
          
          <div className="cover">
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={this.state.snackbaropen}
                        autoHideDuration={3000}
                        onClose={this.snackbarClose}
                        message={<span id="message-id">{this.state.snackbarmsg}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.snackbarClose}
                            >
                                x
                            </IconButton>
                        ]}
                    />

                    { this.state.visible ?
                        <form method="post" className="userRegistrationForm" name="userRegistrationForm" onSubmit={this.ResetPassword}>
                            
                            {
                                React.Children.map(children, (child, i) => {
                                //Ignore the second child
                                if (i === 1) return
                                    return child
                                })
                            }
                            
                            <h3>test</h3>
                            <div>
                                <input type="password"
                                    className="inputDesignPassword"
                                    name="password"
                                    placeholder="Password *" required
                                    value={this.state.fields.password}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange}
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
                                    onBlur={this.handleChange}
                                />
                                <p className="errorMsg">{this.state.errors.ConfirmPassword}</p>

                            </div>
                            <button onClick={this.handleRegister}>Create account</button>
                          
                            <Recaptcha
                                className="reCapcha"
                                sitekey="6LfWBMQUAAAAAFoGa1-TI5r-Mj0dH5rOQXgXyl5L"
                                render="explicit"
                                onloadCallback={this.recaptchaLoaded}
                                verifyCallback={this.verifyCallback}
                            />


                        </form>
                    :
                    <div className="registrationCompleted">
                       <h3>test1</h3>
                    </div>
                    }
                </div>
            
          

              );

       }

       else{
  
          if(!this.state.response){
         return (         <section>
            <h1>Ett fel har inträffat försök igen senare</h1>
            <Link to="/">
            <p>Go to startpage</p>
            </Link>
            </section> );
        }

      else{
        return (        <section>
            <h1>Du har byt lösenord försök att logga in</h1>
            <Link to="/">
            <p>Go to startpage</p>
            </Link>
            </section> );
          }
    }
}


snackbarClose = (event) => {
  this.setState({ snackbaropen: false });
}

handleChange(e) {

  let fields = this.state.fields;
  fields[e.target.name] = e.target.value;
  this.validateForm();
  this.setState({
      fields
  });
}
recaptchaLoaded() {
  console.log("Captcha loaded successfully!");
}

validateForm() {
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  if (fields["password"] != null) {
      if (!fields["password"].match(/(?=.{8,})/)) {
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

      else if (!(fields["ConfirmPassword"] === fields["password"])) {
          formIsValid = false;
          errors["ConfirmPassword"] = "The passwords must match";
      }
      else if (!this.state.isVerified) {
          formIsValid = false;
      }
  }
  else {
      formIsValid = false;
  }
 
  this.setState({
      errors: errors
  });
  
  return formIsValid;
};


verifyCallback(response) {
  if (response) {
      this.setState({
          isVerified: true
      })
  }
}
handleRegister(e) {

  if (!this.state.isVerified) {
      //Hindrar att formuläret submitas   JE
      this.setState({
          snackbaropen: true, 
          snackbarmsg: "Please verify that you are a human"
      })
  }
}


}