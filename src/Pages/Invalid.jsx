import React, { Component } from 'react';

export class NotFound extends Component {
    render() {
        let id = this.props.match.params.invalid;
        if((id !== 'home' || id !== 'login' || id !== 'signup')){
            return (
                <div> <h3>Page not found</h3></div>
            );
        }
    }
}

export default NotFound
