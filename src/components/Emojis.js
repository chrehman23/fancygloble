import React, { Component } from 'react';
import PostApi from '../api/Posts'
import ApiLoader from './ApiLoader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js.js';

import icon1 from '../../public/assets/iconss/1.svg'
import icon2 from '../../public/assets/iconss/2.svg'
import icon3 from '../../public/assets/iconss/3.svg'
import icon4 from '../../public/assets/iconss/4.svg'
import icon5 from '../../public/assets/iconss/5.svg'

import moment from 'moment'
class Emojis extends Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false,
            emoji_list: [],
            emojiloader: false,
            pageNum: 1,
            noMoreEmojis: false,
        };

    }



    componentDidMount() {
        this.getEmojisComments()
    }

    getEmojisComments = () => {
        let data = {
            post_id: this.props._id,
            page: this.state.pageNum,
        }
        this.setState({ emojiloader: true })
        PostApi.emojisByPost(data).then(res => {
            console.log(res.data)
            // this.props.addcomments({
            //     post_id: this.props._id ,
            //     comments:res.data.comments
            // })
            if (res.data.emoji_list.length == 0 || res.data.emoji_list.length < 10) {
                this.setState({ noMoreEmojis: true })
            }

            this.setState({
                emoji_list: this.state.emoji_list.concat(res.data.emoji_list),
                emojiloader: false,
                pageNum: this.state.pageNum + 1
            })
        }).catch(error => {
            console.log(error)
        })
    }





    render() {

        return (
            <>


                <div className='border-dashed mt-2 pt-2'>

                    {!this.state.emojiloader && this.state.emoji_list && !this.state.emoji_list.length && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>No Reaction found</div>
                    )}
                    {/* <pre> {JSON.stringify(this.state.comments, null, 2)}</pre> */}

                    {this.state.emoji_list.map(data => {
                        return (
                            <div className='px-2'>
                                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3"  >
                                    <img src={data.emoji_by && data.emoji_by.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${data.emoji_by && data.emoji_by.profile_photo}` : "assets/images/user.png"} alt="user" class="w40 position-absolute left-0" />
                                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                        {data.emoji_by && data.emoji_by.name}


                                        <span class="text-grey-400 font-xsssss fw-600 float-right mt-1 text-capitalize ">{moment(data.created_at).fromNow(true)} Ago </span>
                                    </h5>
                                    {/* <h6 class="text-grey-500 fw-500 font-xssss lh-4 d-flex align-items-center emojiImages"> */}
                                        {/* ***************************************************************** */}
                                     
                                        {data.reaction_id == 1 && (<img src={icon1} className='emojiImages' alt='icon' />)}
                                        {data.reaction_id == 2 && (<img src={icon2} className='emojiImages' alt='icon' />)}
                                        {data.reaction_id == 3 && (<img src={icon3} className='emojiImages' alt='icon' />)}
                                        {data.reaction_id == 4 && (<img src={icon4} className='emojiImages' alt='icon' />)}
                                        {data.reaction_id == 5 && (<img src={icon5} className='emojiImages' alt='icon' />)} 
                                        {/* ***************************************************************** */}
                                        {/* <span className='mt-1  ml-2' >  </span> */}
                                        {/* </h6> */}
                                </div>
                            </div>
                        )
                    })}

                    {/* ********************************* */}
                    {this.state.emojiloader && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>Loading....</div>
                    )}
                    {/* ********************************* */}
                    {!this.state.noMoreEmojis && !this.state.emojiloader && this.state.emoji_list && this.state.emoji_list.length >= 10 && (
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3 cursor-pointer'
                            onClick={() => {
                                this.getEmojisComments()
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

        // addcomments: (data) => {
        //     dispatch(ACTIONS.addcomments(data))
        // },
        // addcomment: (data) => {
        //     dispatch(ACTIONS.addcomment(data))
        // },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Emojis))