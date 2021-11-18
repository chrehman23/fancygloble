import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Darkbutton from '../components/Darkbutton';
import Notify from './Notify';

import ACTIONS from '../store/actions/index.js';
import { connect } from 'react-redux'
import socketConnection from '../socketConnection'
import Logo from '../../public/assets/images/logo.png'

import chatApi from '../api/chat'
import ContentLoader from 'react-content-loader'

class Header extends Component {
    state = {
        isOpen: false,
        isActive: false,
        isNoti: false,

        chatUsers: [],

        activeChat: "",
        chatLoader: false,

        reloading_rooms: false,
    };

    componentDidMount() {
        let { id } = this.props.match.params
        this.setState({
            activeChat: id
        })
        if (this.props.showChat) {
            this.setState({
                chatLoader: true
            })
            chatApi.findRoomsByUser().then(res => {
                if (res.data.Error == false) {
                    this.setState({
                        chatUsers: res.data.data,
                        chatLoader: false
                    })
                    this.props.addRooms(res.data.data)
                }
            })
        }
        if (this.props.openSideBar) {
            this.setState({ isOpen: true })
        }



        socketConnection.on('room_sms', data => {
            let { id } = this.props.match.params
            if (data.room !== id) {
                this.props.updateRoom(data);
                console.log(data)
                let notification = {
                    name: data.user.name,
                    profile: data.user.profile_photo,
                    des: "Sent you a massage.",
                    time: new Date()
                }
                this.props.addnotificaions(notification)
                this.setState({
                    reloading_rooms: true
                }, () => {
                    this.setState({
                        reloading_rooms: false
                    })
                })

            }
        })
        socketConnection.on('user_ofline', data => {
            console.log("data", data)
            this.props.update_user_room(data);
            this.setState({
                reloading_rooms: true
            }, () => {
                this.setState({
                    reloading_rooms: false
                })
            })
        })

    }

    componentWillUnmount() {
        socketConnection.off('user_ofline');
        socketConnection.off('room_sms');
    }

    componentDidUpdate(prevProps, prevState,) {
        let { id } = this.props.match.params
        if (prevProps.match.params.id !== id) {
            this.setState({
                activeChat: id
            })
            this.props.showRoom(id)
        }
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    toggleActive = () => this.setState({ isActive: !this.state.isActive });
    toggleisNoti = () => this.setState({ isNoti: !this.state.isNoti });

    render() {
        const navClass = `${this.state.isOpen ? " nav-active" : ""}`;
        const buttonClass = `${this.state.isOpen ? " active" : ""}`;
        const searchClass = `${this.state.isActive ? " show" : ""}`;
        const notiClass = `${this.state.isNoti ? " show" : ""}`;

        return (
            <div className="nav-header  shadow-xs border-0">
                <div className="nav-top  h-100 headerScrolChange ">
                    {/* <Link to="/"><i className="feather-zap text-success display2-size me-3 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </Link> */}
                    <Link to="/">
                        <img src="/assets/images/logo.png" style={{ height: "55px" }} />
                        {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                        <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                            Sociala.
                        </span> */}
                    </Link>
                    <Link to="/defaultmessage" className="mob-menu ms-auto me-2 chat-active-btn"><i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i></Link>
                    <Link to="/defaultvideo" className="mob-menu me-2"><i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i></Link>
                    <span onClick={this.toggleActive} className="me-2 menu-search-icon mob-menu"><i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></span>
                    <button onClick={this.toggleOpen} className={`nav-menu me-0 ms-2 ${buttonClass}`}></button>
                </div>

                <form action="#" className="float-left header-search ms-3">
                    <div className="form-group mb-0 icon-input">
                        <i className="feather-search font-sm text-grey-400"></i>
                        <input type="text" placeholder="Start typing to search.." className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg" />
                    </div>
                </form>
                <NavLink activeClassName="active" to="/home" className="p-2 text-center ms-3 menu-icon center-menu-icon"><i className="feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/events" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="ti-calendar font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/courses" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-book font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/defaultgroup" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-user font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/shop2" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-shopping-bag font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>


                <span className={`p-2 pointer text-center ms-auto menu-icon ${notiClass}`} id="dropdownMenu3" data-bs-toggle="dropdown" aria-expanded="false"
                    onClick={() => {
                        this.toggleisNoti()
                        this.props.openNotifys()
                    }}
                >
                    <span className={this.props.NotifyStatus ? "dot-count bg-warning" : ""}  ></span><i className="feather-bell font-xl text-current"></i></span>
                <div className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${notiClass}`} aria-labelledby="dropdownMenu3">
                    <h4 className="fw-700 font-xss mb-4">Notification</h4>
                    <Notify />




                </div>
                <Link to="/defaultmessage" className="p-2 text-center ms-3 menu-icon chat-active-btn"><i className="feather-message-square font-xl text-current"></i></Link>
                <Darkbutton />

                {/* <Link to="/defaultsettings" className="p-0 ms-3 menu-icon"><img src="assets/images/user.png" alt="user" className="w40 mt--1" /></Link> */}
                <Link to="/defaultsettings" className="p-2 text-center ms-3 menu-icon chat-active-btn">  <i className="feather-menu font-lg text-grey-500 "></i></Link>

                <nav className={`navigation scroll-bar ${navClass} ${this.props.showChat ? "d-none" : ""}`}>
                    <div className="container ps-0 pe-0">
                        <div className="nav-content">
                            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                                <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                                <ul className="mb-1 top-content">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li><Link to="/home" className="nav-content-bttn open-font"><i className="feather-tv btn-round-md bg-blue-gradiant me-3"></i><span>Newsfeed</span></Link></li>
                                    {/* <li><Link to="/defaultbadge" className="nav-content-bttn open-font"><i className="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Badges</span></Link></li> */}
                                    {/* <li><Link to="/" className="nav-content-bttn open-font"><i className="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Badges</span></Link></li> */}
                                    {/* <li><Link to="/defaultstorie" className="nav-content-bttn open-font"><i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i><span>Explore Stories</span></Link></li> */}
                                    <li><Link to="/users" className="nav-content-bttn open-font"><i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i><span>Explore</span></Link></li>
                                    {/* <li><Link to="/" className="nav-content-bttn open-font"><i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i><span>Popular Groups</span></Link></li> */}
                                    {/* <li><Link to="/defaultgroup" className="nav-content-bttn open-font"><i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i><span>Popular Groups</span></Link></li> */}
                                    <li><Link to="/userpage" className="nav-content-bttn open-font"><i className="feather-user btn-round-md bg-primary-gradiant me-3"></i><span>My Profile </span></Link></li>
                                </ul>
                            </div>

                            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
                                <div className="nav-caption fw-600 font-xssss text-grey-500"><span>More </span>Pages</div>
                                <ul className="mb-3">
                                    {/* <li><Link to="/defaultemailbox" className="nav-content-bttn open-font"><i className="font-xl text-current feather-inbox me-3"></i><span>Email Box</span><span className="circle-count bg-warning mt-1">584</span></Link></li> */}
                                    {/* <li><Link to="/defaulthotel" className="nav-content-bttn open-font"><i className="font-xl text-current feather-home me-3"></i><span>Near Hotel</span></Link></li> */}
                                    <li><Link to="/events" className="nav-content-bttn open-font"><i className="font-xl text-current feather-map-pin me-3"></i><span>Latest Event</span></Link></li>
                                    <li><Link to="/defaultstorie" className="nav-content-bttn open-font"><i className="font-xl text-current feather-youtube me-3"></i><span>Live Stream</span></Link></li>
                                </ul>
                            </div>
                            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                                <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account</div>
                                <ul className="mb-1">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li><Link to="/defaultsettings" className="nav-content-bttn open-font h-auto pt-2 pb-2"><i className="font-sm feather-settings me-3 text-grey-500"></i><span>Settings</span></Link></li>
                                    <li><Link to="/defaultanalytics" className="nav-content-bttn open-font h-auto pt-2 pb-2"><i className="font-sm feather-pie-chart me-3 text-grey-500"></i><span>Analytics</span></Link></li>
                                    <li><Link to="/defaultmessage" className="nav-content-bttn open-font h-auto pt-2 pb-2"><i className="font-sm feather-message-square me-3 text-grey-500"></i><span>Chat</span><span className="circle-count bg-warning mt-0 d-none">23</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav className={`navigation scroll-bar ${navClass} ${this.props.showChat ? "" : "d-none"}`}>
                    <div className="container ps-0 pe-0">
                        <div className="nav-content">
                            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2" style={{ minHeight: '90vh' }}>
                                <div className="nav-caption fw-600 font-xssss text-grey-500">Followers and Followings</div>
                                <ul className="mb-1 top-content">
                                    {/* {JSON.stringify(this.props.Rooms[0] && this.props.Rooms[0].un_read,null,2)} */}
                                    {!this.state.reloading_rooms && this.props.Rooms.map((data, index) => {
                                        return (
                                            <li key={index}>
                                                <div
                                                    onClick={() => {
                                                        this.setState({ isOpen: !this.state.isOpen })
                                                        this.props.history.push(`/room/${data.room_id}`)
                                                    }}
                                                    className={`nav-content-bttn open-font UserChatContainer ${this.state.activeChat == data.room_id ? "actives" : ""}`}
                                                >
                                                    <div className={`UserChatWraper `}>
                                                        <div>
                                                            <div>  <img src={data.user && data.user.profile_photo} alt="" /></div>
                                                        </div>
                                                        <div>
                                                            <h5 className=''>{data.user && data.user.name}</h5>
                                                            <small className={data.un_read > 0 ? "new" : ""}>
                                                                {data.last_message && data.last_message.content && data.last_message.content.substring(0, 10)}
                                                                {data.last_message && data.last_message.content && data.last_message.content && data.last_message.content.length > 10 && "..."}
                                                                {data.update_at == "" && data.user && data.user.user_name}
                                                            </small>
                                                        </div>
                                                        {data.online && (
                                                            <div className='online_status'></div>
                                                        )}
                                                        {data.un_read > 0 && (
                                                            <div className='unread_sms'>
                                                                <div><small>{data.un_read}</small></div>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                    {this.state.chatLoader && (
                                        <li>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>
                                            <ContentLoader
                                                speed={2}
                                                // width={'100%'}
                                                height={45}
                                                // viewBox="0 0 400 160"
                                                backgroundColor="#f3f3f3"
                                                foregroundColor="#ecebeb"
                                            >
                                                <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                                                <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                                                <circle cx="20" cy="20" r="20" />
                                            </ContentLoader>

                                        </li>
                                    )}



                                </ul>
                            </div>



                        </div>
                    </div>
                </nav>

                <div className={`app-header-search ${searchClass}`}>
                    <form className="search-form">
                        <div className="form-group searchbox mb-0 border-0 p-1">
                            <input type="text" className="form-control border-0" placeholder="Search..." />
                            <i className="input-icon">
                                <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                            </i>
                            <span className="ms-1 mt-1 d-inline-block close searchbox-close">
                                <i className="ti-close font-xs" onClick={this.toggleActive}></i>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        NotifyStatus: state.Nofify.new,
        Rooms: state.Rooms,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openNotifys: (data) => {
            dispatch(ACTIONS.openNotify(data))
        },
        addRooms: (data) => {
            dispatch(ACTIONS.addRooms(data))
        },
        showRoom: (data) => {
            dispatch(ACTIONS.showRoom(data))
        },
        updateRoom: (data) => {
            dispatch(ACTIONS.updateRoom(data))
        },
        addnotificaions: (data) => {
            dispatch(ACTIONS.addnotificaion(data))
        },
        update_user_room: (data) => {
            dispatch(ACTIONS.update_user_room(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))


