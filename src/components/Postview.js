import React, { Component } from 'react';
import Comments from './Comments';
import Emojis from './Emojis';
import PostApi from '../api/Posts'
import PostSound from '../../public/assets/sounds/post_sound.mp3';


import BlurBackground from '../../public/assets/images/blur.jpg'

class Postview extends Component {
    state = {
        isOpen: false,
        comments: false,
        Emojis: false,
        commentsCount: 0,
        EmojisCount: 0,
        cardAtive: false,
    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    toggleActive = () => this.setState({ isActive: !this.state.isActive });

    updateComentsCount = () => {
        this.setState({ commentsCount: this.state.commentsCount + 1 })
    }


    emojiOnPost = (emoji_id) => {
        if (this.state.commentinput != "") {
            this.setState({
                EmojisCount: 1, isActive: false
            })
            let data = {
                post_id: this.props.id,
                reaction_id: emoji_id,
                created_at: new Date(),
            }


            PostApi.emojiOnPost(data).then(res => {
                console.log(res.data)
                new Audio(PostSound).play();
                // this.props.addcomment({
                //     post_id: this.props._id,
                //     comments: res.data.comment
                // }) 
                // this.setState({
                //     comments: [res.data.comment, ...this.state.comments],
                //     commentapi: false,
                //     commentinput: ""
                // })
            }).catch(error => {
                console.log(error)
            })

        }
    }

    render() {

        const { user, time, des, avater, postimage, postvideo, id, allData, commentCount } = this.props;

        const menuClass = `${this.state.isOpen ? " show" : ""}`;
        const emojiClass = `${this.state.isActive ? " active" : ""}`;

        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3"><img src={avater} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1 text-capitalize"> {user} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500 text-capitalize"> {time} ago</span></h4>
                    <div className="ms-auto pointer"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></div>

                </div>


                {allData.paid_status && (
                    <>
                        {!this.state.cardAtive && (
                            <div className="card-body d-block p-0 mb-3">
                                <div className="row ps-2 pe-2 position-relative">
                                    <div className="col-sm-12 p-1">
                                        <img src={BlurBackground} className="rounded-3 w-100" alt="post" />
                                    </div>
                                    <div className='paidPostSeciton'
                                        onClick={() => {
                                            this.setState({ cardAtive: true })
                                        }}
                                    >
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <p className='mb-0 fw-500   lh-26 font-xssss'>Paid post €{allData.paid_amount}</p>
                                            <button className='btn btn-bg-primary'>Click to Pay</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                        {this.state.cardAtive && (
                            <div className="card-body d-block p-0 mb-3">
                                <div className="row ps-2 pe-2 position-relative">
                                    <div className="col-sm-12 p-1">
                                        <img src={BlurBackground} className="rounded-3 w-100" alt="post" />
                                    </div>
                                    <div className='paidPostSeciton'>
                                        <div className='d-flex align-items-center flex-column justify-content-center'>
                                            <p className='mb-0 fw-500   lh-26 font-xssss'>Payment amount €{allData.paid_amount}</p>
                                            <div className='w-100'>
                                                <input type='text' className='commentInput text-grey-500 fw-500 font-xssss lh-4 p-2 bg-transparent ' placeholder='xxx xxx xxx xxx' />
                                            </div>
                                            <div className='d-flex'>
                                                <input type='text' className='commentInput text-grey-500 fw-500 font-xssss lh-4 p-2 bg-transparent' placeholder='PIN' />
                                                <input type='text' className='commentInput text-grey-500 fw-500 font-xssss lh-4 p-2 bg-transparent' placeholder='Exp' />
                                            </div>
                                            <div className='text-right w-100'>
                                                <button className='btn btn-primary '>Pay</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </>
                )}
                {!allData.paid_status && (
                    <>
                        {postvideo ?
                            <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
                                <a href="/defaultvideo" className="video-btn">
                                    <video autoPlay loop className="float-right w-100">
                                        <source src={`assets/images/${postvideo}`} type="video/mp4" />
                                    </video>
                                </a>
                            </div>
                            : ''}
                        {postimage ?
                            <div className="card-body d-block p-0 mb-3">
                                <div className="row ps-2 pe-2">
                                    <div className="col-sm-12 p-1"><img src={`${process.env.REACT_APP_BASE_URL}/${postimage}`} className="rounded-3 w-100" alt="post" /></div>
                                </div>
                            </div>
                            : ''}


                       

                    </>
                )}

                <div className="card-body d-block p-0 mb-3 d-none">
                    <div className="row ">
                        <div className="col-sm-12 p-1">
                            <div className='maltiImgesUpload2' >
                                <div>
                                <img src={BlurBackground} className="" alt="post" />
                                </div>
                                <div>
                                <img src={BlurBackground} className="" alt="post" />
                                </div> 
                            </div>
                        </div>
                        <div className="col-sm-12 p-1">
                            <div className='maltiImgesUpload3' >
                                <div>
                                <img src={BlurBackground} className="" alt="post" />
                                </div>
                               <div className='d-flex flex-column'>
                                    <div>
                                        <img src={BlurBackground} className="" alt="post" />
                                    </div>
                                    <div>
                                        <img src={BlurBackground} className="" alt="post" />
                                    </div>
                               </div>
                            </div>
                        </div>
                        <div className="col-sm-12 p-1">
                            <div className='maltiImgesUpload4' >
                                <div>
                                <img src={BlurBackground} className="" alt="post" />
                                </div>
                               <div className='d-flex flex-column'>
                                    <div>
                                        <img src={BlurBackground} className="" alt="post" />
                                    </div>
                                    <div className='moreImges'>
                                        <img src={BlurBackground} className="" alt="post" />
                                        <div>
                                            <div><span>1 More</span></div>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card-body p-0 me-lg-5">
                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">{des} </p>
                    {/* {JSON.stringify(allData.paid_status, null, 2)} */}
                    {/* <a href="/defaultvideo" className="fw-600 text-primary ms-2">See more</a> */}
                </div>

                <div className="card-body d-flex p-0">
                    <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                        onClick={() => {
                            this.toggleActive()
                            this.setState({
                                comments: false,
                                Emojis: false
                            })
                        }}
                    ><i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i> <i className="feather-heart text-white bg-red-gradiant mr-1 btn-round-xs font-xss"></i></div>
                    <div className={`emoji-wrap pointer ${emojiClass}`}>
                        <ul className="emojis list-inline mb-0">
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(1)}><i className="em em---1"></i> </li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(2)}><i className="em em-angry"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(3)}><i className="em em-anguished"></i> </li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(4)}><i className="em em-astonished"></i> </li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(5)}><i className="em em-blush"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(6)}><i className="em em-clap"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(7)}><i className="em em-cry"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(8)}><i className="em em-full_moon_with_face"></i></li>
                        </ul>
                    </div>
                    <div className="d-flex cursor-pointer align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                        onClick={() => {
                            this.setState({
                                comments: false,
                                Emojis: !this.state.Emojis,
                                isActive: false,
                            })
                        }}
                    >
                        {/* <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i> */}
                        <span className="d-none-xss px-3">{this.props.allData && this.props.allData.emoji_count + this.state.EmojisCount} {" "}</span>
                    </div>
                    <div className="d-flex cursor-pointer align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                        onClick={() => {
                            this.setState({
                                comments: !this.state.comments,
                                isActive: false,
                                Emojis: false,
                            })
                        }}
                    >
                        <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                        <span className="d-none-xss">{this.props.commentCount + this.state.commentsCount} Comment</span>
                    </div>
                    <div className={`pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ${menuClass}`} id={`dropdownMenu${id}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={this.toggleOpen}>
                        <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
                        <span className="d-none-xs">Share</span>
                    </div>
                    <div className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg right-0 ${menuClass}`} aria-labelledby={`dropdownMenu${id}`}>
                        <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">Share <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i></h4>
                        <div className="card-body p-0 d-flex">
                            <ul className="d-flex align-items-center justify-content-between mt-2">
                                <li className="me-1"><span className="btn-round-lg pointer bg-facebook"><i className="font-xs ti-facebook text-white"></i></span></li>
                                <li className="me-1"><span className="btn-round-lg pointer bg-twiiter"><i className="font-xs ti-twitter-alt text-white"></i></span></li>
                                <li className="me-1"><span className="btn-round-lg pointer bg-linkedin"><i className="font-xs ti-linkedin text-white"></i></span></li>
                                <li className="me-1"><span className="btn-round-lg pointer bg-instagram"><i className="font-xs ti-instagram text-white"></i></span></li>
                                <li><span className="btn-round-lg pointer bg-pinterest"><i className="font-xs ti-pinterest text-white"></i></span></li>
                            </ul>
                        </div>
                        <div className="card-body p-0 d-flex">
                            <ul className="d-flex align-items-center justify-content-between mt-2">
                                <li className="me-1"><span className="btn-round-lg pointer bg-tumblr"><i className="font-xs ti-tumblr text-white"></i></span></li>
                                <li className="me-1"><span className="btn-round-lg pointer bg-youtube"><i className="font-xs ti-youtube text-white"></i></span></li>
                                <li className="me-1"><span className="btn-round-lg pointer bg-flicker"><i className="font-xs ti-flickr text-white"></i></span></li>
                                <li className="me-1"><span className="btn-round-lg pointer bg-black"><i className="font-xs ti-vimeo-alt text-white"></i></span></li>
                                <li><span className="btn-round-lg pointer bg-whatsup"><i className="font-xs feather-phone text-white"></i></span></li>
                            </ul>
                        </div>
                        <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">Copy Link</h4>
                        <i className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500"></i>
                        <input type="text" placeholder="https://socia.be/1rGxjoJKVF0" className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg" />
                    </div>
                </div>





                {this.state.comments && (
                    <Comments
                        _id={id}
                        // comments={this.props.comments}
                        updateComentsCount={this.updateComentsCount}
                    />
                )}
                {this.state.Emojis && (
                    <Emojis _id={id} />
                )}

            </div>
        );


    }
}

export default Postview;

