import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import { withRouter } from "react-router";
import socketConnection from '../socketConnection'

import StreamApi from '../api/Streams'
import UserProfile from '../../public/assets/images/user.png'
class Storie extends Component {
    constructor() {
        super()
        this.state = {
            Streams: []
        }
    }
    componentDidMount() {


        socketConnection.on('newStream',data=>{ 
            this.setState({
                Streams: [data, ...this.state.Streams]
            })
        })

        // StreamApi.liveStreamList().then(res => {
        //     console.log(res)
        //     if (res.data.Error == false) {
        //         this.setState({
        //             Streams: res.data.streams
        //         })
        //     }
        // }).catch(error => {
        //     console.log(error)
        // })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12">

                                    <Pagetitle title="Streaming" />
                                    <div className="row ps-2 pe-1">
                                        {this.state.Streams.map((data, index) => (
                                            <div
                                                onClick={() => { 
                                                    this.props.history.push(`/live-view/${data._id}`)
                                                }}
                                                key={index} className="col-md-3 col-xss-6 pe-2 ps-2 cursor-pointer">
                                                <div className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{ backgroundImage: `url("${data.user_id && data.user_id.profile_cover !== '' ? data.user_id && data.user_id.profile_cover : UserProfile}")` }}>
                                                    <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                                                        <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src={data.user_id && data.user_id.profile_photo !== "" ? data.user_id && data.user_id.profile_photo : UserProfile} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                                                        <div className="clearfix"></div>
                                                        <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">{data.user_id && data.user_id.name}</h4>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}


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

export default withRouter(Storie);