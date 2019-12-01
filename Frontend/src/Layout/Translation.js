import React from 'react';

class translation extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: [],
        visible: true
    };
  
    handleInputChange = event => {
      const query = event.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };
  
    getData = () => {
      fetch(`http://localhost:4000/restaurants`)
        .then(response => response.json())
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };
  
    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <div id="translation form">
            <div className="searchForm">
            <form>
                <input
                placeholder="Search for.."
                value={this.state.query}
                onChange={this.handleInputChange}
                />
            </form>
            <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
            </div>
            
            <div className="newTextName">
            <form>
            <input
                placeholder="enter new name.."
                value={this.state.query}
                onChange={this.handleInputChange}
            />
            </form>
            <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
            </div>

            <div className="editTextName">
            <form>
            <input
                placeholder="enter new name.."
                value={this.state.query}
                onChange={this.handleInputChange}
            />
            </form>
            <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
            </div>
        </div>
      );
    }
  }

  export default translation;