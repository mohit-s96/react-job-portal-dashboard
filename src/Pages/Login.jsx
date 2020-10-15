import React, { Component } from 'react';
import './Page Styles/Login.css';
import loader from '../assets/ajax-loader-blue.gif';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction';
// import {Helmet} from 'react-helmet';


export class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            response: {},
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.ui.errors){
            this.setState({errors: nextProps.ui.errors});
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value
        })
    }
    render() {
        const {errors} = this.state;
        const {ui: {loading}} = this.props;
        return (
            <div className="login-wrapper">
                <div className="login-main">
                    <div className="login-header">
                        <h3 className="login-h3">Login to Best Jobs</h3>
                    </div>
                   <div className="form-wrapper">
                   <form action="#" className="login-form" onSubmit={this.handleSubmit}>
                        <input type="text" className="register" id="email" onChange={this.handleChange}/>
                        <label htmlFor="email" className="login-label">E-mail</label>
                        <div className="login-error">{(errors.email) ? errors.email : null}</div>
                        <input type="password" className="register" id="password" onChange={this.handleChange}/>
                        <label htmlFor="password" className="login-label">Password</label>
                        <div className="login-error">{(errors.password) ? errors.password : null}</div>
                        <div className="btn-login">
                        {loading ? (<button className="login-button" type="submit"><img src={loader} alt="loading"/></button>) : (<button className="login-button" type="submit">Login</button>)}
                        </div>
                         <div className="general-error">{(errors.general) ? errors.general : null}</div>
                    </form>
                   </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    ui: PropTypes.object.isRequired,
    // user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    // user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login);
