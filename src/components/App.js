import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import qs from 'qs'
import Checker from './Checker.js'
import Checked from './Checked.js'
export default class App extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loading: false,
            followed: [],
            notFollowed: [],
            name: '',
            tooManyReqs: false,
            tooManyFollowers: false,
        }
        this.twitterCheck = this.twitterCheck.bind(this);
    }
    twitterCheck(name) {
        let handle_obj = {
            "BradyHaran": false,
            "Numberphile": false,
            "Periodic": false,
            "Sixty": false,
            "Unmade": false,
            "Objectivity": false,
            "Deep": false,
            "Computer": false,
            "Hello": false
        }
        let stringed = qs.stringify(handle_obj)
        console.log(stringed)
        let fArray = []
        let nfArray = []
        fetch(`/api/search/?name=${name}&${stringed}`)
            .then((res) => res.json())
            .then((data) => {
                for(let handle in data) {
                    if (data[handle] == 'tooLarge') {
                        this.setState(() => {
                            return {
                                tooManyFollowers: true
                            }
                        })
                    }
                    if (data[handle] == 429) {
                        this.setState(() => {
                            return {
                                tooManyReqs: true,
                            }
                        })
                        break;
                    }
                    if (data[handle] == true) {
                        fArray.push(handle)
                    } else {
                        nfArray.push(handle)
                    }
                }
                this.setState(() => {
                    return {
                        followed : fArray,
                        notFollowed: nfArray,
                        loading: true,
                        name: name
                    }
                })
            })
    }
    render() {
        if (!this.state.tooManyFollowers) {
            return (
                <div>
                    <Jumbotron>
                    <h1>Dr. Brady's Twitter Checker!</h1>
                    </Jumbotron>
                    { (!this.state.loading) 
                        ? <Checker twitterCheck={this.twitterCheck}/>
                        : <div><Checked name={this.state.name} followed={this.state.followed} notFollowed={this.state.notFollowed} /> <a href='/'>Reload</a></div>
                        }
                </div>
            )
        } else if (this.state.tooManyFollowers) {
            return (
                <div>
                    <Jumbotron>
                        <h1>Dr. Brady's Twitter Checker!</h1>
                    </Jumbotron>
                    <div className="fourTwentyNine">
                        <h2>
                            Sorry! Twitter stinks and doesn't allow us to check accounts with more than 70,000 followers
                        </h2>
                        <h3>
                            Deepest apologies Doctor...
                        </h3>
                        <a href='/'>Reload</a>
                    </div>
                </div>
                
            )
        } else {
            return (
                <div>
                    <Jumbotron>
                        <h1>Dr. Brady's Twitter Checker!</h1>
                    </Jumbotron>
                    <div className="fourTwentyNine">
                        <h2>
                            Sorry! Twitter stinks and doesn't allow us to make more than 15 requests every 15 minutes...
                        </h2>
                        <h3>
                            Deepest apologies Doctor...
                        </h3>
                        <a href='/'>Reload</a>
                    </div>
                </div>
            )
        }
    }
}