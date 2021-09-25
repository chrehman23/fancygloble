import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Friends from '../components/Friends';
import Contacts from '../components/Contacts';
import Group from '../components/Group';
import Events from '../components/Events';

import Memberslider from '../components/Memberslider';
import Friendsilder from '../components/Friendsilder';
import Storyslider from '../components/Storyslider';
import Postview from '../components/Postview';
import Load from '../components/Load';
import Profilephoto from '../components/Profilephoto';

import PostApi from '../api/Posts';

import moment from 'moment'

import PostLists from '../components/PostLists'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      postApiLoader: false,
      posts: [],
      noPost:false
    }

    // *************************

  }
  componentDidMount() {

    let token = localStorage.getItem("token")
    if (!token) {
      this.props.history.push("/login")
    }
    // window.scrollTo(0, 0)
  
  }

 






  render() {
    return (
      <Fragment>
        <Header />
        <Leftnav />
        <Rightchat />
        <div className="main-content right-chat-active">
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <div className="row feed-body">
                <div className="col-xl-8 col-xxl-9 col-lg-8">
                  {/* <Storyslider /> */}
                  {/* <Memberslider /> */}
                 

                  <PostLists/>
              
                
                  




                 
                  <br></br>
                  <br></br>

                  {/* <Postview
                    id="31"
                    postvideo=""
                    postimage="post.png"
                    avater="user.png"
                    user="David Goria"
                    time="22 min ago"
                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                  />
                  <Postview
                    id="33"
                    postvideo=""
                    postimage="post.png"
                    avater="user.png"
                    user="Anthony Daugloi"
                    time="2 hour ago"
                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                  /> */}



                </div>
                <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                  <Friends />
                  {/* <Contacts /> */}
                  {/* <Group /> */}
                  {/* <Events /> */}
                  {/* <Profilephoto posts={this.state.posts} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Popupchat />
        <Appfooter />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Posts: state.Posts,
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      addPosts: (data) => {
        dispatch(ACTIONS.addPosts(data))
      },
      newPosts: (data) => {
        dispatch(ACTIONS.newPosts(data))
      },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))


