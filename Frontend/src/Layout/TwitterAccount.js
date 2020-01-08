import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';

export default class Twitter_account extends React.Component  {
    handleTwitterAnswer() {
        console.log(this.props);
        let token = require('query-string').parse(this.props.location.search).oauth_token;
        let verifier = require('query-string').parse(this.props.location.search).oauth_verifier;
        const url = 'https://localhost:5001/api/User/SaveTwitterUser/' +
            'oauth_token=' + token +
            '&oauth_verifier=' + verifier;
        const headers = new Headers();
        const requestOptions = {
            method: 'GET',
            headers
        };
        const request = new Request(url, requestOptions);

        fetch(request).then(function (response) {
            return response.text().then(function (text) {
                console.log(response);
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