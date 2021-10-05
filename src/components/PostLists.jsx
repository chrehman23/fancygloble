import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal } from 'react-bootstrap'

import Comments from './Comments';
import Emojis from './Emojis';
import PostSound from '../../public/assets/sounds/post_sound.mp3'
import ACTIONS from '../store/actions/index.js';
import PostApi from '../api/Posts';
import Postview from '../components/Postview';
import Load from '../components/Load';
import moment from 'moment'

import Createpost from '../components/Createpost';
import avatar from '../../public/assets/images/user.png';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import defaultProfilePhoto from '../../public/assets/images/user.png'

export class PostLists extends Component {
   constructor() {
      super();
      this.state = {
         postApiLoader: false,
         posts: [],
         noPost: false,

         PostViewModal: false,
         postModalDetails:{},

         comments: true,
         Emojis: false,
         
         commentsCount: 0,
         purchaseLoader:false,
      }
   }

   componentDidMount() {


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
            localStorage.setItem('post_page', pageNum + 1)
            if (res.data.posts.length == 0 && res.data.posts.length < 10) {
               this.setState({ noPost: true })
            }

            if (pageNum > 1) {
               this.props.newPosts(res.data.posts)
            } else {
               this.props.addPosts(res.data.posts)
            }

         } else {
            console.log("Posts api error.")
         }
      })
   }

   modalPostView = (post) => {
      console.log(post)
      this.setState({
          PostViewModal: true,
         postModalDetails:post
       })
   }
   updateComentsCount=()=>{
      this.setState({ commentsCount: this.state.commentsCount+1})
   }


   purchasePost = (postId) => {
      if (postId) {
         let data = {
            post_id: postId
         } 
         PostApi.purchasePost(data).then(res => {
            console.log(res.data)
            if (res.data.Error == false) {
               this.props.addPaidPost(res.data.paidPost)
               this.setState({ purchaseLoader: true })
               setTimeout(() => {
                  this.setState({ purchaseLoader: false })
               }, 10);
               new Audio(PostSound).play();
               let notification = {
                  name: res.data.paidPost.created_by.name,
                  profile: res.data.paidPost.created_by.profile_photo,
                  des: res.data.msg,
                  time: new Date()
               }
               this.props.addnotificaions(notification)
            } 
         }).catch(error => {
            this.setState({ purchaseLoader: false })
            console.log(error)
         })
      }

   }
   render() {
      return (
         <>
            <Createpost scrolHight={100} />


            {!this.state.purchaseLoader && this.props.Posts.map(data => {
               return (
                  <Postview
                     purchasePost={this.purchasePost}
                     modalPostView={this.modalPostView}
                     id={data._id}
                     key={data._id}
                     allData={data}
                     postvideo={data.url_status}
                     postimage={data.post_images}
                     avater={data.created_by && data.created_by.profile_photo ? `${data.created_by && data.created_by.profile_photo}` : avatar}
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


            {/* post View Modal  */}
            <Modal
               show={this.state.PostViewModal}
               size='xl'
               onHide={() => this.setState({ PostViewModal: false })}
               dialogClassName="modal-90w"
               aria-labelledby="example-custom-modal-styling-title"
            >
               <Modal.Header>
                  <div className='postModalHeader'>
                     <div>
                        <div><img src={this.state.postModalDetails && this.state.postModalDetails.posted_by && this.state.postModalDetails.posted_by.profile_photo !== "" ? `${this.state.postModalDetails.posted_by.profile_photo}` : defaultProfilePhoto } alt='Image' /></div>
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
                           <div className='col-md-8'>
                              {this.state.postModalDetails && this.state.postModalDetails.image_status  && (
                                 <div className='postModalSlider'>
                                    <Carousel
                                       autoPlay={false}
                                    >
                                       {this.state.postModalDetails.post_images.map((data,index)=>{
                                          return(
                                             <div>
                                                <img src={`${data.picture}`} />
                                             </div>
                                          )
                                       })}
                                       
                                    </Carousel>
                                 </div>

                              )}
                              </div>
                           <div className='col-md-4'>
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


         </>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(PostLists)
