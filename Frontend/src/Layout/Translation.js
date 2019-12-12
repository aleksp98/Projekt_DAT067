import React from 'react';
import { string } from 'prop-types';

class translation extends React.Component {
    constructor(props) {
    super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    
            state = {
          query: '',
          data: [],
          stringMsg: {}
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
      
      handleChange(e) {
          
        // Variable to hold the original version of the list
        let stringMsg = this.state.stringMsg;
        stringMsg["message"] = e.target.value;
        
        
            
            this.searchForText();
        }

        searchForText(){
            let stringMsg = {};
            stringMsg["search"] = this.state.stringMsg.message;
            var searchString = stringMsg["search"];
            var responseData = this.state.data;
            const headers = new Headers();
            const requestOptions = {
                method: 'GET',
                headers,
                
            };
           const url = 'https://localhost:5001/api/Controllers/Search';
           const request = new Request(url, requestOptions);
           
           if(searchString.length > 0){
            searchString = searchString.toLowerCase();
            
            fetch(request).then(function (response) {
                return response.text().then(function (text) {

                
                })
        
        })
        
                }

            }
    
  
  
  
      filterArray = () => {
          var searchString = this.state.query;
          var responseData = this.state.data;
          
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
                            value={this.state.stringMsg.message}
                            onChange={this.handleChange}/>
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
                            <div class="select">
                                <select name="selectedLanguage" id="selectedLanguage">
                                    <option value="1" selected="selected">Swedish</option>
                                    <option value="2">Swedish</option>
                                    <option value="3">Swedish</option>
                                    <option value="4">Swedish</option>
                                </select>
                            </div>
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
                            onChange={this.handleInputChange}
                            />
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