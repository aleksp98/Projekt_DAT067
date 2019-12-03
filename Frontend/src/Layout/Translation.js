import React from 'react';

class translation extends React.Component {
      state = {
          query: '',
          data: [],
      }
  
      handleInputChange = () => {
          this.setState({
              query: this.search.value
          })
          this.filterArray();
      }
  
      getData = () => {
          fetch(`http://localhost:4000/restaurants`) //query db example
          .then(response => response.json())
          .then(responseData => {
              // console.log(responseData)
              this.setState({
                  data:responseData
              })
          })
      }
  
      filterArray = () => {
          var searchString = this.state.query;
          var responseData = this.state.data
          if(searchString.length > 0){
              // console.log(responseData[i].name);
              responseData = responseData.filter(l => {
                  console.log( l.name.toLowerCase().match(searchString));
              })
          }
      }
  
      componentWillMount() {
          this.getData();
      }
      render() {
          return (
            <div id="translation">
              <div className="searchForm">
                  <form>
                    <label>Search for existing text</label>
                    <input type="text" 
                    id="search" 
                    placeholder="Search for ID..." 
                    ref={input => this.search = input} 
                    onChange={this.handleInputChange}/>
                  </form>
                  <div>
                      {
                          this.state.data.map((i) =>
                              <p>{i.name}</p>
                          )
                      }
                  </div>
              </div>
              <div className="newTextForm">
                  <form>
                    <label>Create new Text</label>
                    <input type="text" 
                    id="newText" 
                    placeholder="Enter ID.." 
                    ref={input => this.search = input} 
                    onChange={this.handleInputChange}/>
                  </form>
                  <div>
                      {
                          this.state.data.map((i) =>
                              <p>{i.name}</p>
                          )
                      }
                  </div>
              </div>
              <div className="editTextForm">
                  <form>
                    <label>Edit text here</label>
                    <textarea type="text" 
                    id="editText" 
                    placeholder="text goes here.." 
                    ref={input => this.search = input} 
                    onChange={this.handleInputChange}/>
                  </form>
                  <div>
                      {
                          this.state.data.map((i) =>
                              <p>{i.name}</p>
                          )
                      }
                  </div>
              </div>


            </div>
          )
      }
  }

  export default translation;