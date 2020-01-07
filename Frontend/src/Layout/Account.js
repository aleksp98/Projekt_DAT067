import React, { Component } from 'react';
import $ from "jquery";
import '../App.css';
import '../Script/JS';
import Navigation from './Navigation';
import Section from './Section';
import Footer from './Footer';
import Form from './Form';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { sendHTTP } from './EmailConfirmation'
import { string } from 'prop-types';
import ImageSlider from '../Components/ImageSlider';

import Arrow from '../Image/arrow.png';
import ProfilePicture from '../Image/user-512.png';
import MenyIcon from '../Image/menyIcon.png';

import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const getSession = () => Cookies.get("session");
export const isAuthenticated = () => !!getAccessToken();

export default class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleForm: true,
            isAuthenticated: isAuthenticated(),
            session: getSession(),
            userItem: null,
            password: ""
        }
        //this.getUserItem = this.getUserItem.bind(this);

        for(var i = 0; i < JSON.parse(this.state.session).password.length; i++){
            this.state.password += "*";
        }
        //alert(this.state.password);
    }
    
    switchPage(page) {
        //alert(`${page}`);
        $(".accountManegment section").hide();
        $(`.${page}`).show();
    }

    editPersonalInfo(){
        //var type = $(".personalInfo p").first().text();
        //$( ".personalInfo p" ).replaceWith("<p>Save</p>");

        $(".personalInfo input").prop( "disabled", false );
        $(".personalInfo input").addClass("activeInput");
        $('input[name="firstname"]').focus();
        $(".editUser").hide();
        $(".saveUser").show();
    }

    openNav() {
        document.getElementsByClassName("dropdown-content").style.width = "250px";
    }

    closeNav() {
        document.getElementsByClassName("dropdown-content").style.width = "0";
    }

    state = {
        loading: true,
        person: null,
    }
    
    async componentDidMount() {

        $("body").addClass("body-component");


        const url = 'https://localhost:5001/api/User/User/' + JSON.parse(this.state.session).email;
        const requestOptions = {
            method: 'GET'
        };
        const request = new Request(url, requestOptions);
        
        const response = await fetch(request);
        const data = await response.json();
        this.setState({ 
            person: data, 
            loading: false 
        });
        console.log(this.state.person.first_name);
    }

    async imgSliderFunction() {
        $("h1").css("color", "yellow");
    }

    changeInput(value){
        this.setState({
             person: value
        });
    }

    updateUser() {
        //$( ".personalInfo p" ).replaceWith("<p onclick={updateUser()}>Edit</p>");
        
        $(".personalInfo input").prop( "disabled", true );
        $(".personalInfo input").removeClass("activeInput");
        $(".saveUser").hide();
        $(".editUser").show();

        
        var bla = $(".personalInfo input:first-of-type").val();
        alert(bla);

        let _this = this;

        let user = {};
        user["Id"] = "1";
        user["Email"] = "jonathan.97@live.se";
        user["Password"] = "spdokpsokd";
        user["First_name"] = "spdokpsokd";
        user["Last_name"] = "spdokpsokd";
        user["Phone_number"] = "spdokpsokd";
        user["Language"] = "spdokpsokd";
        const url = 'https://localhost:5001/api/User/UpdateUser';
        console.log(JSON.stringify(user));

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
                alert("user updated");
            });
        });
    }

    handleSideMeny(option) {
        if(option === "open"){
            $(".dropdown-content").addClass("expandSideMeny");
        }
        else if(option === "close"){
            $(".dropdown-content").removeClass("expandSideMeny");
        }
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
                            </div> 
                        :
                            <div className="dropdown">
                                {this.state.session ?
                                    <p>
                                        {JSON.parse(this.state.session).email}
                                        <img src={Arrow} className="arrow" alt="rotateArrow" />
                                        <img src={MenyIcon} className="menyIcon" onClick={() => this.handleSideMeny('open')} alt="menyIcon" />
                                    </p> 
                                    :
                                    <p>
                                    Default Name
                                    <img src={Arrow} className="arrow" alt="rotateArrow" />
                                    </p>
                                }
                                <div className="dropdown-content">   
                                    <p className="closeSideMeny" onClick={() => this.handleSideMeny('close')} >X</p>     
                                    <p onClick={() => this.switchPage('closeThisPage')}>Account</p>
                                    <p className="uploadsLink" onClick={() => this.switchPage('uploads')}>Uploads</p>

                                    <p value="Account"><Link to="/">Home</Link></p>
                                    <p value="Settings"><Link to="/Settings">Settings</Link></p>
                                    <p value="Logout" onClick={() => { Cookies.remove("session"); Cookies.remove("access_token"); window.location.reload(); }}><Link to="/">Logout</Link></p>
                                </div>
                            </div>
                        }
                    </div>

                    <h1>CIAM ID</h1>


                </header>

                <Section id="infoSection" value="Account Manegment">

                {this.state.isAuthenticated ?
                    <div className="accountManegment">

                        <Section id="accountInfo closeThisPage" show="true" value="Account Information">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>User ID: </th>
                                        <th>Password: </th>
                                    </tr>
                                    <tr>
                                        <td>{JSON.parse(this.state.session).email}</td>
                                        <td>{this.state.password}</td>
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
                            {/*
                            <div className="imageContainer">
                                <img src={ProfilePicture} alt="Profile picture"></img>
                                <p>Delete</p>
                                <p>Change</p>
                            </div>
                            */}
                        </Section>

                        <Section id="personalInfo closeThisPage" show="true" value="Personal Information">
                            
                            {this.state.loading || !this.state.person ? 
                                <p>loading...</p> 
                            : 
                                <table>
                                    <tbody>
                                        <tr>
                                            {/*onClick={() => getUserItem(JSON.parse(this.state.session).email)*/}
                                            {/*     Om den har value istället för placeholder måste det finnas en onChange som känner av om den ändrar JE */}
                                            <th>Firstname: </th>
                                            <td><input type="text" name="firstname" onChange={e => this.changeInput(e.target.value)} value={this.state.person.first_name} disabled></input></td>
                                        </tr>                                   
                                        <tr>
                                            <th>Lastname: </th>
                                            <td><input type="text" name="lastname" onChange={e => this.changeInput(e.target.value)} value={this.state.person.last_name} disabled></input></td>
                                        </tr>
                                        <tr>
                                            <th>Telephone number: </th>
                                            <td>
                                                {this.state.person.phone_number === null ?
                                                    <input type="number" name="phoneNumber" placeholder="Number missing" disabled/>
                                                :
                                                    <input type="number" name="phoneNumber" onChange={e => this.changeInput(e.target.value)} value={this.state.person.phone_number} disabled /> 
                                                }
                                           </td>
                                        </tr>
                                        <tr>
                                            <th>Market: </th>
                                            <td><input type="text" name="market" value="SE (finns inte i db)" disabled></input></td>
                                        </tr>
                                        <tr>
                                            <th>Language: </th>
                                            <td><input type="text" name="language" value="SV (finns inte i db)" disabled></input></td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <p onClick={this.editPersonalInfo} className="editUser">Edit</p>
                                                <p onClick={this.updateUser} className="saveUser">Save</p>
                                            </td>
                                        </tr>            
                                    </tbody>
                                </table>
                            }
                        </Section>

                        <Section id="uploads" show="true" value="User Uploads">
                            <h4>Tanken med denna fliken är att alla ens text uppladdningar ska finnas här</h4>
                            {this.state.loading || !this.state.person ? 
                                    <p>loading...</p> 
                                : 
                                <div>
                                    <p>{this.state.person.first_name}</p>
                                </div>
                                }
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
