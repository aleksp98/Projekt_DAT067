import React from 'react';


class section extends React.Component {
    render() {
      return (
          <section id={this.props.id}>

              <h3>Hello, wellcome to {this.props.value}</h3>

          </section>
      )
    }
  }

  export default section;