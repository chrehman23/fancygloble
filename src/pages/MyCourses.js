import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Slider from "react-slick";
import image from '../../public/assets/courses/1.jpg';

import CourseApi from "../api/Courses";
import ContentLoader, { Facebook } from 'react-content-loader'
 

class MyCourses extends Component {

    constructor(){
        super();
        this.state = {
            courses:[],
            apiLoader: true,
        }
    }
    componentDidMount(){
        CourseApi.myCourses().then(res=>{
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

                <div className="bg-white main-content right-chat-active">

                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-12">
                                    <div className="p-4 mb-3 border-0 card shadow-xss w-100 d-block d-flex">
                                        <h2 className="mt-0 mb-0 fw-700 font-md text-grey-900 d-flex justify-content-between align-items-center">
                                            <div className='d-none d-md-block'>My Course</div>
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
                                                            this.props.history.push('/courses')
                                                        }}
                                                    >All Course</button>
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
                                    <div className="row">
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

                                            <div key={index} className="col-lg-4 col-md-6" >
                                                <div className="pb-3 mt-4 border-0 card w-100 shadow-xss">
                                                    <div className="p-0 mb-2 text-center card-image w-100 cardImgesmd bg-greylight rounded-3">
                                                        <img src={value.thumbnail} alt="product" className="mt-0 mb-0 rounded w-100" /> 
                                                    </div>
                                                    <div className="p-0 px-2 card-body w-100 ">
                                                        <h2 className="mt-2 mb-1"><a href="/singleproduct" className="text-black fw-700 font-xsss lh-26">{value.title}</a></h2>
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <h6 className="font-xsss fw-600 text-grey-500 ls-2">${value.paid_amount} <del>${value.discount_amount}</del> </h6>
                                                                <span className='rounded bg-gray'>{value.publish?"Publish":"Unpublish"}</span>
                                                            </div>
                                                            <div>
                                                                <button className='float-right btn btn-primary bgthwh'
                                                                    onClick={() => {
                                                                        localStorage.setItem('add_course_id',value._id)
                                                                        this.props.history.push('/add-course')
                                                                    }}
                                                                >Edit Course</button>
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

export default MyCourses;