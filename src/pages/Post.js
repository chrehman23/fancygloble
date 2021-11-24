import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js.js';
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { Modal } from 'react-bootstrap'
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
import Comments from '../components/Comments';
import moment from 'moment'
import PostSound from '../../public/assets/sounds/post_sound.mp3'
// import PostLists from '../components/PostLists'


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      postApiLoader: true,
      post: {},
      noPost: false,

      PostViewModal: false,
      postModalDetails: {},

      comments: true,
      Emojis: false,

      commentsCount: 0,
    }

    // *************************

  }
  componentDidMount() {

    let token = localStorage.getItem("token")
    if (!token) {
      this.props.history.push("/login")
    }
    // window.scrollTo(0, 0)

    let { id } = this.props.match.params

    PostApi.getPost(id).then(res => {
      console.log(res)
      if (res.data.Error == false) {
        this.setState({
          post: res.data.post,
          postApiLoader: false
        })
      } else {
        this.setState({
          noPost: true,
          postApiLoader: false
        })
      }
    }).catch(error => {
      console.log(error)
      this.setState({
        noPost: true,
        postApiLoader: false
      })
    })

  }

  purchasePost = (data) => {
    this.setState({
      post: data.paidPost
    })
    this.props.addPaidPost(data.paidPost)
    new Audio(PostSound).play();
    let notification = {
      name: data.paidPost.created_by.name,
      profile: data.paidPost.created_by.profile_photo,
      des: data.msg,
      time: new Date()
    }
    this.props.addnotificaions(notification)
  }

  modalPostView = (post) => {
    console.log(post)
    this.setState({
      PostViewModal: true,
      postModalDetails: post
    })
  }

  updateComentsCount = () => {
    this.setState({ commentsCount: this.state.commentsCount + 1 })
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


                  {/* <PostLists/> */}

                  {this.state.noPost && (
                    <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                      <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                        <div className="stage">
                          <p><b>Post not found</b></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!this.state.noPost && this.state.postApiLoader && (<Load />)}
                  {!this.state.noPost && !this.state.postApiLoader && (
                    <Postview
                      purchasePost={this.purchasePost}
                      modalPostView={this.modalPostView}
                      id={this.state.post._id}
                      key={this.state.post._id}
                      allData={this.state.post}
                      postvideo={this.state.post.url_status}
                      postimage={this.state.post.post_images}
                      avater={this.state.post.created_by && this.state.post.created_by.profile_photo ? `${this.state.post.created_by && this.state.post.created_by.profile_photo}` : "assets/images/user.png"}
                      user={this.state.post.posted_by && this.state.post.posted_by.name}

                      time={moment(this.state.post.created_at).fromNow(true)}
                      des={this.state.post.description}
                      commentCount={this.state.post.comments_count}
                    />
                  )}








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

        {/* post View Modal  */}
        <Modal
          show={this.state.PostViewModal}
          size='xl'
          scrollable={true}
          scrollable={true}
          onHide={() => this.setState({ PostViewModal: false })}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <div className='postModalHeader'>
              <div>
                <div><img src={this.state.postModalDetails && this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.profile_photo} alt='Image' /></div>
                <div>
                  <h4>{this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.name}</h4>
                  <small>{this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.user_name}</small>
                </div>
              </div>
              <div>
                <p className='text-grey-500'>{moment(this.state.postModalDetails && this.state.postModalDetails.created_at).fromNow(true)} ago</p>
              </div>
            </div>

          </Modal.Header>
          <Modal.Body>
            {this.state.PostViewModal && (
              <div className='postmodalContainer'>
                {/* {JSON.stringify(this.state.postModalDetails)} */}
                <div className='row'>
                  <div className='col-lg-8'>
                    {this.state.postModalDetails && this.state.postModalDetails.image_status && (
                      <div className='postModalSlider'>
                        <Carousel
                          autoPlay={false}
                        >
                          {this.state.postModalDetails.post_images.map((data, index) => {
                            return (
                              <div>
                                <img src={`${data.picture}`} />
                              </div>
                            )
                          })}

                        </Carousel>
                      </div>

                    )}
                  </div>
                  <div className='col-lg-4'>
                    <p><b>Comments({this.state.postModalDetails && this.state.postModalDetails.comments_count + this.state.commentsCount})</b></p>
                    {this.state.comments && (
                      <Comments
                        _id={this.state.postModalDetails._id}
                        // comments={this.props.comments}
                        updateComentsCount={this.updateComentsCount}
                      />
                    )}
                    {/* {this.state.Emojis && (
                                 <Emojis _id={this.state.postModalDetails._id} />
                              )} */}
                  </div>
                </div>
              </div>

            )}
          </Modal.Body>
        </Modal>
        {/* ******************************************* */}

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
    addPaidPost: (data) => {
      dispatch(ACTIONS.addPaidPost(data))
    },
    addnotificaions: (data) => {
      dispatch(ACTIONS.addnotificaion(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))


