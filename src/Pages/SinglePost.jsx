import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Navbar from '../Components/Navbar';
import {getOnePost} from '../redux/actions/userAction';
import loader from '../assets/ajax-loader-blue.gif';
import './Page Styles/SinglePost.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export class SinglePost extends Component {
    componentWillMount(){
        this.props.getOnePost(this.props.match.params.jobid);
     }
    render() {
        let x = this.props.user.data;
        return (
           <div>
                <Navbar/>
            <div className="single-post-view-wrapper">
                {
                    this.props.user.loading
                    ?
                    <div><img src={loader} alt="loading"/></div>
                    :
                    <div className="one-post-wrapper">
                        {
                            this.props.user.data.role
                            ?
                            <div>
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
                                <h3>Skills : </h3>
                                <div className="skills-required"> 
                                    {
                                        x.skills.map(a => {
                                            return(
                                                <div className="skill-item" key={Math.random()*10000000}>
                                                    {a}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="job-desc">
                                    Description :
                                    <div className="desc">
                                        {
                                            x.description
                                        }
                                    </div> 
                                </div>
                                <div className="post-author">
                                    <span className="img-avatar">
                                        <img src={x.imgUrl} alt="avatar" width="30px"/>
                                    </span>
                                    <span className="dayjs">Posted by {x.createdBy} {dayjs(x.createdAt).fromNow()}</span>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>
                }
            </div>
           </div>
        )
    }
}

SinglePost.propTypes = {
    user: PropTypes.object.isRequired,
    getOnePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    getOnePost
}

export default connect(mapStateToProps, mapActionsToProps)(SinglePost);
