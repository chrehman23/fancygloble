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
  
    if (this.props.Posts.length == 0) {
      localStorage.setItem("post_page", 1)
      this.getPosts()
    }

  }

  getPosts = () => {
    this.setState({ postApiLoader: true });
    let pageNum = parseInt(localStorage.getItem('post_page'))
    let data = {
      page: pageNum
    }
    PostApi.getPostsByuser(data).then(res => {
      if (res.data.Error == false) {
        this.setState({
          postApiLoader: false,
        })
        localStorage.setItem('post_page', pageNum+1)
        if (res.data.posts.length == 0 && res.data.posts.length < 10){
          this.setState({ noPost:true})
        }
       
        if (pageNum>1){
          this.props.newPosts(res.data.posts)
        }else{
          this.props.addPosts(res.data.posts)
        }
       
      } else {
        console.log("Posts api error.")
      }
    })
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
                  <Createpost scrolHight={100} />
              
                  {this.props.Posts.map(data => {
                    return (
                      <Postview
                        id={data._id}
                        key={data._id}
                        allData={data}
                        // postvideo="https://youtu.be/c3C8yCkVApE"
                        postimage={data.post_images && data.post_images[0] && data.post_images[0].picture}
                        avater={data.created_by && data.created_by.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${data.created_by && data.created_by.profile_photo}` : "assets/images/user.png"}
                        user={data.posted_by && data.posted_by.name}

                        time={moment(data.created_at).fromNow(true)}
                        des={data.description}
                        commentCount={data.comments_count}
                      // comments={data.comments}
                      />
                    )
                  })}

                  {this.state.postApiLoader && (<Load />)}

                  {!this.state.noPost && !this.state.postApiLoader && (
                    
                     <div
                      onClick={this.getPosts}
                     className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                      <div className="snippet cursor-pointer mt-2 ms-auto me-auto" data-title=".dot-typing">
                        <div className="stage">
                          Load more posts
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.noPost && (
                    <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                      <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                        <div className="stage">
                         No more post found.
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
      newPosts: (data) => {
        dispatch(ACTIONS.newPosts(data))
      },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))


