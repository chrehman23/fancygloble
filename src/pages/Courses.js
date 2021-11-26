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

class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: []
        }
    }
    componentDidMount() {
        CourseApi.allCourses().then(res => {
            this.setState({
                courses: res.data.data
            })
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

                <div className="main-content bg-courses  right-chat-active">

                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                        <h2 className="fw-700 mb-0  mt-0 font-md text-grey-900 d-flex justify-content-between align-items-center">
                                            <div className='d-none d-md-block'>Find Best Course</div>
                                            <div className='d-flex align-items-center justify-content-end  '>
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
                                                                type="text" className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
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


                                        {this.state.courses.map((value, index) => (

                                            <div key={index} className="col-lg-4 col-md-6 gy-5" >
                                                {/* <div className="card w-100 border-0 mt-4 shadow-xss pb-3">
                                                    <div className="card-image w-100 p-0 text-center cardImgesmd bg-greylight rounded-3 mb-2">
                                                        <img src={value.thumbnail} alt="product" className="w-100 mt-0 mb-0 rounded" />
                                                    </div>
                                                    <div className="card-body w-100 p-0 px-2 ">
                                                        <h2 className="fw-600 font-xsss mb-1 mt-0">{value.title}</h2>
                                                        <h6 className="font-xsss fw-600 text-grey-500 ls-2">${value.paid_amount} <del>${value.discount_amount}</del> </h6>
                                                        <div className='d-flex justify-content-between'>
                                                            <div>
                                                                <h2 className="fw-400 font-xssss mb-1 mt-0">{moment(this.state.start_date).format("dd/mm/yy hh:mm a")}</h2>
                                                            </div>
                                                            <div>
                                                                <button className='btn btn-primary bgthwh float-right'
                                                                    onClick={() => {
                                                                        this.props.history.push(`/course-detail/${value._id}`)
                                                                    }}
                                                                >View Course</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div> */}


                                            {/* Single Course   */}
                            <div className="recommended">
                             <div className="gig-item">
                            <a href="#">
                            <img className="img-fluid" src="https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/228760723/original/860f192f519c6ce72ac72be319b30b973a2cf046.png" />
                            </a>
                            <div className="inner-slider">
                                <div className="inner-wrapper">
                                    <div className="d-flex align-items-center">
                                        <span className="seller-image">
                                            <img className="img-fluid" src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4142ec1e86fd97a72819dcad08efefee-1573221169820/189b2594-657d-4687-a567-2077f63c4c1e.jpg" alt="" />
                                        </span>
                                        <span className="seller-name">
                                            <a href="#">Marcin Kowalski</a>
                                        <span className="level hint--top level-one-seller"> <i class="fas fa-chart-line me-1"> </i>Beginner</span>
                                    </span> 
                                    </div>
                                    <h3>I will create professional audio ads or radio commercials for your project</h3>
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
                                            <span className="starting-date"><i class="far fa-clock`"></i> Fri/33/2021 06:33 pm</span>
                                        </div>
                                    </div>
                                     <div className="footer">
                                    {/* <i className="fa fa-heart"></i> */}
                                    <div className="price">
                                        <a href="#"><span> $1,205</span></a>
                                    </div>
                                </div>
                                </div>
                               
                            </div>
                        </div>       

                        </div>
                                            </div>

                                        ))}


                                        {/* <div className="col-lg-12 mt-3 mb-5 text-center"><a href="/shop2" className="fw-700 text-white font-xssss text-uppercase  ls-3 lh-32 rounded-3 mt-3 text-center d-inline-block p-2 bgthwh    w150">Load More</a></div> */}
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