import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Navbar from '../Components/Navbar';
import {searchJobs} from '../redux/actions/userAction';
import './Page Styles/SearchJobs.css';
import loader from '../assets/ajax-loader-blue.gif';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export class SearchJobs extends Component {
    componentWillMount(){
        let job = this.props.match.params.key;
        this.props.searchJobs(job);
    }
    pushHistory = (id, e) => {
        this.props.history.push(`/jobs/${id}`);
    }
    render() {
        let list = this.props.jobs;
        return (
            <div>
                <Navbar/>
                <div className="search-page-wrapper">
                    {
                        this.props.loading
                        ?
                        <div className="single-post-view-wrapper">
                             <div><img src={loader} alt="loading"/></div>
                        </div>
                        :
                        (list.length > 0)
                        ?
                        <div>
                        <div className="search-header">{list.length} jobs found for "{this.props.match.params.key}"</div>
                        <div className="post-container search-post-container">
                                    {
                                        list.map(x => {
                                            return(
                                                <div className="single-post-wrapper search-post" key={x.postId} onClick={(e) => this.pushHistory(x.postId, e)}>
                                                    {
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
                        <div className="single-post-view-wrapper"><b>Invalid Search or something went wrong</b></div>
                    }
                </div>
            </div>
        )
    }
}

SearchJobs.propTypes = {
    jobs: PropTypes.array.isRequired,
    searchJobs: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    publicErrors: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    jobs: state.user.jobs,
    loading: state.user.loading,
    publicErrors: state.ui.publicErrors
});

const mapActionsToProps = {
    searchJobs
}

export default connect(mapStateToProps, mapActionsToProps)(SearchJobs);
