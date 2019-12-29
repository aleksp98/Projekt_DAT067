import React from 'react';
import { string } from 'prop-types';
import { ButtonBase } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

class translation extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.deleteWord2 = this.deleteWord2.bind(this);
        this.editWord = this.editWord.bind(this);
        this.editWord2 = this.editWord2.bind(this);
        this.saveWord = this.saveWord.bind(this);
        this.saveWord2 = this.saveWord2.bind(this);


        //get all Languages
        this.getLanguages();
    }

    state = {
        query: '',
        data: [],
        stringMsg: {},
        resultR: '',
        resultBox: '', //value from create or result in right box
        resultL: [],
        textId: 1,//the textId you have selected to read from in left(the language)
        writeLanguage: 1, // the languageId you have selected to write to in left
        languages: [], //all available languages
        leftbox: ''
    }



    handleInputChange = () => {
        this.setState({
            query: this.search.value,
            resultBox: this.box.value
        })
        this.filterArray();

    }

 //patetisk function
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
   //??
    searchall

    handleChange(e) {

        // Variable to hold the original version of the list
        let stringMsg = this.state.stringMsg;
        stringMsg["message"] = e.target.value;

        this.searchForText();
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


    //edit a word that already exist rightbox
    editWord2() {


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


    //Save a completely new word leftside
    saveWord2() {


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
        alert(this.state.textId);

        const requestOptions = {
            method: 'GET'
        };

        const url = 'https://localhost:5001/api/Language/Delete/?textId=' + this.state.textId;
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
        var responseData = this.state.data;

        const headers = new Headers();

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

        stringMsg["search"] = this.state.stringMsg.message;
        var searchString = stringMsg["search"];


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

                var json = data;
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
                    <button onClick={() => this.setState({ textId: textid })} ><option key={i} value={item.id}>{language}</option></button>
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

    componentWillMount() {
        this.getData();

    }
    render() {

        ////skapar select listan
        const { languages } = this.state;

        let languagesList = languages.length > 0
            && languages.map((item, i) => {
                return (
                    <option key={i} value={item.id}>{item.language}</option>
                )
            }, this);
           ////



        return (
            <div id="translationmodule">
                <div id="translatetext">
                    <label>Search use the search on right side</label>
                    <div className="search">
                        <input type="text"
                            id="search"
                            placeholder="Does not work..."
                            value={this.state.stringMsg.message}
                             ref={input => this.search = input}
                            onChange={this.handleInputChange} />
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
                            {this.LanguagesFound()}
                        </div>
                        <button >Edit</button>
                        <button onClick={this.deleteWord2}>Delete</button>
                    </div>
                    <label>Edit/Create</label>
                    <div className="editCreate">
                        <textarea type="text"
                            id="editText"
                            placeholder={this.state.leftbox}
                            defaultValue={this.state.leftbox}
                            ref={input => this.search = input}
                            onChange={this.handleInputChange} />
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
                            <select>
                                {languagesList}
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