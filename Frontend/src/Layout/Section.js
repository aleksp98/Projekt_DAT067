import React from 'react';
import Translation from './Translation'


class section extends React.Component {
    render() {
        return (
            <section id={this.props.id}>
            <section className={this.props.id}>

                <h3>Hello, welcome to {this.props.value}</h3>
<<<<<<< HEAD
                
                {(() => {if(this.props.value == "Translation") 
                {return <Translation/>}})()}

                {this.props.children}
>>>>>>> ad10a42311b270dc1e134dfabdb0d3bcab5df1c4

            </section>


        )
    }
}

export default section;