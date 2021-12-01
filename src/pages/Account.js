import React, { Component, Fragment } from "react";
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';



import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import AuthApi from "../api/Auth";
import { connect } from 'react-redux';
import ACTIONS from '../store/actions/index.js';
import { Link, withRouter } from 'react-router-dom'

import backgroundImage from '../../public/assets/images/product.png'
import ApiLoader from '../components/ApiLoader';


let validationSchemaLogin = Yup.object({
    name: Yup.string().required('Name is required.').min(3, 'Must be greater then 3 characters.').max(18, 'Can not be greater than 18 characters.'),
    paypalEmail: Yup.string().email('Email is not valid.'),
})

class Account extends Component {

    constructor(props) {
        super();
        this.state = {
            loader: true,

            profileImage: "",
            banerImage: "",
            profileUpdated: false,

            fileError: ""

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState,) {
        // if (this.props.profile !== prevProps.profile) {

        // }
    }



    render() {

        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="middle-wrap">
                                {/* **************** */}

                                {!this.props.profileLoading && (
                                    <Formik
                                        initialValues={{
                                            isPrivate: this.props.profile.isPrivate,
                                            about: this.props.profile.about,
                                            bio: this.props.profile.bio,
                                            user_name: this.props.profile.user_name,
                                            profile_photo: this.props.profile.profile_photo,
                                            profile_cover: this.props.profile.profile_cover,
                                            paypalEmail: this.props.profile.paypalEmail,
                                            name: this.props.profile.name,
                                            phone: this.props.profile.phone,
                                            email: this.props.profile.email,
                                        }}
                                        validationSchema={validationSchemaLogin}
                                        onSubmit={(values, { setSubmitting }) => {
                                            console.log(values)
                                            let data = new FormData();
                                            data.append('isPrivate', values.isPrivate)
                                            data.append('about', values.about)
                                            data.append('bio', values.bio)
                                            data.append('user_name', values.user_name);
                                            if (values.profile_photo!==""){
                                                data.append('profile_photo', values.profile_photo)
                                            }
                                            if (values.profile_cover!==""){
                                                data.append('profile_cover', values.profile_cover)
                                            }
                                            data.append('paypalEmail', values.paypalEmail)
                                            data.append('name', values.name)
                                            data.append('phone', values.phone)
                                            data.append('email', values.email)
                                            // setSubmitting(false);
                                            // return
                                            this.setState({ profileUpdated: false })

                                            AuthApi.updateUserProfile(data).then(res => {
                                                console.log(res)
                                                setSubmitting(false);
                                                if(res.data.Error==false){
                                                    this.props.loadProfile(res.data.profile)
                                                }
                                                this.setState({ profileUpdated: true })
                                            }).catch(error => {
                                                console.log(error)
                                            })

                                        }}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                            setFieldValue
                                            /* and other goodies */
                                        }) => (
                                            <form enctype="multipart/form-data">
                                                <div className="p-0 mb-4 bg-white border-0 shadow-xs card w-100">
                                                    <div className="p-4 bg-current border-0 card-body w-100 d-flex rounded-3">
                                                        <Link to="/defaultsettings" className="mt-2 d-inline-block"><i className="text-white ti-arrow-left font-sm"></i></Link>
                                                        <h4 className="mt-2 mb-0 text-white font-xs fw-600 ms-4">Account Details</h4>
                                                    </div>

                                                    <input type='file' name='profile_photo' id="profile_Image"
                                                        onChange={(e) => {
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
                                                                        let reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setFieldValue("profile_photo", file)
                                                                            this.setState({
                                                                                profileImage: reader.result,
                                                                            }, () => {
                                                                                // console.log(this.state.profileImageURL)
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    } else {
                                                                        setFieldValue("profile_photo", '')
                                                                        this.setState({
                                                                            profileImage: '',
                                                                            fileError: "File format does not supported.Upload file in JPG/JPEG/PNG format."

                                                                        })
                                                                    }
                                                                }
                                                            } else {
                                                                setFieldValue("profile_photo", '')
                                                                this.setState({
                                                                    profileImage: '',
                                                                })
                                                            }


                                                        }}
                                                        className='d-none' />
                                                    <input type='file' id="baner_Image"
                                                        onChange={(e) => {
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
                                                                    let reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setFieldValue("profile_cover", file)
                                                                        this.setState({
                                                                            // post_images: [...this.state.post_images, file],//upload image
                                                                            banerImage: reader.result,
                                                                        }, () => {
                                                                            // console.log(this.state.profileImageURL)
                                                                        });
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                } else {
                                                                    setFieldValue("profile_cover", '')
                                                                    this.setState({
                                                                        banerImage: '',
                                                                        fileError: "File format does not supported.Upload file in JPG/JPEG/PNG format."
                                                                    })
                                                                }
                                                            }

                                                            } else {
                                                                setFieldValue("profile_cover", '')
                                                                this.setState({
                                                                    banerImage: '',
                                                                })
                                                            }


                                                        }}
                                                        className='d-none' />


                                                    <div className="overflow-hidden border-0 card w-100 ">
                                                        <div className="card-body position-relative h150 bg-image-cover bg-image-center"
                                                            style={{ backgroundImage: `url("${this.state.banerImage ? this.state.banerImage : values.profile_cover ? `${values.profile_cover}` : backgroundImage}")` }}>
                                                            <span className='editebtn baner'
                                                                onClick={() => { document.getElementById("baner_Image").click() }}
                                                            ><i className="font-sm ti-pencil-alt text-grey-500 pe-0 "></i></span>
                                                        </div>
                                                        <div className="pt-4 text-center card-body d-block">
                                                            <figure className="avatar editeProfileImage mt--6 position-relative z-index-1 ms-auto me-auto postion-relative ">
                                                                <img src={this.state.profileImage ? this.state.profileImage : values.profile_photo ? `${values.profile_photo}` : "assets/images/user.png"} alt="avater" className="p-1 bg-white rounded-xl w-100" />
                                                                <span
                                                                    onClick={() => { document.getElementById("profile_Image").click() }}
                                                                    className='editebtn'><i className="font-sm ti-pencil-alt text-grey-500 pe-0 "></i></span>
                                                            </figure>
                                                            {/* <h4 className="font-xs ls-1 fw-700 text-grey-900">Surfiya Zakir <span className="mt-1 d-block font-xssss fw-500 lh-3 text-grey-500">@surfiyazakir22</span></h4> */}
                                                        </div>


                                                    </div>

                                                    <div className="p-4 pt-0 border-0 card-body p-lg-5 pt-n-5 w-100 ">
                                                        <div className="row">
                                                            <div className="mb-3 col-lg-12">
                                                                {this.state.fileError && (
                                                                    <p className='ml-3 text-danger font-weight-bold'><small>{this.state.fileError}</small></p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* {JSON.stringify(values)} */}

                                                        <form onSubmit={handleSubmit}>
                                                            <div className="row">
                                                                <div className="mb-3 col-lg-6">

                                                                    <div className="form-group">
                                                                        <label className="mb-2 mont-font fw-600 font-xsss">Name</label>

                                                                        <Field id="name" name="name" className="form-control" placeholder="Your Name" />

                                                                        <ErrorMessage
                                                                            name='name'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />

                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="mb-2 mont-font fw-600 font-xsss">Phone</label>

                                                                        <Field id="phone" name="phone" className="form-control" placeholder="Phone Number" />

                                                                        <ErrorMessage
                                                                            name='phone'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="mb-2 mont-font fw-600 font-xsss">Email</label>
                                                                        <Field id="email" name="email" className="form-control" disabled placeholder="Your Email Address" />

                                                                        <ErrorMessage
                                                                            name='email'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="mb-2 mont-font fw-600 font-xsss">User Name</label>

                                                                        <Field id="user_name" name="user_name" className="form-control" disabled placeholder="User Name" />

                                                                        <ErrorMessage
                                                                            name='user_name'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="row">

                                                                <div className="mb-3 col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="mb-2 mont-font fw-600 font-xsss">Paypal Email</label>

                                                                        <Field id="paypalEmail" name="paypalEmail" className="form-control" placeholder="Paypal Email Address" />

                                                                        <ErrorMessage
                                                                            name='paypalEmail'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>




                                                                <div className="mb-3 col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="mb-2 mont-font fw-600 font-xsss">Bio</label>

                                                                        <Field id="bio" name="bio" className="form-control" placeholder="Bio" />

                                                                        <ErrorMessage
                                                                            name='bio'
                                                                            component="small"
                                                                            className="text-danger"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="mb-3 col-lg-12">
                                                                    <label className="mb-2 mont-font fw-600 font-xsss text-dark">About</label>
                                                                    <textarea
                                                                        onChange={(e) => {
                                                                            setFieldValue("about", e.target.value, true)
                                                                        }}
                                                                        onBlur={(e) => {
                                                                            setFieldValue("about", e.target.value, true)
                                                                        }}

                                                                        value={values.about}
                                                                        className="p-3 mb-0 form-control h100 lh-16" rows="5" placeholder="Write your message..." >

                                                                    </textarea>

                                                                    <ErrorMessage
                                                                        name='about'
                                                                        component="small"
                                                                        className="text-danger"
                                                                    />
                                                                </div>
                                                                {this.state.profileUpdated && (
                                                                    <div className='col-12'>
                                                                        <div className='alert alert-success'>
                                                                            profile updated successfully
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <div className="col-lg-12 d-flex justify-content-end">
                                                                    {!isSubmitting && (
                                                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">Update</button>
                                                                    )}
                                                                    {isSubmitting && (<ApiLoader />)}
                                                                </div>


                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>


                                            </form>
                                        )}
                                    </Formik>

                                )}
                                {/* **************** */}

                            </div>
                        </div>

                    </div>
                </div>

                <Popupchat />
                <Appfooter />
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        profileLoading: state.UserProfile.loading,
        profile: state.UserProfile.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // removePosts: (data) => {
        //     dispatch(ACTIONS.removePosts(data))
        // },
        loadProfile: (data) => {
            dispatch(ACTIONS.loadProfile(data))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account))