import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userAction';
import throttle from '../util/throttle';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Navbar(props) {
    const initialState = [];
    const [keywords, SetKeywords] = useState('');
    const [searchList, SetSearchList] = useState(initialState);
    const setKeywords = (e) => {
        let x = e.target.value;
        SetKeywords(x);
        axios.post('your_public_endpoint/searchlist', {searchWords: x})
             .then(res => {
                 console.log(res.data);
                 SetSearchList([]);
                 SetSearchList([...res.data.autoComplete]);
             })
             .catch(err => console.log(err));
    }
    return (
        <div className="default-nav-wrapper">
            <Link to="/"><span className="home-page-icon">Home</span></Link>
            <input type="text" placeholder="Search Jobs..." onChange={throttle(setKeywords, 25)}/>
            {
                props.authenticated
                ?
                <span className="logout" onClick={() => logout(props)}>Logout</span>
                :
                null
            }
            {
                (keywords === '')
                ?
                null
                :
                <div className="nav-search-container">
                    {
                        (searchList.length > 0)
                        ?
                        searchList.map(x => <Link to={`/search/${x}`}><div className="auto-suggest-item">{x}</div></Link>)
                        :
                        <div className="auto-suggest-item">Loading...</div>
                    }
                </div>
            }
        </div>
    )
}
function logout(props){
    props.logoutUser();
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});
const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
