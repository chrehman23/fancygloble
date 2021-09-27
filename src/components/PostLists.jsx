import React, { Component } from 'react'
import { connect } from 'react-redux'


import ACTIONS from '../store/actions/index.js';
import PostApi from '../api/Posts';
import Postview from '../components/Postview';
import Load from '../components/Load';
import moment from 'moment'

import Createpost from '../components/Createpost';
import avatar from '../../public/assets/images/user.png';



export class PostLists extends Component {
   constructor() {
      super();
      this.state = {
         postApiLoader: false,
         posts: [],
         noPost: false
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
   render() {
      return (
         <>
            <Createpost scrolHight={100} />


            {this.props.Posts.map(data => {
               return (
                  <Postview
                     id={data._id}
                     key={data._id}
                     allData={data}
                     postvideo={data.url_status}
                     postimage={data.post_images}
                     avater={data.created_by && data.created_by.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${data.created_by && data.created_by.profile_photo}` : avatar}
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

   }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostLists)
