import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import DateCountdown from 'react-date-countdown-timer';
import socketConnection from '../socketConnection'
import AgoraRTC from "agora-rtc-sdk";
import { connect } from 'react-redux';
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

            StreamDetails_id: "",
            StreamDetails: {},
            massages: [],

            stream_chat_input: "",

            camera_allow: false,
            loading_camera: true

        };
    }
    componentDidMount() {

        socketConnection.on('stream_massage', data => {
            if (data.stream_id == this.state.StreamDetails_id) {
                if (data.user._id == this.props.user_id) {
                    data.send_by = 'me'
                }
                this.setState({
                    massages: [...this.state.massages, data],

                })
            }

        })


        var options = {
            video: true,
            audio: true
        };

        let this_react = this

        navigator.webkitGetUserMedia(options,
            function (stream) {
                console.log("streaming is okay");
                this_react.setState({
                    camera_allow: true,
                    loading_camera: false
                })
            },
            function (e) {
                console.log("background error : " + e.name);
                this_react.setState({
                    camera_allow: false,
                    loading_camera: false
                })
            });


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
                            screen: true,
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
            console.log("aaaaaaaaaaaaaaa", ev)
        })
    }

    leaveEventAudience = (params) => {
        rtc.client.leave(function () {
            console.log('params', params)
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
        let event_id = this.props.match.params.id
        let data = {
            lecture_id: event_id
        }
        StreamApi.startLiveLecture(data).then(res => {
            console.log(res)
            if (res.data.Error == false) {
                this.setState({
                    token: res.data.data.stream_token,
                    channelName: res.data.data.chanal_name,
                    StreamDetails_id: res.data.data._id,
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

    streamChat = () => {
        let data = {
            stream_id: this.state.StreamDetails_id,
            massage: this.state.stream_chat_input,
        }
        StreamApi.streamChat(data).then(res => {
            if (res.data.Error == false) {
                let data = res.data.data
                if (res.data.data.user._id == this.props.user_id) {
                    data.send_by = 'me'
                }
                this.setState({
                    // massages: [...this.state.massages, data],
                    stream_chat_input: ""
                })
            }
        })
    }

    componentWillUnmount() {
        if (this.state.StreamDetails_id) {
            this.leaveEventHost('host');
        }
        window.location.reload()

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
                            {!this.state.loading_camera && !this.state.camera_allow && (
                                <div className='row'>
                                    <div className="col-12">
                                        <p className='px-5 text-danger mt-5 pt-5'><b>App do not have permission to access your camera and mic.Allow app to access your camera and mic.</b></p>
                                    </div>
                                </div>
                            )}
                            {!this.state.loading_camera && this.state.camera_allow && (
                                <div className="row">
                                    <div className="col-xl-8 col-xxl-9 col-lg-8">

                                        {/* *********************************************** */}
                                        {!this.state.goLiveLoader && !this.state.goLive && (
                                            <div className='d-flex bg-greylight rounded mx-2 align-items-center justify-content-center'

                                                style={{ width: "100%", height: '100%', minHeight: '70vh' }}
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
                                                style={{ width: "100%", height: '100%', minHeight: '70vh' }}
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
                                        {/* <div className="card border-0 mb-0 rounded-3 overflow-hidden chat-wrapper bg-image-center bg-image-cover d-none"
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
                                        </div> */}
                                    </div>

                                    <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0 ps-0">
                                        {this.state.StreamDetails_id && <LiveChat stream_id={this.state.StreamDetails_id} />}



                                    </div>
                                </div>
                            )}


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
        user_id: state.UserProfile.profile._id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // removePosts: (data) => {
        //     dispatch(ACTIONS.removePosts(data))
        // },
        // loadProfile: (data) => {
        //     dispatch(ACTIONS.loadProfile(data))
        // },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Live)