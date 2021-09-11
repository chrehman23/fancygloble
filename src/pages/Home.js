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
import Createpost from '../components/Createpost';
import Memberslider from '../components/Memberslider';
import Friendsilder from '../components/Friendsilder';
import Storyslider from '../components/Storyslider';
import Postview from '../components/Postview';
import Load from '../components/Load';
import Profilephoto from '../components/Profilephoto';

import PostApi from '../api/Posts';

import moment from 'moment'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      postApiLoader: false,
      // posts: [],
    }

    // *************************

  }
  componentDidMount() {
    let token = localStorage.getItem("token")
    if (!token) {
      this.props.history.push("/login")
    }
    // window.scrollTo(0, 0)

    if (this.props.Posts.length == 0) {
      this.setState({ postApiLoader: true });
      PostApi.getPostsByuser().then(res => {
        if (res.data.Error == false) {
          this.setState({ 
            postApiLoader: false,
          })
          this.props.addPosts(res.data.posts)
        } else {
          console.log("Posts api error.")
        }
      })
    }

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
                  <Createpost scrolHight={100}   />
                  {this.state.postApiLoader && (<Load />)}
                  {!this.state.postApiLoader && this.props.Posts.map(data => {
                    return (
                      <Postview
                        id="32"
                        key={data._id}
                        // postvideo="https://youtu.be/c3C8yCkVApE"
                        postimage={data.post_images && data.post_images[0] && data.post_images[0].picture}
                        avater={data.created_by && data.created_by.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${data.created_by && data.created_by.profile_photo}` : "assets/images/user.png"}
                        user={data.posted_by && data.posted_by.name}

                        time={moment(data.created_at).fromNow(true)}
                        des={data.description}
                        commentCount={data.comments}
                      />
                    )
                  })}


                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
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
                  <Contacts />
                  {/* <Group /> */}
                  <Events />
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
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))


