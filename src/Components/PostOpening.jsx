import React, { Component } from 'react';
import './Component Styles/PostOpening.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postOneJob, updatePost} from '../redux/actions/userAction';
import {key, url} from '../util/env';
import throttle from '../util/throttle';

export class PostOpening extends Component {
    constructor(){
        super();
        this.state = {
            company: '',
            role: '',
            location: '',
            currency: '',
            ctc: '',
            description: '',
            skills: [],
            autoComplete: []
        }
    }
    componentWillReceiveProps(props){
        this.resetState();
        this.setState({
            company: props.form.company,
            role: props.form.role,
            location: props.form.location,
            currency: props.form.currency,
            ctc: props.form.ctc,
            description: props.form.description,
            skills: props.form.skills,
        });
    }
    resetState = () => {
        this.setState({
            company: '',
            role: '',
            location: '',
            currency: '',
            ctc: '',
            description: '',
            skills: [],
            autoComplete: []
        });
    }
    addSkills = (e) => {
        e.persist();
        e.preventDefault();
        this.setState({
            skills: [...this.state.skills, e.target.previousElementSibling.value]
        }, () => {e.target.previousElementSibling.value = ''})
    }
    removeSkill = e => {
        let x = e.target.textContent;
        let skills = this.state.skills;
        skills = skills.filter(a => a !== x);
        this.setState({
            skills: skills
        });
    }
    handleChange = e => {
       if(e.target.value.trim().length >= 0){
        this.setState({
            [e.target.id]: e.target.value
        })
       }
    }
    addPostList = (e) => {
        e.preventDefault();
        const body = this.state;
        // this.props.postOneJob(body);
        console.log(body);
    }
    getLocation = async (requestUrl) => {
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    }
    getAutoComplete = (e) => {
        this.setState({
            location: e.target.value
        })
        if(e.target.value === ''){
            this.setState({
                autoComplete: []
            })
        }
        if(e.target.value.trim().length > 1){
            this.setState({
                autoComplete: []
            })
            const cities = [];
            const query = e.target.value;
            const endPoint = '/locations/v1/cities/autocomplete';
            const requestUrl = `${url}${endPoint}?apikey=${key}&q=${query}`;
            this.getLocation(requestUrl).then((data)=>{
                data.forEach((x, i) => {
                    if(i <= 6){
                        cities.push(x.LocalizedName);
                    }
                });
                this.setState({
                    autoComplete: cities
                });
            }).catch((err)=>{
                console.log(err.message);
            });
        }
    }
    changeLocation = city => {
        this.setState({
            location: city,
            autoComplete: []
        }, () => {
            document.getElementById('location').value = this.state.location;
        });
    }
    updatePostList = (id, e) => {
        e.preventDefault();
        let body = {};
        body.postId = id;
        body.company = this.state.company;
        body.role = this.state.role;
        body.location = this.state.location;
        body.currency = this.state.currency;
        body.ctc = this.state.ctc;
        body.description = this.state.description;
        body.skills = this.state.skills;
        this.props.updatePost(body);
        this.props.handler();
    }
    render() {
        return (
            <div className="post-form-container">
                <div className="form-heading">
                    <h3>Post a new job opening</h3>
                </div>
                <div className="form-container">
                    <form action="" className="post-form">
                       <div className="inputs">
                       <input className="form-item" type="text" placeholder="Company" id="company" value={this.state.company!==''?this.state.company:''} onChange={this.handleChange}/>
                        <input className="form-item" type="text" placeholder="Role" id="role" value={this.state.role!==''?this.state.role:''} onChange={this.handleChange}/>
                        <input className="form-item" type="text" placeholder="Location" id="location" value={this.state.location!==''?this.state.location:''} onChange={throttle(this.getAutoComplete, 40)}/>
                        <div className="autocomplete">
                          
                           {
                                
                                (this.state.autoComplete.length > 0)
                                ?
                                <div className="auto-container">
                                    {
                                         this.state.autoComplete.map(x => 
                                            <div key={Math.random()*1000000000} onClick={(e) => this.changeLocation(x)}>
                                             {x}
                                             </div>)
                                    }
                               
                                </div>
                                :
                                null
                            }
                        </div>
                        <input className="form-item" type="text" placeholder="Currency" id="currency" value={this.state.currency!==''?this.state.currency:''} onChange={this.handleChange}/>
                        <input className="form-item" type="number" placeholder="CTC" id="ctc" value={this.state.ctc!==''?this.state.ctc:''} onChange={this.handleChange}/>
                        <input className="form-item" type="text" placeholder="Job Description" id="description" value={this.state.description!==''?this.state.description:''} onChange={this.handleChange}/>
                       </div>
                       <div className="skill-form-wrapper">
                            <div className="skills-container">
                                {
                                    (this.state.skills.length > 0)
                                    ?
                                    this.state.skills.map(x => {
                                        return(
                                            <div className="skill-item" key={Math.random()*10000000000000 } onClick={this.removeSkill}>{x}</div>
                                        )
                                    })
                                    :
                                    <div>No skills added yet</div>
                                }
                            </div>
                            <input type="text" className="add-skill" placeholder="Add a skill..."/>
                            <button className="skill-btn" onClick={this.addSkills}>Add Skill</button>
                        </div>
                       <div className="submit-wrapper">
                        {
                            (!this.props.editState)
                            ?
                                this.props.user.postLoading
                                ?
                                <button type="submit" className="submit-btn submit-btn-gray" onClick={this.addPostList}>Post Job</button>
                                :
                                <button type="submit" className="submit-btn" onClick={this.addPostList}>Post Job</button>
                            :
                                <button type="submit" className="submit-btn" onClick={(e) => this.updatePostList(this.props.form.postId, e)}>Update Job</button>
                        }
                       </div>
                    </form>
                </div>
            </div>
        )
    }
}

PostOpening.propTypes = {
    user: PropTypes.object.isRequired,
    postOneJob: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    postOneJob,
    updatePost
}

export default connect(mapStateToProps, mapActionsToProps)(PostOpening);
