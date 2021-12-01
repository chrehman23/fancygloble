import React, { Component , Fragment } from "react";

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { connect } from 'react-redux'
import moment from 'moment'

import defaultUsrImage from '../../public/assets/images/user.png'
import ACTIONS from '../store/actions/index.js';
const notiList = [
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 minute ago',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '45 minute ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '1 hour ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '2 hour ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '5 hour ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'David Goria',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 hour ago',
        read: ''
    },

    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 minute ago',
        read: 'bg-lightblue theme-light-bg'
    },
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '45 minute ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '1 hour ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '2 hour ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '5 hour ago',
        read: ''
    },
    {
        imageUrl: 'user.png',
        name: 'David Goria',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 hour ago',
        read: 'bg-lightblue theme-light-bg'
    },
]


class Notification extends Component {
    componentDidMount(){
        this.props.openNotifys()
    }
    render() {
        return (

            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                    <div className="main-content theme-dark-bg right-chat-active">
                    
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-3 bg-white chat-wrapper w-100 position-relative scroll-bar theme-dark-bg">
                                            <h2 className="mt-2 mb-4 fw-700 font-md text-grey-900 d-flex align-items-center">Notification
                                            {this.props.Notify_length > 0 && (
                                                <span className="p-2 mt-0 text-white circle-count bg-warning font-xsssss rounded-3 ms-2 ls-3 fw-600">{this.props.Notify_length}</span>
                                            )}
                                            {/* <a href="/defaultnotification" className="ms-auto btn-round-sm bg-greylight rounded-3"><i className="feather-hard-drive font-xss text-grey-500"></i></a> 
                                            <a href="/defaultnotification" className="ms-2 btn-round-sm bg-greylight rounded-3"><i className="feather-alert-circle font-xss text-grey-500"></i></a> 
                                            <a href="/defaultnotification" className="ms-2 btn-round-sm bg-greylight rounded-3"><i className="feather-trash-2 font-xss text-grey-500"></i></a></h2> */}
                                        </h2>

                                            <ul className="notification-box">
                                            {this.props.Notify.map((data , index) => {
                                                return (
                                                    <li key={index}> 
                                                        <a href="#" className={`d-flex align-items-center p-3 rounded-3 border-bottom `}>
                                                            <img src={data.profile} alt="user" className="w45 me-3" />
                                                            {/* <i className={`text-white me-2 font-xssss notification-react feather-heart bg-red-gradiant`}></i> */}
                                                            <h6 className="mt-0 mb-0 font-xssss text-grey-900 fw-500 lh-20"><strong>{data.name}</strong> posted in : {data.des}<span className="mt-0 mb-0 d-block text-grey-500 font-xssss fw-600 0l-auto"> {moment(data.time).fromNow(true)}</span> </h6>
                                                            {/* <i className="ti-more-alt text-grey-500 font-xs ms-auto"></i> */}
                                                        </a>
                                                    </li>
                                                )
                                            })}

                                            </ul>
                                        {this.props.Notify && this.props.Notify.length == 0 && (
                                            <div className='px-1' style={{ minWidth: '200px' }}>
                                                <small className='color-theme-gray'>No notification found.</small>
                                            </div>
                                        )}
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
 
const mapStateToProps = (state) => {
    return {
        Notify: state.Nofify.notificaitons,
        Notify_length: state.Nofify.notificaitons.length,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openNotifys: (data) => {
            dispatch(ACTIONS.openNotify(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)