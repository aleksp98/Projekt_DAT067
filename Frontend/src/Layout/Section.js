import React from 'react';


class section extends React.Component {
    render() {
        return (
            <section className={this.props.id}>

                <h3>Hello, welcome to {this.props.value}</h3>
                {this.props.children}

            </section>
        )
    }
}

export default section;