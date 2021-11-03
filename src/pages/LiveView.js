import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import DateCountdown from 'react-date-countdown-timer';

import AgoraRTC from "agora-rtc-sdk";

import StreamApi from '../api/Streams'
import LiveChat from "./LiveChat";

var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};



let live1

class Live extends Component {
    constructor(props) {
        super(props);
        this.client = {};
        this.stream = {};
        this.state = {
            hostStatus:false,
            loadingApi: false,
            token: "",
            channelName: '',
            uid: null,

            hostDisable:false,
            stream_id:""

        };
    }

    componentDidMount() {
        this.setState({ loadingApi: true, })
        let { id } = this.props.match.params
        let data = {
            stream_id: id
        }
        this.setState({
            stream_id:id
        })
        StreamApi.streamDetails(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    loadingApi: false,
                    token: res.data.stream.stream_token,
                    channelName: res.data.stream.chanal_name
                }, () => {
                    this.joinChannel("audience")
                })

            }

            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })

    }


    joinChannel = (role) => {
        var option = {
            appID: process.env.REACT_APP_AGORA_APP_KEY,
            // channel: this.props.,
            channel: this.state.channelName,
            uid: null,
            token: this.state.token,
            key: '',
            secret: ''
        }
        let thisReact = this
        // Create a client
        rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
        // Initialize the client
        rtc.client.init(option.appID, function () {
            console.log("init success");


            // Join a channel
            rtc.client.join(option.token ?
                option.token : null,
                option.channel, option.uid ? +option.uid : null, function (uid) {
                    console.log("join channel: " + option.channel + " success, uid: " + uid);
                    rtc.params.uid = uid;
                   
                    if (role === "audience") {
                        document.getElementById("remote_video_").innerHTML = "";
                        rtc.client.on("connection-state-change", function (evt) {
                            console.log("audience", evt) 
                           
                        })

                        rtc.client.on("stream-added", function (evt) {
                            document.getElementById("remote_video_").innerHTML = "";
                            var remoteStream = evt.stream;
                            var id = remoteStream.getId();
                            if (id !== rtc.params.uid) {
                                rtc.client.subscribe(remoteStream, function (err) {
                                    console.log("stream subscribe failed", err);
                                })
                            }
                            console.log('stream-added remote-uid: ', id);
                        });

                        rtc.client.on("stream-removed", function (evt) { 
                            document.getElementById("remote_video_").innerHTML = "";
                            var remoteStream = evt.stream;
                            var id = remoteStream.getId();
                            console.log('stream-removed remote-uid: ', id);
                            // thisReact.setState({
                            //     hostStatus: false
                            // })
                        });
                        
                        
                        rtc.client.on("stream-subscribed", function (evt) { 
                            var remoteStream = evt.stream;
                            var id = remoteStream.getId();
                            remoteStream.play("remote_video_");
                            console.log('stream-subscribed remote-uid: ', id);
                            
                            thisReact.setState({
                                hostStatus:true
                            })
                        })

                        rtc.client.on("stream-unsubscribed", function (evt) { 
                            thisReact.setState({
                                hostStatus: false
                            }) 
                           
                            var remoteStream = evt.stream;
                            var id = remoteStream.getId();
                            remoteStream.pause("remote_video_");
                           
                            console.log('stream-unsubscribed remote-uid: ', id);
                        })
                    }
                }, function (err) { 
                 
                    console.error("client join failed", err)
                })

        }, (err) => {
            console.error(err);
        });
    }


   

   

    render() {
        let { data } = this.state
        return (
            <Fragment>
                <Header />
                <Leftnav />
                <Rightchat />



                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" style={{ maxWidth: "100%" }}>
                            <div className="row">
                                <div className="col-xl-8 col-xxl-9 col-lg-8">
                                    {this.state.loadingApi && (
                                        <div className='d-flex justify-content-center align-items-center w-100' style={{ height: "400px" }} >
                                           Loading....
                                        </div>
                                    )}
                                    {!this.state.loadingApi && !this.state.hostStatus &&  (
                                        <div className='d-flex justify-content-center align-items-center w-100' style={{ height: "400px" }} >
                                            Waiting for host....
                                        </div>
                                    )}
                                    {/* {this.state.hostStatus && "host is live"} */} 
                                    <div className={`vedioStrimingsContainer ${this.state.loadingApi ? "d-none" : ""}`}>
                                        {/* <div className='liveBtn'>
                                            <button className='btn btn-danger lookingAud '>
                                                <i className="ti-eye mt-1  pr-2"></i> 33
                                            </button>
                                            <button className='btn btn-danger ml-2'>Live</button>
                                        </div> */}

                                        <div id="remote_video_" className='w-100 h-100' />
                                    </div>


                                   
                                    {/* **************************************************************** */}


                                    {/* **************************************************************** */}
                                    <div className="card border-0 mb-0 rounded-3 overflow-hidden chat-wrapper bg-image-center bg-image-cover d-none"
                                        style={{ backgroundImage: `url("https://via.placeholder.com/975x700.png")` }}>
                                        <div className="card-body position-absolute mt-0 ms-0 left-0">
                                            <img src="https://via.placeholder.com/75x100.png" alt="video-bg" className="w150 h200 rounded-3 position-relative z-index-1 shadow-xss" />
                                        </div>
                                        <div className="card-body text-center p-2 position-absolute w-100 bottom-0 bg-gradiant-bottom">
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 me-0 z-index-1"><i className="feather-grid text-white font-md"></i></a>
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 z-index-1"><i className="feather-mic-off text-white font-md"></i></a>
                                            <a href="/defaultlivestream" className="btn-round-xxl bg-danger z-index-1"><i className="feather-phone-off text-white font-md"></i></a>
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 z-index-1"><i className="ti-video-camera text-white font-md"></i></a>
                                            <a href="/defaultlivestream" className="btn-round-xl d-md-inline-block d-none bg-blur m-3 ms-0 z-index-1"><i className="ti-settings text-white font-md"></i></a>
                                            <span className="p-2 bg-blur z-index-1 text-white fw-700 font-xssss rounded-3 right-15 position-absolute mb-4 bottom-0">44:00</span>
                                            <span className="live-tag position-absolute left-15 mt-2 bottom-0 mb-4 bg-danger p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3">LIVE</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                                    {this.state.stream_id && <LiveChat stream_id={this.state.stream_id} />} 
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

export default Live;