import React, { Component } from 'react'

export default class Checked extends Component {
    render() {
    let handle_obj = {
        "BradyHaran": "@BradyHaran",
        "Numberphile": "@numberphile",
        "Periodic": "@periodicvideos",
        "Sixty": "@sixtysymbols",
        "Unmade":"@Unmade_FM",
        "Objectivity":"@objectivity_Vid",
        "Deep":"@DeepSkyVideos",
        "Computer":"@computer_phile",
        "Hello":"@hellointernet_fm",
    }
        return (
            <div className="checked">
                <h1>{this.props.name} follows you on: </h1>
                <ul>
                {this.props.followed.map((handle, i) => <li key={i}>{handle_obj[handle]}</li>)}
                </ul>
                <hr className='hr'/>
                <h1>{this.props.name} does not follow you on: </h1>
                <ul>
                    {this.props.notFollowed.map((notHandle, i) => <li key={i}>{handle_obj[notHandle]}</li>)}
                </ul>
            </div>
        )
    }
}