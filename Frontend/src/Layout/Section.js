import React from 'react';
import Translation from 'Translation.js'


class section extends React.Component {
    render() {
        return (
            <section id={this.props.id}>

                <h3>Hello, welcome to {this.props.value}</h3>
                

            </section>
        )
    }
}

export default section;