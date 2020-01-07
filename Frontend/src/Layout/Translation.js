import React from 'react';
import { string } from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

class translation extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLeft = this.handleChangeLeft.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.deleteWord2 = this.deleteWord2.bind(this);
        this.editWord = this.editWord.bind(this);
        this.editWord2 = this.editWord2.bind(this);
        this.saveWord = this.saveWord.bind(this);
        this.saveWord2 = this.saveWord2.bind(this);
        this.handleInputChange2 = this.handleInputChange2.bind(this);


        //get all Languages
        this.getLanguages();
    }

    state = {
        query: '',
        query2: '',
        data: [],
        data2: [],
        stringMsg: {},
        stringMsgLeft: {},
        resultR: '',
        resultBox: '', //value from create or result in right box
        resultL: [],
        objectL : '', //The choosen word xd
        enable : false, //Om ett språk intryckt enable edit och delete.+Disable select list där nere då
        writeLanguage: 1, // the languageId you have selected to write to in left
        languages: [], //all available languages
        leftbox: '',//Value from the create/edit box
        edit: false //Bool if editmode is on or off in leftbox
    }

  async componentDidMount(){
    document.body.className="body-component";
  }

    handleInputChange = () => {
        this.setState({
            query: this.search.value,
            resultBox: this.box.value
        })
        this.filterArray();
    }

    handleInputChange2 = () => {
        this.setState({
            query2: this.search2.value,
            leftbox: this.box2.value
        })
      this.filterArray2();
    }


    //patetisk function
    /*
    getData = () => {

        fetch('xxx') //query db example
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                this.setState({
                    data: responseData
                })
            })
    }
     */

    handleChange(e) {

        // Variable to hold the original version of the list
        let stringMsg = this.state.stringMsg;
        stringMsg["message"] = e.target.value;

        this.searchForText();
    }

    handleChangeLeft(e) {

        // Variable to hold the original version of the list
        let stringMsg = this.state.stringMsgLeft;
        stringMsg["message"] = e.target.value;

        this.searchAllWord();
    }

    //edit a word that already exist rightbox
    editWord() {

        let _this = this;
        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/Create/?languageText=' + this.state.resultBox + '&languageId=' + this.state.resultR.languageId + '&textId=' + this.state.resultR.textId;
        const request = new Request(url, requestOptions);
        fetch(request);

        this.setState({ resultR: [] })
        this.box.value = '';

    }

    //kallas när edit är intryckt
    //lägger in det sökta ordet i boxen
    //fixa en global variabel
    //läsa value from språk knappen
    editWord2() {
       
        this.setState({ edit : !this.state.edit })
    }

    //Save a completely new word rightside //default English
    saveWord() {

        let _this = this;
        //alert("inside");


        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/Create/?languageText=' + this.state.query + '&languageId=1'; //+this.state.resultR.languageId;
        const request = new Request(url, requestOptions);
        fetch(request);

        this.setState({ resultR: [] })
        this.search.value = '';
    }


    //Save the word to database
    //depending if on edit mode or "new word" mode
    saveWord2() {
        
        const requestOptions = {
            method: 'GET'
        };
        var url = '';
         
        //alert(this.state.leftbox)
        //skapa en edit variabel i state
        if(this.state.edit){
                                     //ändra untz till ord från boxen
            url = 'https://localhost:5001/api/Language/Create/?languageText=' + this.state.leftbox + '&languageId=' + this.state.objectL.languageId + '&textId=' + this.state.objectL.textId;
        }
        else{ //helt nytt ord

            url = 'https://localhost:5001/api/Language/Create/?languageText=' + this.state.leftbox + '&languageId=' +this.state.writeLanguage;
            //alert(this.state.writeLanguage)
        }
 
        const request = new Request(url, requestOptions);
        fetch(request);

        this.setState({ enable: false, edit :false, objectL : '' })
    }

    //reads all languages and stores in languages state
    getLanguages() {

        let _this = this;

        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/getLanguages/'
        const request = new Request(url, requestOptions);
        fetch(request)
            .then(response => {
                return response.json(); //json()
            })
            .then(data => {
                var json = data;
                _this.setState({ languages: data })
                //alert(JSON.stringify(this.state.languages))
            })
            .catch(err => {

            })

    }

    //deleteword from rightbox
    deleteWord() {
        let _this = this;
        //alert("inside");

        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/Delete/?textId=' + this.state.resultR.textId;
        const request = new Request(url, requestOptions);
        fetch(request);

        this.setState({ resultR: [] })
    }


    //delete word from leftbox
    deleteWord2() {
        let _this = this;

        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/Delete/?textId=' + this.state.objectL.textId;
        const request = new Request(url, requestOptions);
        fetch(request);
        //remove the button i pressed on
        //+make button pressed in

    }


    //searches for word in rightbox
    searchForText() {
        let _this = this;
        //alert("inside");

        let stringMsg = {};

        stringMsg["search"] = this.state.stringMsg.message;
        var searchString = stringMsg["search"];
        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/SearchText/' + searchString;
        const request = new Request(url, requestOptions);
        fetch(request)
            .then(response => {
                return response.json();
            })
            .then(data => {
                _this.setState({ resultR: data })
            })
            .catch(err => {

            })
    }

    //Finds all words in left
    searchAllWord() {

        let _this = this;
        //alert("inside");
        let stringMsg = {};

        stringMsg["search2"] = this.state.stringMsgLeft.message;
        var searchString = stringMsg["search2"];


        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/SearchAll/' + searchString;
        const request = new Request(url, requestOptions);
        fetch(request)
            .then(response => {
                return response.json(); //json()
            })
            .then(data => {

                _this.setState({ resultL: data })
            })
            .catch(err => {

            })
    }


    //help function finds the Language as a string of the searched word
    findLanguage(id) {

        for (var i = 0; i < this.state.languages.length; i++) {
            if (id === JSON.stringify(this.state.languages[i].id)) {
                return JSON.stringify(this.state.languages[i].language)
            }
        }
        return ' '
    }

    //skapar knappar med alla språk som har ordet i sig
    //fixa så att man ser att knappen är intryckt
    LanguagesFound() {

        const { resultL } = this.state;

        let languagesList = resultL.length > 0
            && resultL.map((item, i) => {

                var language = this.findLanguage(JSON.stringify(item.languageId));
                var textid = JSON.stringify(item.textId);

                return (
                    <button onClick={() => this.setState({ objectL: item, enable: !this.state.enable })} ><option key={i} value={item.id}>{language}</option></button>
                )
            }, this);

        return languagesList
    }




    filterArray = () => {
        var searchString = this.state.query;
        var responseData = this.state.data

        if (searchString.length > 0) {

            // console.log(responseData[i].name);
            responseData = responseData.filter(l => {
                console.log(l.name.toLowerCase().match(searchString));

            })
        }
    }


    filterArray2 = () => {
        var searchString = this.state.query2;
        var responseData = this.state.data2;

        if (searchString.length > 0) {

            // console.log(responseData[i].name);
            responseData = responseData.filter(l => {
                console.log(l.name.toLowerCase().match(searchString));

            })
        }
    }

    /*
    componentWillMount() {
        this.getData();
    }
    */

    render() {

        ////skapar select listan
        const { languages } = this.state;

        let languagesList = languages.length > 0
            && languages.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.language}</option>
                )
            }, this);
           //



        return (
            <div id="translationmodule">
                <div id="translatetext">
                    <label>Search use the search on right side</label>
                    <div className="search2">
                        <input type="text"
                            id="search2"
                            placeholder="Search for text..."
                             ref={input => this.search2 = input}
                            onChange={this.handleChangeLeft} />
                        <div>
                            {
                                this.state.data2.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                    </div>
                    <label>Translations found in listed languages</label>
                    <div className="translationsfound">
                        <div>
                            {this.LanguagesFound()}
                        </div>
                        <button disabled={!this.state.enable} onClick={this.editWord2} >Edit</button>
                        <button disabled={!this.state.enable} onClick={this.deleteWord2}>Delete</button>
                    </div>
                    <label>Edit/Create</label>
                    <div className="editCreate">
                        <textarea type="text"
                            id="editText"
                            placeholder={this.state.objectL.languageText}
                            defaultValue={this.state.objectL.languageText}
                            ref={input => this.box2 = input}
                            onChange={this.handleInputChange2} />
                        <div>
                            {
                                this.state.data2.map((i) =>
                                    <p>{i.name}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className="selectLanguage">
                        <div class="select">
                            <select disabled={this.state.enable} onChange={(e) => { this.setState({ writeLanguage: e.target.value }) }}>
                                {languagesList}
                            </select>
                        </div>
                        <button onClick={this.saveWord2}>Save</button>
                        <div>
                            {
                                this.state.data2.map((i) =>
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
                            onChange={this.handleChange}
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
                            placeholder={this.state.resultR.languageText}
                            defaultValue={this.state.resultR.languageText}
                            ref={input => this.box = input}
                            onChange={this.handleInputChange} />
                        <button onClick={this.editWord}>Edit</button>
                        <button onClick={this.deleteWord}>Delete</button>
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
                            onChange={this.handleInputChange} />
                        <button onClick={this.saveWord}>Save</button>
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