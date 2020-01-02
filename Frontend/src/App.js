import React, { Component } from 'react';
import './App.css';
import './Script/JS';
import ALink from './Layout/ALink';
import Navigation from './Layout/Navigation';
import Section from './Layout/Section';
import Footer from './Layout/Footer';
import Form from './Layout/Form';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { sendHTTP } from './Layout/EmailConfirmation'
import { string } from 'prop-types';
import ImageSlider from './Components/ImageSlider';

import Arrow from './Image/arrow.png';

import registeredPage from './Layout/registeredPage';
import loginPage from './Layout/loginPage';
import Settings from './Layout/Settings';
import Account from './Layout/Account';

import Cookies from 'js-cookie';
import Confirmation from './Layout/Confirmation';
import ResetPassword from './Layout/ResetPassword';

import FacebookLogin from 'react-facebook-login';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const getSession = () => Cookies.get("session");
export const isAuthenticated = () => !!getAccessToken();


class App extends Component {

    state = {
        visibleForm: true,
        isAuthenticated: isAuthenticated(),
        session: getSession()
    }
        
    render() {
        //Check if session is still valid
        if (Cookies.get("session")) {
            let user = JSON.parse(Cookies.get("session"));
            const url = 'https://localhost:5001/api/User/LoginUser';
            
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const requestOptions = {
                method: 'POST',
                headers,
                body: JSON.stringify(user)
            };
            const request = new Request(url, requestOptions);
            fetch(request).then(function (response) {
                return response.text().then(function (text) {
                    if (text === "true") {
                        Cookies.remove("session");
                        Cookies.set("session", { "email": user.email, "password": user.password }, { expires: 14 });
                        Cookies.set("access_token", "placeholder", { expires: 14 });
                    }
                    else {
                        console.log("false");
                        Cookies.remove("session");
                        Cookies.remove("access_token");
                    }
                });
            });
        }

        return (
 
            <Router>
                <Switch>
                    <Route path="/confirmation/:token" exact strict component={Confirmation}/>
                    <Route path="/resetPassword/:mail" exact strict component={ResetPassword}/>

                    <Route path="/Settings" exact strict component={Settings} />
                    <Route path="/Account" exact strict component={Account} />
                    
                    <Route path="/registeredPage" exact strict component={registeredPage} />
                    <Route path="/loginPage" exact strict component={loginPage} />                
                    <section>

                        {!this.state.visibleForm ? 
                            <Form form={this.state.type}>
                                <a href="#" onClick={() => { this.setState({ visibleForm: !this.state.visibleForm}); }}>X</a> 
                                
                                <p className="linkDesign" onClick={() => { this.setState({ type: "Login"}); }}>click here to login</p>
                            </Form> 
                        : null}

                        <header className="header">
                            <div className="headerController">
                                {!this.state.isAuthenticated ?
                                <div>
                                    <a href="#" value="Register" onClick={() => { this.setState({ visibleForm: !this.state.visibleForm, type: "Register" }); }}>Register</a>
                                    <a href="#" value="Login" onClick={() => { this.setState({ visibleForm: !this.state.visibleForm, type: "Login" }); }}>Login</a> 
                                </div> :                           
                                    <div className="dropdown">
                                        <p> 
                                            {this.state.session ? <div> {JSON.parse(this.state.session).email} </div> : "Default Name"}
                                            <img src={Arrow} className="arrow" alt="rotateArrow" />
                                        </p>
                                        <div className="dropdown-content">
                                            <p value="Account"><Link to="/Account">Account</Link></p>
                                            <p value="Settings"><Link to="/Settings">Settings</Link></p>
                                            <p value="Logout" onClick={() => { Cookies.remove("session"); Cookies.remove("access_token"); window.location.reload(); }}>Logout</p>
                                        </div>
                                    </div>
                                }
                            </div>

                            
                            <h1>Customer Identity and Access Management</h1>


                            <Navigation />

                        </header>

                        <Section id="Start" value="Start">
                            <ImageSlider />
                        </Section>

                        <Section id="Translation" value="Translation" />

                        <Section id="Upload" value="Upload" />

                        <Section id="About" value="About" />

                        <Footer />
                    </section>
                </Switch>
            </Router>
        );
    }
}
export default App;
