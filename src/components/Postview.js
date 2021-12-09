import React, { Component } from 'react';
import Comments from './Comments';
import Emojis from './Emojis';
import PostApi from '../api/Posts'
import PostSound from '../../public/assets/sounds/post_sound.mp3';

import icon1 from '../../public/assets/iconss/1.svg'
import icon2 from '../../public/assets/iconss/2.svg'
import icon3 from '../../public/assets/iconss/3.svg'
import icon4 from '../../public/assets/iconss/4.svg'
import icon5 from '../../public/assets/iconss/5.svg'
import SweetAlert from 'react-bootstrap-sweetalert'
import StripeCheckout from 'react-stripe-checkout';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

import { withRouter } from 'react-router';
import BlurBackground from '../../public/assets/images/blur.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

import CopyToClipBoardPost from '../components/CopyToClipBoardPost'

class Postview extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            comments: false,
            Emojis: false,
            commentsCount: 0,
            EmojisCount: 0,
            cardAtive: true,
            copyClip: false,
            purchaseLoader: false,

            user_paid: false,
            postImages: [],
            postvideo: '',
            Share: false,

            payment_notify: false,
            payment_status: false,
            pyment_error_msg: " Your card was declined.",
        };
        // this.addLinks = this.addLinks.bind(this);
    }

    componentDidMount() {
        // AOS.init();

        this.setState({
            postImages: this.props.postimage,
            user_paid: this.props.allData.user_paid,
            postvideo: this.props.postvideo
        })
    }


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


    addLinks = (tags, hash_tags, description) => {
        for (let i = 0; i < tags.length; i++) {
            description = description.replaceAll(tags[i].name, `<a href='/user/${tags[i].user_name}' target='_blank'>${tags[i].name}</a> `)
        }
        for (let i = 0; i < hash_tags.length; i++) {
            description = description.replaceAll(hash_tags[i], `<a href='#${hash_tags[i]}'>${hash_tags[i]}</a> `)
        }
        return description

    }

    purchasePost = (token) => {
        if (this.props.id) {
            let data = {
                post_id: this.props.id,
                payment_token: token.id
            }
            this.setState({ purchaseLoader: true })
            PostApi.purchasePost(data).then(res => {
                console.log(res.data)
                if (res.data.Error == false) {
                    new Audio(PostSound).play();
                    this.props.purchasePost(res.data)
                    this.setState({
                        postImages: res.data.paidPost.post_images,
                        user_paid: true,
                        postvideo: res.data.paidPost.video_url,
                        paymentLoader: false,
                        payment_status: res.data.payment_status,
                        payment_notify: true
                    })
                }
                if (res.data.error_msg) {
                    this.setState({
                        pyment_error_msg: res.data.error_msg
                    })
                } else {
                    this.setState({
                        pyment_error_msg: " Your card was declined. "
                    })
                }
                this.setState({
                    paymentLoader: false,
                    payment_notify: true,
                    purchaseLoader: false
                })
            }).catch(error => {
                this.setState({
                    purchaseLoader: false,
                    pyment_error_msg: " Your card was declined. ",
                    paymentLoader: false,
                    payment_status: false,
                    payment_notify: true
                })
                console.log(error)
            })
        }
    }

    render() {

        const { user, time, des, avater, postimage, postvideo, id, allData, commentCount } = this.props;

        const menuClass = `${this.state.isOpen ? " show" : ""}`;
        const emojiClass = `${this.state.isActive ? " active" : ""}`;

        return (
           <>
                {this.state.payment_notify && (
                    <>
                        {this.state.payment_status ? (

                            <SweetAlert success title="Payment Done!"
                                customButtons={
                                    <React.Fragment>
                                        <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ payment_notify: false })}>Okay</button>
                                    </React.Fragment>
                                }    >
                                Payment process done enjoy your content.
                            </SweetAlert>
                        ) : (
                            <SweetAlert warning title="Payment Error!"
                                customButtons={
                                    <React.Fragment>
                                        <button className='px-2 btn btn-primary bgthwh ms-2 btn-sm' onClick={() => this.setState({ payment_notify: false })}>Okay</button>
                                    </React.Fragment>
                                }    >
                                {this.state.pyment_error_msg}
                            </SweetAlert>
                        )}
                    </>
                )}
                <div className="p-4 mb-3 border-0 card w-100 shadow-xss rounded-xxl"  >
                    {/* {JSON.stringify(allData.created_by.user_name,null,2)} */}
                    <div className="p-0 cursor-pointer card-body d-flex"
                        onClick={() => {
                            this.props.history.push(`/user/${allData.created_by && allData.created_by.user_name}`)
                        }}
                    >
                        <figure className="avatar imagesmresponsive me-3"><img src={avater} alt="avater" className="shadow-sm rounded-circle" /></figure>
                        <h4 className="mt-1 fw-700 text-grey-900 font-xssss text-capitalize"> {user} <span className="mt-1 d-block font-xssss fw-500 lh-3 text-grey-500 text-lowercase"> {time} ago</span></h4>
                        {allData.paid_status && (
                            <div className="ms-auto ">
                                <button className='btn-sm btn btn-primary bgthwh'>Paid post</button>
                            </div>
                        )}

                        <div className="ms-auto pointer d-none"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></div>

                    </div>
                    {/* {JSON.stringify(allData.tag_users,null,2)} */}

                    <div className="p-0 card-body me-lg-5">
                        <p className="mb-2 fw-500 lh-26 font-xssss w-100"
                            dangerouslySetInnerHTML={{ __html: this.addLinks(allData.tag_users, allData.hash_tags, des) }}
                        />
                    </div>
                    {!this.state.user_paid && (
                        <>
                            {!this.state.cardAtive && (
                                <div className="p-0 mb-3 card-body d-block">
                                    <div className="row ps-2 pe-2 ">
                                        <div className="p-1 col-sm-12 ">
                                            <div className='overflow-hidden position-relative'>
                                                <img src='/assets/images/blur.jpg' loading="lazy" className="rounded-3 w-100" alt="post" />
                                                <div className='paidPostSeciton'
                                                    onClick={() => {
                                                        this.setState({ cardAtive: true })
                                                    }}
                                                >
                                                    <div className='d-flex align-items-center justify-content-center'>

                                                        <button className='subscribe-btn'>Paid Post Click to Pay €{allData.paid_amount}</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            )}
                            {this.state.cardAtive && (
                                <div className="p-0 mb-3 card-body d-block">
                                    <div className="row ps-2 pe-2 ">
                                        <div className="p-1 col-sm-12">
                                            <div className='overflow-hidden position-relative'>
                                                <img src='/assets/images/blur.jpg' loading="lazy" className="rounded-3 w-100" alt="post" />
                                                <div className='paidPostSeciton'>
                                                    <div className='d-flex align-items-center flex-column justify-content-center'>
                                                        <div className='d-flex align-items-center justify-content-center'>
                                                            {this.state.purchaseLoader && (
                                                                <button className='subscribe-btn'>Loading....</button>
                                                            )}
                                                            {!this.state.purchaseLoader && (
                                                                <StripeCheckout
                                                                    token={this.purchasePost}
                                                                    stripeKey={process.env.REACT_APP_STRIP_KEY}
                                                                    image={avater ? avater : "https://node.globalfansy.com/assets/user.png"}
                                                                    // panelLabel={`'You are paying for post ${allData.paid_amount}'`} // prepended to the amount in the bottom pay button
                                                                    amount={allData.paid_amount * 100} // cents
                                                                    ComponentClass="div"
                                                                    currency="EUR"
                                                                    name={user} // the pop-in header title
                                                                    description={`You are paying  €${allData.paid_amount} for post.`} // the pop-in header subtitle
                                                                >
                                                                    <button className='subscribe-btn'>Paid Post Click to Pay €{allData.paid_amount}</button>
                                                                </StripeCheckout>

                                                            )}


                                                        </div>
                                                        {/* <div className='w-100'>
                                                        <input type='text' className='p-2 bg-transparent commentInput text-grey-500 fw-500 font-xssss lh-4 ' placeholder='xxx xxx xxx xxx' />
                                                    </div>
                                                    <div className='d-flex'>
                                                        <input type='text' className='p-2 bg-transparent commentInput text-grey-500 fw-500 font-xssss lh-4' placeholder='PIN' />
                                                        <input type='text' className='p-2 bg-transparent commentInput text-grey-500 fw-500 font-xssss lh-4' placeholder='Exp' />
                                                    </div> */}

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            )}
                        </>
                    )}

                    {this.state.user_paid && (
                        <>
                            {this.state.postvideo ? (
                                <>
                                    {this.state.postvideo && allData.video_url !== "" && (
                                        <div className="p-0 mt-3 mb-3 card-body d-block">
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <video className='vedioPlayer' controls controlsList="nodownload">
                                                        <source src={`${allData.video_url}`} type="video/mp4" />
                                                        Your browser does not support HTML5 video.
                                                    </video>
                                                </div>
                                            </div>
                                        </div>
                                    )}</>
                            )
                                : ''}
                            {this.state.postImages ? (
                                <div className="p-0 mb-3 card-body d-block"
                                    onClick={() => {
                                        this.props.modalPostView(allData)
                                    }}
                                >

                                    <div className="row ps-2 pe-2">

                                        {this.state.postImages.length == 1 && (
                                            <div className="p-1 col-sm-12">
                                                <div className='maltiImgesUpload' >
                                                    <div>
                                                        <img src={`${this.state.postImages[0].picture}`} className="" alt="post" />
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                        {/* **************************** */}
                                        {this.state.postImages.length == 2 && (
                                            <div className="p-1 col-sm-12 ">
                                                <div className='maltiImgesUpload2' >
                                                    <div>
                                                        <img src={`${this.state.postImages[0].picture}`} className="" alt="post" />
                                                    </div>
                                                    <div>
                                                        <img src={`${this.state.postImages[1].picture}`} className="" alt="post" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* **************************** */}

                                        {this.state.postImages.length == 3 && (
                                            <div className="p-1 col-sm-12">
                                                <div className='maltiImgesUpload3' >
                                                    <div>
                                                        <img src={`${this.state.postImages[0].picture}`} className="" alt="post" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <div>
                                                            <img src={`${this.state.postImages[1].picture}`} className="" alt="post" />
                                                        </div>
                                                        <div>
                                                            <img src={`${this.state.postImages[2].picture}`} className="" alt="post" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* ******************** */}
                                        {this.state.postImages.length > 3 && (
                                            <div className="p-1 col-sm-12">
                                                <div className='maltiImgesUpload4' >
                                                    <div>
                                                        <img src={`${this.state.postImages[0].picture}`} className="" alt="post" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <div>
                                                            <img src={`${this.state.postImages[1].picture}`} className="" alt="post" />
                                                        </div>
                                                        <div className='moreImges'>
                                                            <img src={`${this.state.postImages[2].picture}`} className="" alt="post" />
                                                            {this.state.postImages.length > 3 && (
                                                                <div>
                                                                    <div><span>{this.state.postImages.length - 3} More</span></div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )}


                                        {/* ****************************** */}

                                    </div>
                                </div>
                            )

                                : ''}
                        </>
                    )}
                    <div className="p-0 mr-2 card-body d-flex" style={{ marginRight: '5px' }}>
                        <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                            onClick={() => {
                                this.toggleActive()
                                this.setState({
                                    comments: false,
                                    Emojis: false
                                })
                            }}
                        ><i className="text-white feather-thumbs-up text-dark bgthwh btn-round-sm font-xs"></i>
                            {/* <i className="mr-1 text-white feather-heart bg-red-gradiant btn-round-xs font-xss"></i> */}
                        </div>
                        <div className={`emoji-wrap pointer ${emojiClass}`}>
                            <ul className="mb-0 emojisPictures list-inline">
                                <li onClick={() => this.emojiOnPost(1)}><img src={icon1} alt='icon' /></li>
                                <li onClick={() => this.emojiOnPost(2)}><img src={icon2} alt='icon' /></li>
                                <li onClick={() => this.emojiOnPost(3)}><img src={icon3} alt='icon' /></li>
                                <li onClick={() => this.emojiOnPost(4)}><img src={icon4} alt='icon' /></li>
                                <li onClick={() => this.emojiOnPost(5)}><img src={icon5} alt='icon' /></li>
                                {/* <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(1)}><i className="em em---1"></i> </li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(2)}><i className="em em-angry"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(3)}><i className="em em-anguished"></i> </li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(4)}><i className="em em-astonished"></i> </li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(5)}><i className="em em-blush"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(6)}><i className="em em-clap"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(7)}><i className="em em-cry"></i></li>
                            <li className="emoji list-inline-item" onClick={() => this.emojiOnPost(8)}><i className="em em-full_moon_with_face"></i></li> */}
                            </ul>
                        </div>
                        <div className="cursor-pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                            onClick={() => {
                                this.setState({
                                    comments: false,
                                    Emojis: !this.state.Emojis,
                                    isActive: false,
                                })
                            }}
                        >
                            {/* <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i> */}
                            <span className="pr-3 d-none-xss p1x-1">{this.props.allData && this.props.allData.emoji_count + this.state.EmojisCount} {" "}</span>
                        </div>
                        <div className="ml-2 cursor-pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                            style={{ marginLeft: "5px" }}
                            onClick={() => {
                                this.setState({
                                    comments: !this.state.comments,
                                    isActive: false,
                                    Emojis: false,
                                })
                            }}
                        >
                            <i className="text-white feather-message-circle bgthwh btn-round-sm font-xs"></i>
                            <span className="d-none-xss " style={{ marginLeft: "5px" }}>{this.props.commentCount + this.state.commentsCount} Comment</span>
                        </div>

                        <CopyToClipBoardPost copyText={`${window.location.hostname}/post/${id}`} />

                        <div className={`dropdown-menu d-none dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg right-0 ${menuClass}`} aria-labelledby={`dropdownMenu${id}`} style={{ minWidth: '300px', zIndex: 99 }}>
                            <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">Share <i onClick={this.toggleOpen} className="cursor-pointer feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i></h4>
                            <div className="p-0 card-body d-flex d-none">
                                <ul className="mt-2 d-flex align-items-center justify-content-between">
                                    <li className="me-1"><span className="btn-round-lg pointer bg-facebook"><i className="text-white font-xs ti-facebook"></i></span></li>
                                    <li className="me-1"><span className="btn-round-lg pointer bg-twiiter"><i className="text-white font-xs ti-twitter-alt"></i></span></li>
                                    <li className="me-1"><span className="btn-round-lg pointer bg-linkedin"><i className="text-white font-xs ti-linkedin"></i></span></li>
                                    <li className="me-1"><span className="btn-round-lg pointer bg-instagram"><i className="text-white font-xs ti-instagram"></i></span></li>
                                    <li><span className="btn-round-lg pointer bg-pinterest"><i className="text-white font-xs ti-pinterest"></i></span></li>
                                </ul>
                            </div>
                            <div className="p-0 card-body d-flex d-none">
                                <ul className="mt-2 d-flex align-items-center justify-content-between">
                                    <li className="me-1"><span className="btn-round-lg pointer bg-tumblr"><i className="text-white font-xs ti-tumblr"></i></span></li>
                                    <li className="me-1"><span className="btn-round-lg pointer bg-youtube"><i className="text-white font-xs ti-youtube"></i></span></li>
                                    <li className="me-1"><span className="btn-round-lg pointer bg-flicker"><i className="text-white font-xs ti-flickr"></i></span></li>
                                    <li className="me-1"><span className="bg-black btn-round-lg pointer"><i className="text-white font-xs ti-vimeo-alt"></i></span></li>
                                    <li><span className="btn-round-lg pointer bg-whatsup"><i className="text-white font-xs feather-phone"></i></span></li>
                                </ul>
                            </div>
                            <h4 className="mt-4 mb-3 fw-700 font-xssss text-grey-500 d-flex align-items-center">Copy Link</h4>
                            <div className='d-flex justify-content-between rounded-3 bg-grey'>
                                <div>
                                    <input type="text" placeholder={`${window.location.hostname}/post/${id}`} disabled className="p-2 pr-3 border-0 text-grey-500 font-xssss lh-32 fw-600 w-100 theme-dark-bg" />
                                </div>
                                <div>
                                    {/* <CopyToClipboard text={`${window.location.hostname}/post/${id}`}>
                                    <i
                                        onClick={() => {
                                            this.setState({ copyClip: true })
                                            // this.toggleOpen()
                                        }}
                                        className={`${this.state.copyClip ? "ti-check-box text-success" : "feather-copy"} position-absolute cursor-pointer right-35 mt-3 font-xs text-grey-500`}></i>
                                </CopyToClipboard> */}
                                </div>
                            </div>

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
           </>
        );




    }
}



export default withRouter(Postview)


