import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PostOpening from '../Components/PostOpening';
import {getUserData} from '../redux/actions/userAction';
import loader from '../assets/ajax-loader-blue.gif';
import './Page Styles/AuthDashboard.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export class AuthDashboard extends Component {
    constructor(){
        super();
        this.state = {
            editState: false,
            company: '',
            role: '',
            location: '',
            currency: '',
            ctc: '',
            description: '',
            skills: [],
            postId: ''
        }
    }
    handler = () => {
        this.setState({
            editState: false,
            company: '',
            role: '',
            location: '',
            currency: '',
            ctc: '',
            description: '',
            skills: [],
            postId: ''
        });
    }
    componentWillMount(){
        console.log('hi');
        this.props.getUserData();
        setTimeout(() => {
                if(!this.props.user.authenticated){
                    window.location.href = '/';
                }
        }, 2000)
     }
     pushHistory = (id, e) => {
         if(!e.target.classList.contains('edit-post')){
            this.props.history.push(`/jobs/${id}`);
         }
     }
     toggleEdit = x => {
         this.setState({
             editState: true,
             company: x.company,
             role: x.role,
             location: x.location,
             currency: x.currency,
             ctc: x.ctc,
             description: x.description,
             skills: x.skills,
             postId: x.postId
         });
     }
    render() {
        const {user: {authenticated, message, loading}} = this.props;
        return (
           <div className="overflow-check">
           {
               authenticated
               ?
              <div>
                <Navbar/>
                <div className="user-dashboard-container">
                    <div className="user-posts-wrapper">
                        {
                           (message.posts && !loading)
                           ?
                           (message.posts.length > 0)
                           ?
                           <div className="user-posts">
                               <div className="heading-wrapper">
                                <h3 className="user-heading">My Job Postings</h3>
                               </div>
                               <div className="post-container">
                                    {
                                        message.posts.map(x => {
                                            return(
                                                <div className="single-post-wrapper" key={x.postId} onClick={(e) => this.pushHistory(x.postId, e)}>
                                                    {
                                                        <div>
                                                            <span className="edit-post" onClick={() => this.toggleEdit(x)}>Edit</span>
                                                            <h3>{x.role}</h3>
                                                            <h5>{x.company}</h5>
                                                            <div className="location">
                                                                Location: <span>{x.location}</span>
                                                            </div>
                                                            <div className="ctc">
                                                                Compensation :
                                                                <span className="currency"> {x.currency}</span>
                                                                <span>{x.ctc}</span>
                                                            </div>
                                                            <div className="post-author">
                                                                <span className="img-avatar">
                                                                    <img src={x.imgUrl} alt="avatar" width="30px"/>
                                                                </span>
                                                                <span className="dayjs">Posted by {x.createdBy} {dayjs(x.createdAt).fromNow()}</span>
                                                            </div>
                                                       </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                               </div>
                           </div>
                           :
                           <h3>You have not posted any jobs yet</h3>
                           :
                           <div className="loading-posts">
                               <h3>Loading Posts...</h3>
                                <img src={loader} alt="loading"/>
                           </div>
                        }
                    </div>
                    <PostOpening editState={this.state.editState} form={this.state} handler={this.handler}/>
                </div>
              </div>
              :
              <h3>redirect</h3>
           }
           </div>
        )
    }
}


AuthDashboard.propTypes = {
    user: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {getUserData})(AuthDashboard);
