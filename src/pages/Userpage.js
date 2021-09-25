import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js';

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Profiledetail from '../components/Profiledetail';
import Profilephoto from '../components/Profilephoto';
import ProfilecardThree from '../components/ProfilecardThree';
import Createpost from '../components/Createpost';
import Events from '../components/Events';
import Postview from '../components/Postview';
import Load from '../components/Load';
import moment from 'moment'



import PostLists from '../components/PostLists'
class Userpage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {
        return (
            <Fragment>

                <Header />
                <Leftnav />
                <Rightchat />

                {this.props.ProfileLoading && (
                    <>
                        <div className="main-content right-chat-active">
                            <div className="middle-sidebar-bottom">
                                <div className="middle-sidebar-left pe-0">
                                    <Load />
                                    {/* {JSON.stringify(this.props.Profile,null,2)} */}
                                </div>
                            </div>
                        </div>
                    </>)}

                {!this.props.ProfileLoading && (
                    <div className="main-content right-chat-active">
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left pe-0">
                                <div className="row">
                                    <div className="col-xl-12 mb-3">
                                        <ProfilecardThree Profile={this.props.Profile} />
                                    </div>
                                    <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                        <Profiledetail about={this.props.Profile.about} />
                                        <Profilephoto />
                                        <Events />
                                    </div>
                                    <div className="col-xl-8 col-xxl-9 col-lg-8">
                                        <PostLists/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                )}

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Popupchat />
                <Appfooter />

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ProfileLoading: state.UserProfile.loading,
        Profile: state.UserProfile.profile,
        ProfileFriends: state.UserProfile.firends,
        Posts: state.Posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPosts: (data) => {
            dispatch(ACTIONS.addPosts(data))
        },
        createPost: (data) => {
            dispatch(ACTIONS.addPost(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Userpage))