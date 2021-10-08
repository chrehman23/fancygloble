import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import DateCountdown from 'react-date-countdown-timer';
import socketConnection from '../socketConnection'
import AgoraRTC from "agora-rtc-sdk";

import StreamApi from '../api/Streams'

var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};

// Options for joining a channel
var option = {
    appID: "3bafbaf2769949c2917f7b86647d9954",
    channel: "Admin",
    // channel: "testch`annelName",
    uid: null,
    token: "0063bafbaf2769949c2917f7b86647d9954IAA1xPN7j2nPMqItcDGBDhrDDSBBO1Y0KDE0X0mVcWHx93Iiz0kAAAAAIgCLsw7gyzJgYQQAAQDP5F5hAgDP5F5hAwDP5F5hBADP5F5h",
    // token: "0063bafbaf2769949c2917f7b86647d9954IACB5yuF7+7VLMEmORYVxVtFqusH7YyDSxQnXS/SEVmTv0dZp/YAAAAAIgA93NsA9/5eYQQAAQCHu11hAgCHu11hAwCHu11hBACHu11h",
    key: '',
    secret: ''
}

let live1

class Live extends Component {
    constructor(props) {
        super(props);
        this.client = {};
        this.stream = {};
        this.state = {
            token: "",
            channelName: '',
            uid: null,

            goLive: false,
            goLiveLoader: false,
            strimeLiveStatus: false,
            goLiveAnimationBtn: false,

            StreamDetails_id:"",
            StreamDetails:{}

        };
    }
    componentDidMount() {
    }


    joinChannel = (role) => {
        let thisReact = this
        // ********************************
        var option = {
            appID: process.env.REACT_APP_AGORA_APP_KEY,
            channel: this.state.channelName,
            token: this.state.token,
            uid: null,
            key: '',
            secret: ''
        }

        console.log(option)
        // ********************************
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
                    if (role === "host") {
                        rtc.client.setClientRole("host");
                        // Create a local stream
                        rtc.localStream = AgoraRTC.createStream({
                            streamID: rtc.params.uid,
                            audio: true,
                            video: true,
                            screen: false,
                        })
                        // Initialize the local stream
                        rtc.localStream.init(function () {
                            console.log("init local stream success");
                            document.getElementById("local_stream").innerHTML = "";
                            rtc.localStream.play("local_stream");

                            thisReact.setState({ goLive: true, strimeLiveStatus: true, })
                            rtc.client.publish(rtc.localStream, function (err) {
                                console.log("publish failed");
                                thisReact.setState({ goLive: true, strimeLiveStatus: false })
                                console.error(err);
                            })
                        }, function (err) {
                            console.error("init local stream failed ", err);
                        });

                        rtc.client.on("connection-state-change", function (evt) {
                            console.log("audience", evt)
                        })


                    }
                    if (role === "audience") {
                        rtc.client.on("connection-state-change", function (evt) {
                            console.log("audience", evt)
                        })

                        rtc.client.on("stream-added", function (evt) {
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
                            var remoteStream = evt.stream;
                            var id = remoteStream.getId();
                            console.log('stream-removed remote-uid: ', id);
                        });

                        rtc.client.on("stream-subscribed", function (evt) {
                            var remoteStream = evt.stream;
                            var id = remoteStream.getId();
                            remoteStream.play("remote_video_");
                            console.log('stream-subscribed remote-uid: ', id);
                        })

                        rtc.client.on("stream-unsubscribed", function (evt) {
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

    leaveEventHost = (params) => {
        rtc.client.unpublish(rtc.localStream, function (err) {
            console.log("publish failed");
            console.error(err);
        })
        rtc.client.leave(function (ev) {
            console.log(ev)
        })
    }

    leaveEventAudience = (params) => {
        rtc.client.leave(function () {
            console.log("client leaves channel");
            //……
        }, function (err) {
            console.log("client leave failed ", err);
            //error handling
        })
    }

    goLiveAnimationBtn = () => {
        setInterval(() => {
            if (this.state.goLiveAnimationBtn == true) {
                this.setState({ goLiveAnimationBtn: false })
            } else {
                this.setState({ goLiveAnimationBtn: true })
            }
        }, 1000);
    }

    createStream = () => {
        StreamApi.goLive().then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    token: res.data.stream.stream_token,
                    channelName: res.data.stream.chanal_name,
                    StreamDetails:res.data.stream,
                    StreamDetails_id:res.data.stream._id,
                }, () => {
                    this.joinChannel('host')
                })

            }
        }).catch(error => {
            console.log(error)
        })
    }

    leaveStream = (id) => {
        socketConnection.emit("remove_stream", this.state.StreamDetails_id)
    }
    aginStreamLive = () => {
        socketConnection.emit("gain_stream_live", this.state.StreamDetails)
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
                                    {/* *********************************************** */}
                                    {!this.state.goLiveLoader && !this.state.goLive && (
                                        <div className='d-flex bg-greylight rounded mx-2 align-items-center justify-content-center'
                                            style={{ width: "100%", height: '100%' }}
                                        >
                                            <button
                                                onClick={() => {
                                                    this.setState({ goLiveLoader: true }, () => {
                                                        this.goLiveAnimationBtn()
                                                        this.createStream()
                                                    })
                                                }}
                                                className='btn btn-danger'>Go Live</button>
                                        </div>
                                    )}
                                    {this.state.goLiveLoader && !this.state.goLive && (
                                        <div className='d-flex bg-greylight rounded mx-2 align-items-center justify-content-center'
                                            style={{ width: "100%", height: '100%' }}
                                        >
                                            <button className='btn btn-danger'>Loading....</button>
                                        </div>
                                    )}
                                    <div className={`vedioStrimingsContainer ${this.state.goLive ? "" : "d-none"}`}>
                                        <div className='liveBtn'>
                                            {/* <button className='btn btn-danger lookingAud '>
                                                <i className="ti-eye mt-1  pr-2"></i> 33
                                            </button> */}
                                            {this.state.goLive &&
                                                this.state.strimeLiveStatus &&
                                                this.state.goLiveAnimationBtn && (
                                                    <button className='btn btn-danger ml-2'>Live</button>
                                                )}


                                        </div>

                                        {/* <button className='btn btn-danger goLiveTimer'>
                                            <DateCountdown dateTo='January 01, 2023 00:00:00 GMT+03:00' callback={() => alert('Hello')} />
                                        </button> */}



                                        <div id="local_stream" className="local_stream" />
                                        {this.state.strimeLiveStatus && (
                                            <div className='liveBtnEnd'
                                                onClick={() => {
                                                    this.setState({ strimeLiveStatus: false }, () => {
                                                        this.leaveStream();
                                                        this.leaveEventHost('host');
                                                    })
                                                }}
                                            >
                                                <button className='btn btn-danger'>End</button>
                                            </div>
                                        )}

                                        {!this.state.strimeLiveStatus && (
                                            <div className='liveBtnEnd'
                                                onClick={() => {
                                                    this.setState({ strimeLiveStatus: true }, () => {
                                                        this.aginStreamLive()
                                                        this.joinChannel('host')
                                                    })
                                                }}
                                            >
                                                <button className='btn btn-danger'>Go Live</button>
                                            </div>
                                        )}

                                        {/* <div id="remote_video_" style={{ width: "100%", height: "100%" }}  /> */}
                                    </div>

                                    {/* **************************************************************** */}
                                    {/* <button onClick={() => this.joinChannel('host')}>Join Channel as Host</button>
                                    <button onClick={() => this.joinChannel('audience')}>Join Channel as Audience</button>
                                    <button onClick={() => this.leaveEventHost('host')}>Leave Event Host</button>
                                    <button onClick={() => this.leaveEventAudience('audience')}>Leave Event Audience</button> */}

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
                                    <div className="card w-100 d-block chat-body p-0 border-0 shadow-xss rounded-3 mb-3 position-relative">
                                        <div className="messages-content chat-wrapper scroll-bar p-3">
                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I'm fine, how are you</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I want those files for you. I want you to send 1 PDF and 1 image file.</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I've found some cool photos for our travel app.</div>
                                            </div>

                                            <div className="message-item outgoing-message">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5>You</h5>
                                                        <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap">Hey mate! How are things going ?</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I'm fine, how are you.</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM<i className="ti-double-check text-info"></i></div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I want those files for you. I want you to send 1 PDF and 1 image file.</div>
                                            </div>

                                            <div className="message-item">
                                                <div className="message-user">
                                                    <figure className="avatar">
                                                        <img src="assets/images/user.png" alt="avater" />
                                                    </figure>
                                                    <div>
                                                        <h5 className="font-xssss mt-2">Byrom Guittet</h5>
                                                        <div className="time">01:35 PM</div>
                                                    </div>
                                                </div>
                                                <div className="message-wrap shadow-none">I've found some cool photos for our travel app.</div>
                                            </div>

                                        </div>
                                        <form className="chat-form position-absolute bottom-0 w-100 left-0 bg-white z-index-1 p-3 shadow-xs theme-dark-bg ">
                                            <button className="bg-grey float-left"><i className="ti-microphone text-white"></i></button>
                                            <div className="form-group"><input type="text" placeholder="Start typing.." /></div>
                                            <button className="bg-current"><i className="ti-arrow-right text-white"></i></button>
                                        </form>
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

export default Live;