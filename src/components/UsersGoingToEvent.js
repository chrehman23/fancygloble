import React, { Component } from 'react';
import EventsApi from '../api/Events'

import defalultImage from '../../public/assets/images/user.png'
import moment from 'moment'

class UsersGoingToEvent extends Component {
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
            event_id: this.props._id,
            page: this.state.pageNum,
        }
        this.setState({ emojiloader: true })
        EventsApi.usersGoingToEvent(data).then(res => {
            console.log(res.data)
            // this.props.addcomments({
            //     post_id: this.props._id ,
            //     comments:res.data.comments
            // })
            if (res.data.going_users.length == 0 || res.data.going_users.length < 10) {
                this.setState({ noMoreEmojis: true })
            }

            this.setState({
                emoji_list: this.state.emoji_list.concat(res.data.going_users),
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
                        <div className='text-grey-500 fw-500 font-xssss lh-4 pr-2 text-center my-3'>No User found.</div>
                    )}
                    {/* <pre> {JSON.stringify(this.state.emoji_list, null, 2)}</pre> */}

                    {this.state.emoji_list.map(data => {
                        return (
                            <div className='px-2'>
                                <div class="card bg-transparent-card w-100 border-0 ps-5 mb-3"  >
                                    <img src={data.user_id && data.user_id.profile_photo ? `${data.user_id && data.user_id.profile_photo}` : defalultImage} alt="user" class="w40 position-absolute left-0" />
                                    <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                        {data.user_id && data.user_id.name}

                                        <span class="text-grey-400 font-xsssss fw-600 float-right mt-1 ">{moment(data.created_at).fromNow(true)} ago </span>
                                    </h5>
                                    {/* <h6 class="text-grey-500 fw-500 font-xssss lh-4 d-flex align-items-center emojiImages"> */}
                                        {/* ***************************************************************** */}
                                     
                                       
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




 


 
export default UsersGoingToEvent