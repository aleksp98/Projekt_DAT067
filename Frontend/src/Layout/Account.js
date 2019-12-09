import React from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";

import Section from './Section';
import Footer from './Footer';
import Form from './Form';

import Arrow from '../Image/arrow.png';
import ProfilePicture from '../Image/user-512.png';

import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const getSession = () => Cookies.get("session");
export const isAuthenticated = () => !!getAccessToken();

export default class Account extends React.Component {

    state = {
        visibleForm: true,
        isAuthenticated: isAuthenticated(),
        session: getSession(),
        userItem : null
    }
        
    switchPage(page) {
        //alert(`${page}`);
        $(".accountManegment section").hide();
        $(`.${page}`).show();
    }

    editPersonalInfo(){
        var type = $(".personalInfo p").first().text();
       
        if(type === "Edit"){
            $( ".personalInfo input" ).prop( "disabled", false );
            $( ".personalInfo p" ).replaceWith("<p>Save</p>");
        }
        else if(type === "Save"){
            $( ".personalInfo input" ).prop( "disabled", true );
            $( ".personalInfo p" ).replaceWith("<p>Edit</p>");
        }
        //alert(type);
    }

    getUserItem(email){
        const url = 'https://localhost:5001/api/User/User/' + email;
        const requestOptions = {
            method: 'GET'
        };
alert(email);
        const request = new Request(url, requestOptions);

        fetch(request).then(function (response) {
            return response.text().then(function (text) {
                    console.log(text);
                    //return JSON.parse(text);
            });
        });
    }

    
    render() {
        return (
        
            <section className="accountPage">

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
                                {this.state.session ?
                                    <p> 
                                        {JSON.parse(this.state.session).email} 
                                        <img src={Arrow} className="arrow" alt="rotateArrow" />
                                    </p> 
                                    : 
                                    <p>
                                    Default Name 
                                    <img src={Arrow} className="arrow" alt="rotateArrow" />
                                    </p>
                                }
                                <div className="dropdown-content">
                                    <p value="Account"><Link to="/">Home</Link></p>
                                    <p value="Settings"><Link to="/Settings">Settings</Link></p>
                                    <p value="Logout" onClick={() => { Cookies.remove("session"); Cookies.remove("access_token"); window.location.reload(); }}>Logout</p>
                                </div>
                            </div>
                        }
                    </div>

                    
                    <h1>Customer Identity and Access Management</h1>


                </header>

                <Section id="start" value="Account Manegment">

                {this.state.isAuthenticated ?
                    <div className="accountManegment">
                        <aside className="sideBar">
                            <h3 onClick={() => this.switchPage('accountInfo')}>Account</h3>
                            <h3 onClick={() => this.switchPage('personalInfo')}>Personal</h3>
                            <h3 onClick={() => this.switchPage('uploads')}>Uploads</h3>
                        </aside>

                        <Section id="accountInfo" show="true" value="Account Information">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>User ID: </th>
                                        <th>Password: </th>
                                    </tr>
                                    <tr>
                                        <td>{JSON.parse(this.state.session).email}</td>
                                        <td>{JSON.parse(this.state.session).password}</td>
                                    </tr>
                                    <tr>
                                        <td><p>Delete ID</p></td>
                                        <td><p>Change Password</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Change ID</p></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="imageContainer">
                                <img src={ProfilePicture} alt="Profile picture"></img>
                                <p>Delete</p>
                                <p>Change</p>
                            </div>
                        </Section>

                        <Section id="personalInfo" show="true" value="Personal Information">
                            <table>
                                <tbody>
                                    <tr>
                                        <th onClick={() => this.getUserItem(JSON.parse(this.state.session).email)}>Firstname: </th>
                                        <td><input type="text" name="firstname" placeholder="{this.state.userItem.firstname}" disabled></input></td>
                                    </tr>
                                    <tr>
                                        <th>Lastname: </th>
                                        <td><input type="text" name="lastname" placeholder="Dover" disabled></input></td>
                                    </tr>
                                    <tr>
                                        <th>Telephone number: </th>
                                        <td><input type="number" name="phoneNumber" placeholder="094030302" disabled></input> </td>
                                    </tr>
                                    <tr>
                                        <th>Market: </th>
                                        <td><input type="text" name="market" placeholder="SE" disabled></input></td>
                                    </tr>
                                    <tr>
                                        <th>Language: </th>
                                        <td><input type="text" name="language" placeholder="SV" disabled></input></td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <td onClick={this.editPersonalInfo}><p>Edit</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Section>

                        <Section id="uploads" show="true" value="User Uploads">
                            <h4>Tanken med denna fliken är att alla ens text uppladdningar ska finnas här</h4>
                        </Section>

                    </div>
                : 
                    <h1>In order too use this page you must login</h1>
                }
                
                </Section>

                <Footer />
            </section>
        );
    }
}