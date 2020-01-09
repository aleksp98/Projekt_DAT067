import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import * as Cookies from "js-cookie";

export default class LinkedInAccount extends React.Component  {
    handleTwitterAnswer() {
        console.log(this.props);
        let code = require('query-string').parse(this.props.location.search).code;
        console.log(code);
        const url = 'https://localhost:5001/api/User/SaveLinkedInUser/' +
            'code=' + code;
        const headers = new Headers();
        const requestOptions = {
            method: 'GET',
            headers
        };
        const request = new Request(url, requestOptions);

        fetch(request).then(function (response) {
            return response.text().then(function (text) {
                console.log(text);
                let user = JSON.parse(text);
                console.log(user);
                console.log(user.email);
                Cookies.remove("session");
                Cookies.set("session", { "email": user.email, "password": user.social_id, "social_login": user.social_platform }, { expires: 14 });
                Cookies.set("access_token", "placeholder", { expires: 14 });
                window.close();
            });
        });

        /*const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost/3000');
        const requestOptions = {
            method: 'GET',
            headers
        };
        const request = new Request(url, requestOptions);

        fetch(request).then(function (response) {
            return response.text().then(function (text) {
                
            });
        });
        */
    }

    render() {
        return (
            <div>
                {this.handleTwitterAnswer()}
                <h1>Handling Twitter Oauth!</h1>
            </div>
        );
    }
}