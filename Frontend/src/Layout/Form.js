import React from 'react';
import ALink from './ALink';
import UserIcon from '../Image/user-512.png';
import PasswordIcon from '../Image/password.ico';
import Recaptcha from 'react-recaptcha';
import EyeIcon from '../Image/icon-eye-7.jpg';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';






export default class form extends React.Component {




    constructor(props) {
        super(props);

        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state = {
            fields: {},
            errors: {},
            isVerified: false,
            snackbaropen: false,
            snackbarmsg: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };


    recaptchaLoaded() {
        console.log("Capcha loaded successfully!");
    }

    handleRegister(e) {
        if (this.state.isVerified) {
            alert("You have registred");
        }
        else {
            e.preventDefault(); //Hindrar att formuläret submitas   JE
            alert("Please verify that you are a human");
        }
    }

    verifyCallback(response) {
        if (response) {
            this.setState({
                isVerified: true
            })
        }
    }


    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

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
            let user = {};
            user["email"] = this.state.fields.email;
            user["password"] = this.state.fields.password;
            user["first_name"] = this.state.fields.firstname;
            user["last_name"] = this.state.fields.lastname;
            console.log(user);
            console.log(JSON.stringify(user));

            let fields = {};
            fields["firstname"] = "";
            fields["lastname"] = "";
            fields["email"] = "";
            fields["password"] = "";
            fields["ConfirmPassword"] = "";

            const url = 'https://localhost:5001/api/User/SaveUser';
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const requestOptions = {
                method: 'POST',
                headers,
                body: JSON.stringify(user)
            };
            const request = new Request(url, requestOptions);
            fetch(request).then(this.setState({ fields: fields, snackbaropen: true, snackbarmsg: "Registration successful!" }));
        }

    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;



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


        else if (!(fields["ConfirmPassword"] == fields["password"])) {
            formIsValid = false;
            errors["ConfirmPassword"] = "The passwords must match";
        }


        this.setState({
            errors: errors
        });
        return formIsValid;


    };




    state = {
        isPasswordShown: false
    }

    togglePasswordVisiblity = () => {
        const { isPasswordShown } = this.state;
        this.setState({ isPasswordShown: !isPasswordShown });
    }
    render() {

        const { isPasswordShown } = this.state;

        if (this.props.form === "Login") {
            return (
                <div className="cover">
                    <form method="post">
                        <a href="true">X</a>
                        <h3>Please {this.props.form}</h3>
                        <div>
                            <img src={UserIcon} alt="UserIcon" />
                            <input type="email"
                                name="email"
                                placeholder="E-mail" required
                                value={this.state.fields.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <img src={PasswordIcon} alt="PasswordIcon" />
                            <input type={(isPasswordShown) ? "text" : "password"}
                                className="form-conntrol"
                                name="password"
                                placeholder="Password" required
                                value={this.state.fields.password}
                                onChange={this.handleChange}
                            />
                            <img className="eyeIcon"
                                onClick={this.togglePasswordVisiblity}
                                src={EyeIcon} alt="EyeIcon" />
                        </div>
                        <button>Login</button>
                        <footer>
                            <ALink href="true" value="Forgot Password?" />
                        </footer>
                    </form>
                </div>
            )
        }
        else if (this.props.form === "Register") {
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

                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>
                        <a href="true">X</a>
                        <h3>{this.props.form}</h3>

                        <div>
                            <input type="text"
                                className="inputDesignFirstname"
                                name="firstname"
                                placeholder="Firstname *" required
                                value={this.state.fields.firstname}
                                onChange={this.handleChange}
                            />

                        </div>
                        <div>
                            <input type="text"
                                className="inputDesignLastname"
                                name="lastname"
                                placeholder="Lastname *" required
                                value={this.state.fields.lastname}
                                onChange={this.handleChange}

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
                        <button onClick={this.handleRegister}>Create account</button>

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

