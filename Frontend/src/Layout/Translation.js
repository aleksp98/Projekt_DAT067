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
          fetch(`http://localhost:4000/xxxx`) //query db example
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
              <div id="translationmodule">
                <div id="translatetext">
                <label>Search</label>
                    <div className="search">
                            <input type="text" 
                            id="search" 
                            placeholder="Search for text..." 
                            ref={input => this.search = input} 
                            onChange={this.handleInputChange}/>
                        <div>
                            {
                                this.state.data.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                    </div>
                    <label>Translations found in listed languages</label>
                    <div className="translationsfound">
                            <div>
                                <button>swedish</button>
                                <button>swedish</button>
                                <button>swedish</button>

                            </div>
                            <button>Edit</button>
                            <button>Delete</button>
                    </div>
                    <label>Edit/Create</label>
                    <div className="editCreate">
                            <textarea type="text" 
                            id="editText" 
                            placeholder="text goes here.." 
                            ref={input => this.search = input} 
                            onChange={this.handleInputChange}/>
                        <div>
                            {
                                this.state.data.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                        </div>
                        <div className="selectLanguage">
                                //dropdownlista
                                <button class="savebutton">Save</button>
                        <div>
                            {
                                this.state.data.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                        
                    </div>
                </div>
                <div id="createtext">
                    <label>Search</label>
                    <div className="search">
                            <input type="text" 
                            id="search" 
                            placeholder="Search for text..." 
                            ref={input => this.search = input} 
                            onChange={this.handleInputChange}/>
                        <div>
                            {
                                this.state.data.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                    </div>
                    <label>Result</label>
                    <div className="result"> 
                            <textarea type="text" 
                            id="editText" 
                            placeholder="text goes here.." 
                            ref={input => this.search = input} 
                            onChange={this.handleInputChange}/>
                            <button>Edit</button>
                            <button>Delete</button>
                        <div>
                            {
                                this.state.data.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                    </div>
                    <label>Create</label>
                    <div className="create">
                            <textarea type="text" 
                            id="editText" 
                            placeholder="text goes here.." 
                            ref={input => this.search = input} 
                            onChange={this.handleInputChange}/>
                            <button class="savebutton">Save</button>
                        <div>
                            {
                                this.state.data.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                        </div>
                </div>
            </div>
          )
      }
  }

  export default translation;