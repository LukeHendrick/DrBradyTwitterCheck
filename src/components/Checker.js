import React, { Component } from 'react';
import {Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';



export default class Checker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.twitterCheck(this.state.value)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup className='searchBar' >
                    <InputGroup>
                        <InputGroup.Addon id='atSym'>@</InputGroup.Addon>
                        <FormControl type="text" value={this.state.value} onChange={this.handleChange} />
                        <InputGroup.Button value="submit">
                            <Button id='respectChecker' type="submit">Check For Respect</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
    )}
}