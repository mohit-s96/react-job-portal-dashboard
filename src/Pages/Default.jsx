import React, { Component } from "react";
import "./Page Styles/Default.css";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export class Default extends Component {
  render() {
    return (
      <div className="default-page-container">
        <Navbar />
        <div className="banner-update">
          Hello to anyone who stumbled on this page, I hope you're doing good.
          Idk how you got here but I'd like to inform you that I don't work on
          this anymore. Infact I haven't done so for about half an year now.
          There were a lot of things that could've improved but I just don't
          have the time needed. If you are a recruiter and want to look at
          something I have worked on recently then head over to{" "}
          <a href="https://whiner2-82d5e.web.app/"> Whiner App. </a>It is what I
          usually work on in my spare time.
        </div>
        <div className="default-hero-area">
          <div className="default-main-heading">
            Welcome To <b>Best Jobs</b>
          </div>
          <div className="default-sub-content">
            <div className="small-heading">
              <b>{">"}</b> Search for Jobs
            </div>
            <div className="small-heading">
              <b>{">"}</b> Post a Job Opening
            </div>
          </div>
        </div>
        <div className="default-registration-wrapper">
          <h3 className="heading">Join if you are a recruiter</h3>
          <Link to="/login">
            <button className="big-btn login-btn">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="big-btn signup-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Default;
