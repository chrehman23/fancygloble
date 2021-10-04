import React, { Component } from 'react';
import postImage from '../../public/assets/images/post.png'
import PostApi from '../api/Posts';
import ApiLoader from '../components/ApiLoader';
import PostSound from '../../public/assets/sounds/post_sound.mp3'

import BlurBackground from '../../public/assets/images/blur.jpg'
import usreProfilePic from '../../public/assets/images/user.png'

// import vedio from './../../public/assets/WhatsApp Video 2020-08-26 at 12.18.47 PM.mp4'
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
            post_images: [],
            profileImageURL: [],

            paidPost: false,
            paidPostamount: 0,

            vedioUrl: "",
            vedioFile: "",

            lastTaged: "",
            tagedSearchList: [],
            tagedSearchListFilterd: [],

            fileError: "",

            tag_users:[]
        };

    }

    componentDidMount() {
        console.log("frinedn", this.props.TagsSearchFollowers)
        console.log("frinedn", this.props.TagsSearchFollowings)
    }


    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    addPost = () => {
        let data = new FormData();
        data.append('created_at', new Date())
        data.append('tag_users', JSON.stringify(this.state.tag_users))
        data.append('description', this.state.description)
        // *************************************************
        let descriptionList = this.state.description.split(" ");
        let hash_tags = [];
        for (let i = 0; i < descriptionList.length; i++) { 
            if (descriptionList[i].includes('#') && descriptionList[i].length>1){
                hash_tags.push(descriptionList[i])
            }
        }
        data.append('hash_tags', JSON.stringify(hash_tags))
        // *************************************************
        data.append('video_url', this.state.vedioFile)
        let postPictures = this.state.post_images
        for (let i = 0; i < postPictures.length; i++) {
            data.append('post_images', postPictures[i])
        }
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

                    vedioUrl: "",
                    vedioFile: ""
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
                post_images: [...this.state.post_images, file],
                profileImageURL: [...this.state.profileImageURL, reader.result],
            }, () => {
                // console.log(this.state.profileImageURL)
            });
        };
        reader.readAsDataURL(file);
    };
    readVideo(event) {
        let file = event.currentTarget.files[0]
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // videoSrc.src = e.target.result
                // videoTag.load()
                this.setState({
                    vedioUrl: e.target.result,
                    vedioFile: file,
                })
            }.bind(this)

            reader.readAsDataURL(event.target.files[0]);
        }
    }


    getTags = (e) => {
        let description = e.target.value;
        let worldList = description.split(" ");
        // console.log("check ", worldList)
        let lastObject = worldList.pop()
        let lastUser
        if (lastObject.includes('@')) {
            lastUser = lastObject.replace("@", '');
            if (lastUser !== "") {
                if (this.state.lastTaged !== lastUser) {
                    this.setState({ lastTaged: lastUser });
                    // console.log(lastUser)
                    let usersList = this.state.tagedSearchList
                    let filtersusers = usersList.filter(data => data.name.includes(lastUser))
                    // console.log("filtersusers", filtersusers)
                    this.setState({ tagedSearchListFilterd: filtersusers })
                    let userOnlyName = filtersusers.map(data => data.name);
                    // console.log("ss", userOnlyName)
                }
            }
        } else {
            this.setState({ tagedSearchListFilterd: [] })
        }





    }

    addFullLastTag = (targetName,user_name) => {
        // @[a - z]*
        let description = this.state.description;
        let worldList = description.split(" ");
        worldList.pop();
        worldList.push(`@${targetName} `) 
        let tag_users = this.state.tag_users;
        tag_users.push({
            name: `@${targetName} `,
            user_name: user_name
        })
        this.setState({
            tag_users: tag_users,
            description: worldList.join(' '),
            tagedSearchListFilterd: [],
        })
        document.getElementById("description").focus();
    }

    removeImage = (index) => {
        let imagesList = this.state.profileImageURL;
        imagesList.splice(index, 1);
        let imagesList2 = this.state.post_images;
        imagesList2.splice(index, 1);
        this.setState({
            profileImageURL: imagesList,
            post_images: imagesList2,
        })
    }

 


    render() {

        const menuClass = `${this.state.isOpen ? " show" : ""}`;
        return (
            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                <div className="card-body p-0 "
                    onClick={() => {
                        // window.location.reload(false) 
                        let follers = this.props.TagsSearchFollowers.map(data => data.user_id)
                        let follers2 = this.props.TagsSearchFollowings.map(data => data.user_id)
                        let usresList = follers.concat(follers2)
                        this.setState({
                            createPost: !this.state.createPost,
                            tagedSearchList: usresList
                        })
                    }}
                > 
                    <div className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center cursor-pointer">{!this.state.createPost && (<i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>)}Create Post</div>
                </div>
                {this.state.createPost && (
                    <>

                        <div className="card-body p-0 mt-1 position-relative">
                            {/* <figure className="avatar position-absolute ms-2 mt-1 top-5"><img src="assets/images/user.png" alt="icon" className="shadow-sm rounded-circle w30" /></figure> */}
                            <textarea
                                id="description"
                                value={this.state.description}
                                onChange={(e) => {
                                    this.getTags(e)
                                    this.setState({ description: e.target.value })
                                }}
                                name="message" className="h100 bor-0 w-100 rounded-xxl p-2   font-xssss text-grey-600 fw-500 border-light-md theme-dark-bg" cols="30" rows="10" placeholder="What's on your mind?"></textarea>
                        </div>
                        <div>
                            {this.state.tagedSearchListFilterd && this.state.tagedSearchListFilterd.length > 0 && (
                                <div className='border-bottom'>
                                    <p><b>Tag to</b></p>
                                    {this.state.tagedSearchListFilterd && this.state.tagedSearchListFilterd.length == 0 && "<b>No List found.</b>"}
                                    {this.state.tagedSearchListFilterd.map((data, index) => {
                                        return (
                                            <>
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        this.addFullLastTag(data.name,data.user_name)
                                                    }}
                                                    className='cursor-pointer px-2'
                                                    style={{ minWidth: '300px' }} key={index}>
                                                    <div class="card bg-transparent-card w-100 align-items-center align-items-center d-flex flex-row border-0 mb-3"  >
                                                        <div className='smImageControlerRs'>
                                                            <img src={data.profile_photo ? `${data.profile_photo}` : usreProfilePic} alt="user" className="" />
                                                        </div>
                                                        <div className='flex-grow-1'>
                                                            <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">{data.name}</h5>
                                                            <h6 class="text-grey-500 fw-500 font-xssss lh-4">{data.user_name}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                            )}


                        </div>


                        {this.state.vedioUrl && (
                            <div className="card-body d-block p-0 mb-3 mt-3">
                                <div className='row'>
                                    <div className='col-12'>
                                        <video className='vedioPlayer' controls autoplay>
                                            <source src={this.state.vedioUrl} type="video/mp4" />
                                            Your browser does not support HTML5 video.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* {JSON.stringify(this.state.profileImageURL.length)} */}
                        {this.state.profileImageURL && (

                            <div className="card-body d-block p-0 mb-3 ">
                                <div className="row ">
                                    {this.state.profileImageURL.length == 1 && (
                                        <div className="col-sm-12 p-1">
                                            <div className='maltiImgesUpload' >
                                                <div>
                                                    <img src={this.state.profileImageURL[0]} className="" alt="post" />
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                    {/* **************************** */}
                                    {this.state.profileImageURL.length == 2 && (
                                        <div className="col-sm-12 p-1 ">
                                            <div className='maltiImgesUpload2' >
                                                <div>
                                                    <img src={this.state.profileImageURL[0]} className="" alt="post" />
                                                </div>
                                                <div>
                                                    <img src={this.state.profileImageURL[1]} className="" alt="post" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* **************************** */}
                                    {this.state.profileImageURL.length == 3 && (
                                        <div className="col-sm-12 p-1">
                                            <div className='maltiImgesUpload3' >
                                                <div>
                                                    <img src={this.state.profileImageURL[0]} className="" alt="post" />
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <div>
                                                        <img src={this.state.profileImageURL[1]} className="" alt="post" />
                                                    </div>
                                                    <div>
                                                        <img src={this.state.profileImageURL[2]} className="" alt="post" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* ******************** */}
                                    {this.state.profileImageURL.length > 3 && (
                                        <div className="col-sm-12 p-1">
                                            <div className='maltiImgesUpload4' >
                                                <div>
                                                    <img src={this.state.profileImageURL[0]} className="" alt="post" />
                                                </div>
                                                <div className='d-flex flex-column'>
                                                    <div>
                                                        <img src={this.state.profileImageURL[1]} className="" alt="post" />
                                                    </div>
                                                    <div className='moreImges'>
                                                        <img src={this.state.profileImageURL[2]} className="" alt="post" />
                                                        {this.state.profileImageURL.length > 3 && (
                                                            <div>
                                                                <div><span>{this.state.profileImageURL.length - 3} More</span></div>
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
                        )}
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
                                    onChange={(e) => {
                                        this.setState({ paidPostamount: e.target.value })
                                    }}
                                    className='font-xssss text-grey-500 fw-500 paidPostAmount' />
                            </div>
                        )}
                        <div className="card-body d-flex align-items-center p-0 mt-2">
                            <input type='file' id="post_images"
                                onChange={(e) => {
                                    this.setState({
                                        fileError: "",
                                    })
                                    if (e.target.value) {
                                        let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                                        // console.log("mb", typeof mb)
                                        if (mb > 1) {
                                            this.setState({
                                                fileError: "File size should less then 1MB",
                                            })
                                        } else {
                                            if (e.currentTarget.files[0].type.split('/')[0] == "image") {
                                                const file = e.currentTarget.files[0];
                                                this.profileImageChangeHandler(file);
                                            } else {
                                                this.setState({
                                                    post_images: [],
                                                    profileImageURL: [],
                                                    fileError: "File format does not supported.Upload file in JPG/JPEG/PNG format."
                                                })
                                            }
                                        }


                                    } else {
                                        this.setState({
                                            post_images: [],
                                            profileImageURL: [],
                                        })
                                    }


                                }}
                                className='d-none' />
                            <input type='file' id="post_vedio"
                                // value={this.state.post_images}
                                onChange={(e) => {
                                    this.setState({
                                        vedioUrl: "",
                                    })
                                    if (e.target.value) {
                                        let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                                        // console.log("mb", typeof mb)
                                        if (mb > 1) {
                                            this.setState({
                                                fileError: "File size should less then 1MB",
                                            })
                                        } else {

                                            if (e.currentTarget.files[0].type.split('/')[0] == "video") {
                                                this.readVideo(e);
                                            } else {
                                                this.setState({
                                                    vedioUrl: "",
                                                    vedioFile: "",
                                                    fileError: "File format does not supported.Upload file in MP4 format."
                                                })
                                            }

                                        }

                                    } else {
                                        this.setState({
                                            vedioUrl: "",
                                            vedioFile: ""
                                        })
                                    }


                                }}
                                className='d-none' />
                            {!this.state.profileImageURL.length && (
                                <div onClick={() => { document.getElementById("post_vedio").click() }}
                                    className="d-flex align-items-center font-xssss cursor-pointer fw-600 ls-1 text-grey-700 text-dark pe-4"><i className="font-md text-danger feather-video me-2"></i><span className="d-none-xs">Video</span></div>
                            )}


                            {!this.state.vedioUrl && (
                                <div onClick={() => { document.getElementById("post_images").click() }}
                                    className="d-flex align-items-center cursor-pointer font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                                    <i className="font-md text-success feather-image me-2"></i>
                                    <span className="d-none-xs">Photos</span>
                                </div>

                            )}

                            {this.state.postApiLoader && (
                                <div className='ms-auto'>
                                    <ApiLoader />
                                </div>
                            )}
                            {!this.state.postApiLoader && (this.state.description || this.state.post_images.length > 0 || this.state.vedioUrl) && (
                                <div className='ms-auto'>
                                    <button
                                        onClick={this.addPost}
                                        className='btn btn-secondary'>Post</button>
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
                        {/* *******************slected pictures************************** */}
                        {this.state.fileError && (
                            <p className='text-danger font-weight-bold'><small>{this.state.fileError}</small></p>
                        )}
                        {this.state.profileImageURL && this.state.profileImageURL.length > 0 && (
                            <div className='slectedPictures'>
                                {this.state.profileImageURL.map((data, index) => {
                                    return (
                                        <div key={index}><img src={data} alt='Edit image' /><span
                                            onClick={() => {
                                                this.removeImage(index)
                                            }}
                                        >x</span></div>
                                    )
                                })}

                            </div>

                        )}


                    </>
                )
                }
            </div>
        );
    }
}





const mapStateToProps = (state) => {
    return {
        Posts: state.Posts,
        TagsSearchFollowers: state.UserProfile.profile.followers,
        TagsSearchFollowings: state.UserProfile.profile.followings,
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