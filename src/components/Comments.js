import React, { Component } from 'react';
import PostApi from '../api/Posts'
import ApiLoader from '../components/ApiLoader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js';
import PostSound from '../../public/assets/sounds/post_sound.mp3';

import userDefaultImage from '../../public/assets/images/user.png'


import moment from 'moment'
class Comments extends Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false,
            comments: [],
            commentinput: "",
            commentloader: false,
            commentapi: false,

            commentPage: 1,
            noMoreComments: false,

        };

    }

    commentOnPost = () => {
        if (this.state.commentinput != "") {
            this.setState({ commentapi: true })
            let data = {
                post_id: this.props._id,
                description: this.state.commentinput,
                created_at: new Date(),
            }


            PostApi.commentOnPost(data).then(res => {
                console.log(res.data)
                new Audio(PostSound).play();
                // this.props.addcomment({
                //     post_id: this.props._id,
                //     comments: res.data.comment
                // })
                this.props.updateComentsCount()
                this.setState({
                    comments: [res.data.comment, ...this.state.comments],
                    commentapi: false,
                    commentinput: ""
                })
            }).catch(error => {
                console.log(error)
            })

        }
    }

    componentDidMount() {
        this.getComments()
    }

    getComments = () => {
        let data = {
            post_id: this.props._id,
            page: this.state.commentPage
        }
        this.setState({ commentloader: true })
        PostApi.getCommentsByPost(data).then(res => {
            console.log(res.data)
            // this.props.addcomments({
            //     post_id: this.props._id,
            //     comments: res.data.comments,
            // })
            if (res.data.comments.length == 0 || res.data.comments.length < 10) {
                this.setState({ noMoreComments: true })
            } 
           

            this.setState({
                commentloader: false,
                comments: this.state.comments.concat(res.data.comments),
                commentPage: this.state.commentPage + 1
            })
        }).catch(error => {
            console.log(error)
        })
    }





    render() {

        return (
            <>
                {this.state.commentapi && (
                    <div className='py-2 d-flex justify-content-center'>
                        <ApiLoader />
                    </div>
                )}
                {!this.state.commentapi && (
                    <div className='d-flex mt-2'>
                        <div className='flex-grow-1 pr-2'>
                            <input type="text"
                                value={this.state.commentinput}
                                onChange={(e) => {
                                    this.setState({ commentinput: e.target.value })
                                }}
                                placeholder='Write comment.....'
                                className='commentInput text-grey-500 fw-500 font-xssss lh-4 pr-2' />
                        </div>
                        <div>
                            <button className='btn btn-secondary'
                                onClick={() => {
                                    this.commentOnPost()
                                }}
                            >Comment</button>
                        </div>
                    </div>

                )}
                <div className='border-dashed mt-2 pt-2'>
                    {/* {this.props._id} */}
                    {/* {JSON.stringify(this.state.comments,null,2)} */}



                    {!this.state.commentloader && this.state.comments && !this.state.comments.length && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>No Comment found</div>
                    )}
                    {/* <pre> {JSON.stringify(this.state.comments, null, 2)}</pre> */}
                    {this.state.comments.length !==0 && (
                        <div className='commentsContainer'>
                            {this.state.comments.map(data => {
                                return (
                                    <div className='px-2'>
                                        <div class="card bg-transparent-card w-100 align-items-center d-flex flex-row border-0 mb-3"  >
                                            <div className='smImageControlerRs'>
                                                <img src={data.comment_by && data.comment_by.profile_photo ? `${data.comment_by && data.comment_by.profile_photo}` : userDefaultImage} alt="user" className="" />
                                           </div>
                                            <div className='flex-grow-1'> 
                                                <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">{data.comment_by && data.comment_by.name}
                                                    <span class="text-grey-400 font-xsssss fw-600 float-right mt-1 text-capitalize ">{moment(data.created_at).fromNow(true)} Ago
                                                    </span></h5>
                                                    <h6 class="text-grey-500 fw-500 font-xssss lh-4">{data.description}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {/* ************************************** */}
                    {this.state.commentloader && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>Loading....</div>
                    )}
                    {/* ************************************** */}
                    {!this.state.noMoreComments && !this.state.commentloader && this.state.comments && this.state.comments.length >= 10 && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3 cursor-pointer'
                            onClick={() => {
                                this.getComments()
                            }}
                        >Load more</div>
                    )}

                    {/* ************************************** */}

                </div>
            </>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        // Posts: state.Posts,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        addcomments: (data) => {
            dispatch(ACTIONS.addcomments(data))
        },
        addcomment: (data) => {
            dispatch(ACTIONS.addcomment(data))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Comments))