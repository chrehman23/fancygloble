import React, { Component } from 'react';
import postImage from '../../public/assets/images/post.png'
import PostApi from '../api/Posts';
import ApiLoader from '../components/ApiLoader';
import PostSound from '../../public/assets/sounds/post_sound.mp3'




import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js';

class Createpost extends Component {
    constructor(props) {
        super()
        this.state = {
            isOpen: false,
            createPost: false,
            postApiLoader: false,

            description: "",
            post_images: "",
            profileImageURL: "",

            paidPost: false,
            paidPostamount: 0,
        };

    }


    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    addPost = () => {
        let data = new FormData();
        data.append('created_at', new Date())
        data.append('description', this.state.description)
        data.append('post_images', this.state.post_images)
       
        data.append('paid_amount', this.state.paidPostamount)
        
        this.setState({ postApiLoader: true })
        PostApi.addPostByUser(data).then(res => {
            if (res.data.Error == false) {
                new Audio(PostSound).play();
                window.scrollTo(0, this.props.scrolHight)
                this.props.createPost(res.data.post)
                let notification = {
                    name: res.data.post.posted_by.name,
                    profile: res.data.post.posted_by.profile_photo,
                    des: "You created a post.",
                    time: new Date()
                }
                this.props.addnotificaions(notification)
                this.setState({
                    description: "",
                    post_images: "",
                    profileImageURL: "",
                    createPost: false,

                    paidPost: false,
                    paidPostamount: 0,
                })
            }
            this.setState({ postApiLoader: false })
        }).catch(error => {
            this.setState({ postApiLoader: false })
        })


    }

    profileImageChangeHandler = (file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                post_images: file,
                profileImageURL: reader.result,
            });
        };
        reader.readAsDataURL(file);
    };

    render() {
        const menuClass = `${this.state.isOpen ? " show" : ""}`;

        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                <div className="card-body p-0 "
                    onClick={() => {
                        // window.location.reload(false) 
                        this.setState({ createPost: !this.state.createPost })
                    }}
                >
                    <div className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center cursor-pointer">{!this.state.createPost && (<i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>)}Create Post</div>
                </div>
                {this.state.createPost && (
                    <>
                        <div className="card-body d-block p-0 mb-3 mt-2">
                            {this.state.profileImageURL && (
                                <div className="row ps-2 pe-2 ">
                                    <div className="col-sm-12 border rounded p-0"><img src={this.state.profileImageURL} className="rounded-3 w-100" alt="post" /></div>
                                </div>
                            )}

                        </div>
                        <div className="card-body p-0 mt-1 position-relative">
                            <figure className="avatar position-absolute ms-2 mt-1 top-5"><img src="assets/images/user.png" alt="icon" className="shadow-sm rounded-circle w30" /></figure>
                            <textarea
                                value={this.state.description}
                                onChange={(e) => {
                                    this.setState({ description: e.target.value })
                                }}
                                name="message" className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
                        </div>
                        {!this.state.paidPost && (
                            <div  >
                                <p className='font-xssss text-grey-500 fw-500 mb-0'>Need paid post. <span
                                    onClick={() => {
                                        this.setState({ paidPost: true })
                                    }}
                                className='text-primary font-xssss fw-500 cursor-pointer'>Click to add amount.</span></p>
                            </div>
                        )}
                        {this.state.paidPost && (
                            <div  >
                                <p className='font-xssss text-grey-500 fw-500 mb-0'>Paid post amount. <span
                                    onClick={() => {
                                        this.setState({ paidPost: false })
                                    }}
                                     className='text-primary font-xssss fw-500 cursor-pointer'>Cancel paid post.</span></p>
                                <input type='number'
                                    value={this.state.paidPostamount}
                                onChange={(e)=>{
                                    this.setState({ paidPostamount :e.target.value})
                                }}
                                className='font-xssss text-grey-500 fw-500 paidPostAmount' />
                            </div>
                        )} 
                        <div className="card-body d-flex align-items-center p-0 mt-2">
                            <input type='file' id="post_images"
                                // value={this.state.post_images}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        if (e.currentTarget.files[0].type.split('/')[0] == "image") {
                                            const file = e.currentTarget.files[0];
                                            this.profileImageChangeHandler(file);
                                        } else {
                                            this.setState({
                                                post_images: "",
                                                profileImageURL: "",
                                            })
                                        }

                                    } else {
                                        this.setState({
                                            post_images: "",
                                            profileImageURL: "",
                                        })
                                    }


                                }}
                                className='d-none' />
                            {/* <a href="#video" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-video me-2"></i><span className="d-none-xs">Live Video</span></a> */}
                            <div
                                onClick={() => {
                                    document.getElementById("post_images").click();
                                }}
                                className="d-flex align-items-center cursor-pointer font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-success feather-image me-2"></i><span className="d-none-xs">Photo/Video</span></div>
                            {this.state.postApiLoader && (
                                <div className='ms-auto'>
                                    <ApiLoader />
                                </div>
                            )}
                            {!this.state.postApiLoader && (this.state.description || this.state.post_images) && (
                                <div className='ms-auto'>
                                    <button
                                        onClick={this.addPost}
                                        className='btn btn-secondary '>Post</button>
                                </div>
                            )}

                            {/* <a href="#activity" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-warning feather-camera me-2"></i><span className="d-none-xs">Feeling/Activity</span></a> */}
                            <div className={`ms-auto pointer ${menuClass} d-none`} id="dropdownMenu4" data-bs-toggle="dropdown" aria-expanded="false" onClick={this.toggleOpen}><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></div>
                            <div className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${menuClass}`} aria-labelledby="dropdownMenu4">
                                <div className="card-body p-0 d-flex">
                                    <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">Save Link <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span></h4>
                                </div>
                                <div className="card-body p-0 d-flex mt-2">
                                    <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">Hide Post <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                                </div>
                                <div className="card-body p-0 d-flex mt-2">
                                    <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">Hide all from Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                                </div>
                                <div className="card-body p-0 d-flex mt-2">
                                    <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                    <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4 pointer">Unfollow Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                                </div>
                            </div>

                        </div>

                    </>
                )}
            </div>
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

        createPost: (data) => {
            dispatch(ACTIONS.addPost(data))
        },
        addnotificaions: (data) => {
            dispatch(ACTIONS.addnotificaion(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Createpost))