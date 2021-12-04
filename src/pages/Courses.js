import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Slider from "react-slick";
import image from '../../public/assets/courses/1.jpg';

import CourseApi from "../api/Courses";

import moment from "moment";
import ContentLoader, { Facebook } from 'react-content-loader'
class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: [],
            apiLoader: true,
        }
    }
    componentDidMount() {
        CourseApi.allCourses().then(res => {
            if (res.data.Error == false) {
                this.setState({
                    courses: res.data.data,
                    apiLoader: false,
                })
            }

        })
    }

    render() {
        const sliderstyle = {
            paddingRight: 20 + '!important',
        }
        const shopsettings = {
            arrows: true,
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
        };
        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-courses right-chat-active">

                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-12">
                                    <div className="p-4 mb-3 border-0 card shadow-xss w-100 d-block d-flex">
                                        <h2 className="mt-0 mb-0 fw-700 font-md text-grey-900 d-flex justify-content-between align-items-center">
                                            <div className='d-none d-md-block'>Find Best Course</div>
                                            <div className='d-flex align-items-center justify-content-end '>
                                                <div>
                                                    <button className='btn btn-primary bgthwh'
                                                        onClick={() => {
                                                            localStorage.removeItem('add_course_id')
                                                            this.props.history.push('/add-course')
                                                        }}
                                                    >Add Course</button>
                                                </div>
                                                <div>
                                                    <button className='btn btn-primary bgthwh ms-2'
                                                        onClick={() => {
                                                            this.props.history.push('/my-courses')
                                                        }}
                                                    >My Course</button>
                                                </div>
                                                {/* <div>
                                                    <form action="#" className="pt-0 pb-0 ms-auto">
                                                        <div className="search-form-2 ms-2">
                                                            <i className="ti-search font-xss"></i>
                                                            <input
                                                                type="text" className="mb-0 border-0 form-control text-grey-500 bg-greylight theme-dark-bg" placeholder="Search here." />
                                                        </div>
                                                    </form>

                                                </div> */}
                                            </div>


                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    <div className="row bg-courses">
                                        {this.state.apiLoader && (
                                            <>
                                                <div className="col-lg-4 col-md-6 gy-3">
                                                    <div className="bg-white card">
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <br />
                                                        <div className='px-3'>
                                                            <Facebook />
                                                        </div>
                                                        <br />  <br />


                                                    </div>
                                                </div>  <div className="col-lg-4 col-md-6 gy-3">
                                                    <div className="bg-white card">
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <br />
                                                        <div className='px-3'>
                                                            <Facebook />
                                                        </div>
                                                        <br />  <br />


                                                    </div>
                                                </div>  <div className="col-lg-4 col-md-6 gy-3">
                                                    <div className="bg-white card">
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <ContentLoader viewBox="0 0 380 70">
                                                            {/* Only SVG shapes */}
                                                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="300px" />
                                                        </ContentLoader>
                                                        <br />
                                                        <div className='px-3'>
                                                            <Facebook />
                                                        </div>
                                                        <br />  <br />


                                                    </div>
                                                </div>
                                            </>
                                          
                                        )}
                                       


                                        {!this.state.apiLoader && this.state.courses.map((value, index) => (

                                            <div key={index} className="col-lg-4 col-md-6 gy-3" >
                                                {/* <div className="pb-3 mt-4 border-0 card w-100 shadow-xss">
                                                    <div className="p-0 mb-2 text-center card-image w-100 cardImgesmd bg-greylight rounded-3">
                                                        <img src={value.thumbnail} alt="product" className="mt-0 mb-0 rounded w-100" />
                                                    </div>
                                                    <div className="p-0 px-2 card-body w-100 ">
                                                        <h2 className="mt-0 mb-1 fw-600 font-xsss">{value.title}</h2>
                                                        <h6 className="font-xsss fw-600 text-grey-500 ls-2">${value.paid_amount} <del>${value.discount_amount}</del> </h6>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h2 className="mt-0 mb-1 fw-400 font-xssss">{moment(this.state.start_date).format("dd/mm/yy hh:mm a")}</h2>
                                                            </div>
                                                            <div>
                                                                <button className='float-right btn btn-primary bgthwh'
                                                                    onClick={() => {
                                                                        this.props.history.push(`/course-detail/${value._id}`)
                                                                    }}
                                                                >View Course</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div> */}


                                                {/* Single Course   */}
                                                <div className="recommended"
                                                    onClick={() => {
                                                        this.props.history.push(`/course-detail/${value._id}`)
                                                    }}
                                                >
                                                    <div className="gig-item">
                                                        <a href="#">
                                                            <img className="img-fluid" src={value.thumbnail} />
                                                        </a>
                                                        <div className="inner-slider">
                                                            <div className="inner-wrapper">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="seller-image">
                                                                        <img className="img-fluid" src={value.created_by && value.created_by.profile_photo} alt="" />
                                                                    </span>
                                                                    <span className="seller-name">
                                                                        <a href="#">{value.title}</a>
                                                                        <span className="level hint--top level-one-seller"> <i class="fas fa-chart-line me-1"> </i>{value.course_level}</span>
                                                                    </span>
                                                                </div>
                                                                <h3 className='mb-0'>
                                                                    {value.description && value.description.substring(0, 30)}
                                                                    {value.description && value.description.length > 30 && "..."}
                                                                    {/* {JSON.stringify(value.start_date,null,2)} */}
                                                                </h3>
                                                                <div className="content-info">
                                                                    <div className="rating-wrapper">
                                                                        {/* <span className="gig-rating">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                                                <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                                </path>
                                                </svg>
                                                5.0
                                                <span>(7)</span>
                                            </span> */}
                                                                        <span className="starting-date"><i class="far fa-clock"></i> {moment(value.start_date).format("YYYY-MM-DD HH:mm a")}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="footer ">
                                                                    {/* <i className="fa fa-heart"></i> */}
                                                                    <div></div>
                                                                    <div className="price">
                                                                        <div>
                                                                            <a href="#"><span>€{value.paid_amount} <del>{value.discount_amount > 0 && (`€${value.discount_amount}`)}</del></span></a>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        {/* <button className='float-right btn btn-primary bgthwh'
                                                                            onClick={() => {
                                                                                this.props.history.push(`/course-detail/${value._id}`)
                                                                            }}
                                                                        >View Course</button> */}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        ))}


                                        {/* <div className="mt-3 mb-5 text-center col-lg-12"><a href="/shop2" className="p-2 mt-3 text-center text-white fw-700 font-xssss text-uppercase ls-3 lh-32 rounded-3 d-inline-block bgthwh w150">Load More</a></div> */}
                                    </div>
                                </div>
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

export default Courses;