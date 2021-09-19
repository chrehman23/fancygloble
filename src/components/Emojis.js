import React, { Component } from 'react';
import PostApi from '../api/Posts'
import ApiLoader from './ApiLoader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js.js';



import moment from 'moment'
class Emojis extends Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false,
            emoji_list: [],
            emojiloader: true,

        };

    }



    componentDidMount() {
        let data = {
            post_id: this.props._id
        }
        PostApi.emojisByPost(data).then(res => {
            console.log(res.data)
            // this.props.addcomments({
            //     post_id: this.props._id ,
            //     comments:res.data.comments
            // })

            this.setState({ emoji_list: res.data.emoji_list, emojiloader: false })
        }).catch(error => {
            console.log(error)
        })
    }





    render() {

        return (
            <>


                <div className='border-dashed mt-2 pt-2'>
                    {this.state.emojiloader && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>Loading....</div>
                    )}
                    {!this.state.emojiloader && this.state.emoji_list && !this.state.emoji_list.length && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>No Reaction found</div>
                    )}
                    {/* <pre> {JSON.stringify(this.state.comments, null, 2)}</pre> */}

                    {!this.state.emojiloader && this.state.emoji_list.map(data => {
                        return (
                            <div className='px-2'>
                                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3"  >
                                    <img src={data.emoji_by && data.emoji_by.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${data.emoji_by && data.emoji_by.profile_photo}` : "assets/images/user.png"} alt="user" class="w40 position-absolute left-0" />
                                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                        {data.emoji_by && data.emoji_by.name} 
                                      
                                       
                                        <span class="text-grey-400 font-xsssss fw-600 float-right mt-1 text-capitalize ">{moment(data.created_at).fromNow(true)} Ago </span>
                                    </h5>
                                    <h6 class="text-grey-500 fw-500 font-xssss lh-4 d-flex align-items-center">
                                        {/* ***************************************************************** */}
                                        {data.reaction_id == 1 && (<i className="em em---1"></i>)}
                                        {data.reaction_id == 2 && (<i className="em em-angry"></i>)}
                                        {data.reaction_id == 3 && (<i className="em em-anguished"></i>)}
                                        {data.reaction_id == 4 && (<i className="em em-astonished"></i>)}
                                        {data.reaction_id == 5 && (<i className="em em-blush"></i>)}
                                        {data.reaction_id == 6 && (<i className="em em-clap"></i>)}
                                        {data.reaction_id == 7 && (<i className="em em-cry"></i>)}
                                        {data.reaction_id == 8 && (<i className="em em-full_moon_with_face"></i>)}
                                        {/* ***************************************************************** */}
                                        <span className='mt-1  ml-2' >  </span></h6>
                                </div>
                            </div>
                        )
                    })}

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

        // addcomments: (data) => {
        //     dispatch(ACTIONS.addcomments(data))
        // },
        // addcomment: (data) => {
        //     dispatch(ACTIONS.addcomment(data))
        // },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Emojis))