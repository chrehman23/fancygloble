import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../store/actions/index.js";
import { Link, withRouter } from "react-router-dom";
import image from "../../public/assets/images/logIcon.png";

class Appfooter extends Component {
  render() {
    return (
      <div className="border-0 shadow-lg app-footer bg-primary-gradiant ">
        <Link to="/home" className="nav-content-bttn nav-center">
          <i className="feather-home"></i>
        </Link>
        <Link to="/courses" className="nav-content-bttn">
          <i className="fal fa-book"></i>
        </Link>
        <Link to="/users" className="nav-content-bttn" data-tab="chats">
          <i className="fal fa-globe-europe"></i>
        </Link>
        <Link to="/defaultmessage" className="nav-content-bttn">
          <i className="fad fa-comments-alt"></i>
        </Link>
        <Link to="/userpage" className="nav-content-bttn ">
          <img
            src={
              this.props.user_profile && this.props.user_profile.profile_photo
            }
            alt="user"
            className="w30 shadow-xss mobile-profile"
          />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_profile: state.UserProfile.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePosts: (data) => {
      dispatch(ACTIONS.removePosts(data));
    },
    loadProfile: (data) => {
      dispatch(ACTIONS.loadProfile(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Appfooter));
