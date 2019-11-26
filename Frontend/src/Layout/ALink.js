import React from 'react';
import $ from "jquery";

class button extends React.Component {
    onClick = (e) => {
        e.preventDefault()
        console.log('Button clicked')
        if (this.props.value === "Login") {

            alert("hello, you picked Login");


        }
        else if (this.props.value === "Register") {
            alert("hello, you picked Register");
        }
    }
    render() {
        return (
            <a href="true" onClick={this.onClick}>{this.props.value}</a>
        )
    }
}

export default button;