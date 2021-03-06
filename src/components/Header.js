import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Darkbutton from '../components/Darkbutton';
import Notify from './Notify';
import PostSound from '../../public/assets/sounds/post_sound.mp3'
import ACTIONS from '../store/actions/index.js';
import { connect } from 'react-redux'
import socketConnection from '../socketConnection'
import Logo from '../../public/assets/images/logo.png'

import chatApi from '../api/chat'
import ContentLoader from 'react-content-loader'

import { Dropdown } from 'react-bootstrap'
import moment from 'moment';
// **************************************************************
import PropTypes from 'prop-types';

// Translation Higher Order Component
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
} from 'react-switch-lang';
import languages from '../assets/languages/languagesControler'

// Do this two lines only when setting up the application
setTranslations(languages);

// Do this two lines only when setting up the application 
// setDefaultLanguage('en');

// If you want to remember selected language
setLanguageCookie("en", "", "");
// **************************************************************

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
                    new Audio(PostSound).play();
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
    handleSetLanguage = (key) => () => {
        setLanguage(key);

    };

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    toggleActive = () => this.setState({ isActive: !this.state.isActive });
    toggleisNoti = () => this.setState({ isNoti: !this.state.isNoti });

    render() {
        const navClass = `${this.state.isOpen ? " nav-active" : ""}`;
        const buttonClass = `${this.state.isOpen ? " active" : ""}`;
        const searchClass = `${this.state.isActive ? " show" : ""}`;
        const notiClass = `${this.state.isNoti ? " show" : ""}`;
        const { t } = this.props;
        return (
            <div className="border-0 shadow-xs nav-header">
                <div className="nav-top h-100 headerScrolChange justify-content-between ">
                    {/* <Link to="/"><i className="feather-zap text-success display2-size me-3 ms-0"></i><span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">Sociala. </span> </Link> */}
                    <Link to="/">
                        <img src="/assets/images/logo.png" style={{ height: "55px" }} />
                        {/* <i className="feather-zap text-success display2-size me-3 ms-0"></i>
                        <span className="mb-0 text-current d-inline-block fredoka-font ls-3 fw-600 font-xxl logo-text">
                            Sociala.
                        </span> */}
                    </Link>
                    <Link to="/defaultnotification" className="mob-menu ms-auto me-2 chat-active-btn">
                        <div className='topbar_noti_container'>
                            <span className={this.props.NotifyStatus ? "dot-count bg-warning" : ""}  ></span>
                            <i className="text-current feather-bell font-xl "></i>
                        </div>
                    </Link>
                    {/* <Link to="/defaultnotification" className="mob-menu ms-auto me-2 chat-active-btn"><i className="text-current feather-bell font-xl text-grey-900 font-sm btn-round-md"></i></Link> */}
                    {/* <Link to="/defaultvideo" className="mob-menu me-2"><i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i></Link> */}
                    {/* <span onClick={this.toggleActive} className="me-2 menu-search-icon mob-menu"><i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></span> */}
                    <button onClick={this.toggleOpen} className={`nav-menu me-0 ms-2 ${buttonClass}`}></button>
                </div>



                <form action="#" className="float-left header-search ms-3">
                    <div className="mb-0 form-group icon-input">
                        <i className="feather-search font-sm text-grey-400"></i>
                        <input type="text" placeholder="Search...." className="pt-2 pb-2 border-0 bg-grey lh-32 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg" />
                    </div>
                </form>
                <NavLink activeClassName="active" to="/home" className="p-2 text-center ms-3 menu-icon center-menu-icon"><i className="fad fa-home-lg-alt font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/events" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="fad fa-calendar-alt font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/courses" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="fad fa-books font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                <NavLink activeClassName="active" to="/userpage" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="fad fa-user font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink>
                {/* <NavLink activeClassName="active" to="/shop2" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-shopping-bag font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 d-flex justify-content-center align-items-center "></i></NavLink> */}


                {/* <span className={`p-2 pointer text-center ms-auto menu-icon ${notiClass}`} id="dropdownMenu3" data-bs-toggle="dropdown" aria-expanded="false"
                    onClick={() => {
                        this.toggleisNoti()
                        this.props.openNotifys()
                    }}
                >
                    <span className={this.props.NotifyStatus ? "dot-count bg-warning" : ""}  ></span><i className="text-current feather-bell font-xl "></i></span>
                <div className={`dropdown-menu p-4 notification_menu rounded-xxl border-0 shadow-lg ${notiClass}`} aria-labelledby="dropdownMenu3">
                    <h4 className="mb-4 fw-700 font-xss">Notification</h4>
                    <Notify />
                </div> */}
                <Link to="/defaultmessage" className="p-2 text-center ms-auto ms-3 menu-icon chat-active-btn"><i className="text-current fad fa-comments-alt font-xl"></i></Link>

                <Link to="/defaultnotification" className="p-2 text-center ms-3 menu-icon chat-active-btn">
                    <div className='topbar_noti_container'>
                        <span className={this.props.NotifyStatus ? "dot-count bg-warning" : ""}  ></span>
                        <i className="text-current fad fa-bells font-xl "></i>
                    </div>
                </Link>
                {/* <Darkbutton /> */}

                {/* <Link to="/defaultsettings" className="p-0 ms-3 menu-icon"><img src="assets/images/user.png" alt="user" className="w40 mt--1" /></Link> */}
                <Link to="/defaultsettings" className="p-2 text-center ms-3 menu-icon chat-active-btn">  <i className="fad fa-bars font-lg text-grey-500 "></i></Link>

                <nav className={`navigation scroll-bar ${navClass} ${this.props.showChat ? "d-none" : ""}`}>
                    <div className="container ps-0 pe-0">
                        <div className="nav-content">
                            <div className="pt-3 pb-1 mt-2 mb-2 bg-white nav-wrap bg-transparent-card rounded-xxl shadow-xss">
                                <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                                <ul className="mb-1 top-content">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li><Link to="/about" className="nav-content-bttn open-font"><i className="text-current fad fa-info-circle ms-2 me-3"></i><span>About</span></Link></li>
                                    <li><Link to="/home" className="nav-content-bttn open-font"><i className="text-current fad fa-rss ms-2 me-3"></i><span>{t('header.newsfeed')}</span></Link></li>
                                    <li><Link to="/users" className="nav-content-bttn open-font"><i className="text-current fad fa-globe-americas ms-2 me-3"></i><span>{t('header.explore')}</span></Link></li>
                                    {/* <li><Link to="/home" className="nav-content-bttn open-font"><i className="feather-tv btn-round-md bg-blue-gradiant me-3"></i><span> {t('header.newsfeed')}</span></Link></li> */}
                                    {/* <li><Link to="/defaultbadge" className="nav-content-bttn open-font"><i className="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Badges</span></Link></li> */}
                                    {/* <li><Link to="/" className="nav-content-bttn open-font"><i className="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Badges</span></Link></li> */}
                                    {/* <li><Link to="/defaultstorie" className="nav-content-bttn open-font"><i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i><span>Explore Stories</span></Link></li> */}
                                    {/* <li><Link to="/users" className="nav-content-bttn open-font"><i className="fal fa-globe-europe btn-round-md bg-gold-gradiant me-3"></i><span>{t('header.explore')}</span></Link></li> */}
                                    {/* <li><Link to="/" className="nav-content-bttn open-font"><i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i><span>Popular Groups</span></Link></li> */}
                                    {/* <li><Link to="/defaultgroup" className="nav-content-bttn open-font"><i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i><span>Popular Groups</span></Link></li> */}
                                    {/* <li><Link to="/userpage" className="nav-content-bttn open-font"><i className="feather-user btn-round-md bg-primary-gradiant me-3"></i><span>{t('header.my_profile')}</span></Link></li> */}
                                    <li><Link to="/userpage" className="nav-content-bttn open-font"><i className="text-current fad fa-user ms-2 me-3"></i><span>{t('header.my_profile')}</span></Link></li>
                                </ul>
                            </div>

                            <div className="pt-3 bg-white nav-wrap bg-transparent-card rounded-xxl shadow-xss">
                                <div className="nav-caption fw-600 font-xssss text-grey-500">{t('header.more_pages')}</div>
                                <ul className="mb-2">
                                    {/* <li><Link to="/defaultemailbox" className="nav-content-bttn open-font"><i className="text-current font-xl feather-inbox me-3"></i><span>Email Box</span><span className="mt-1 circle-count bg-warning">584</span></Link></li> */}
                                    {/* <li><Link to="/defaulthotel" className="nav-content-bttn open-font"><i className="text-current font-xl feather-home me-3"></i><span>Near Hotel</span></Link></li> */}
                                    <li><Link to="/events" className="nav-content-bttn open-font"><i className="text-current fad fa-calendar-alt ms-2 me-3"></i><span>{t('header.latest_events')}</span></Link></li>
                                    {/* <li><Link to="/events" className="nav-content-bttn open-font"><i className="text-current font-xl fad fa-calendar-alt ms-3 me-3"></i><span>{t('header.latest_events')}</span></Link></li> */}
                                    <li><Link to="/defaultstorie" className="nav-content-bttn open-font"><i className="text-current fad fa-signal-stream ms-2 me-3"></i><span>{t('header.live_stream')}</span></Link></li>
                                    {/* <li><Link to="/defaultstorie" className="nav-content-bttn open-font"><i className="text-current font-xl fad fa-signal-stream me-3"></i><span>{t('header.live_stream')}</span></Link></li> */}
                                </ul>
                            </div>
                            <div className="pt-3 pb-1 bg-white nav-wrap bg-transparent-card rounded-xxl shadow-xss">
                                <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> {t('header.account')}</div>
                                <ul className="mb-1">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    
                                    <li><Link to="/defaultsettings" className="nav-content-bttn open-font"><i className="text-current fad fa-cog ms-2 me-3"></i><span>{t('header.settings')}</span></Link></li>
                                    {/* <li><Link to="/defaultsettings" className="nav-content-bttn open-font"><i className="text-current font-xl fad fa-cog me-3"></i><span>{t('header.settings')}</span></Link></li> */}
                                    
                                    {/* <li><Link to="/defaultanalytics" className="h-auto pt-2 pb-2 nav-content-bttn open-font"><i className="font-sm feather-pie-chart me-3 text-grey-500"></i><span>Analytics</span></Link></li> */}
                                    <li><Link to="/defaultmessage" className="nav-content-bttn open-font"><i className="text-current fad fa-comments-alt ms-2 me-3"></i><span>{t('header.chat')}</span></Link></li>
                                    {/* <li><Link to="/defaultmessage" className="nav-content-bttn open-font"><i className="text-current font-xl fad fa-comments-alt me-3"></i><span>{t('header.chat')}</span></Link></li> */}
                                    <li className="py-2">
                                        <Dropdown className="languageChangerBtn nav-content-bttn open-font">
                                            <Dropdown.Toggle id="dropdown-basic">
                                                <i class="fad fa-globe font-sm text-grey-500 ms-2 me-2"></i><span className='languges_changeers'>Languages</span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#" onClick={this.handleSetLanguage('en')}>English</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={this.handleSetLanguage('fr')}>French</Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={this.handleSetLanguage('fi')}>Finnish</Dropdown.Item>
                                                {/* <Dropdown.Item href="#" onClick={this.handleSetLanguage('th')}>Finnish </Dropdown.Item> */}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>

                                   
                                    <li><Link to="/Terms_Conditions" className="nav-content-bttn open-font"><i className="text-current fad fa-file-contract ms-2 me-3"></i><span>Terms & Conditions</span></Link></li>     
                                    {/* <li><a href="https://sites.google.com/view/globalfansy/home/terms-conditions?authuser=0" target="_blank" className="pt-2 pb-2 nav-content-bttn open-font"><i class="text-current   fad fa-scroll-old  ms-2 me-3"></i><span>Terms & Conditions</span></a></li> */}
                                    <li><a href="https://sites.google.com/view/globalfansy/home/privacy-policy?authuser=0" target="_blank" className="h-auto pt-2 pb-2 nav-content-bttn open-font"><i class="text-current  fad fa-user-shield ms-2  me-3 "></i><span>Privacy Policy</span></a></li>
                                    <li><a href="https://sites.google.com/view/globalfansy/home/supporrt" target="_blank" className="h-auto pt-2 pb-2 nav-content-bttn open-font"><i class="text-current  fad fa-question-square ms-2  me-4 "></i><span>Help & Support</span></a></li>
                                   
                                </ul>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                               
                            </div>
                        </div>
                    </div>
                </nav>
                <nav className={`navigation scroll-bar ${navClass} ${this.props.showChat ? "" : "d-none"}`}>
                    <div className="container ps-0 pe-0">
                        <div className="nav-content">
                            <div className="pt-3 pb-1 mt-2 mb-2 bg-white nav-wrap bg-transparent-card rounded-xxl shadow-xss" style={{ minHeight: '90vh' }}>
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
                                                            <div className="p-0 d-flex justify-content-between align-items-center">
                                                                <small className={data.un_read > 0 ? "new" : ""}>
                                                                    {data.last_message && data.last_message.content && data.last_message.content.substring(0, 10)}
                                                                    {data.last_message && data.last_message.content && data.last_message.content && data.last_message.content.length > 10 && "..."}
                                                                    {data.update_at == "" && data.user && data.user.user_name}
                                                                </small>
                                                                <span className="chat_date">{data.last_message && moment(data.last_message.updatedAt).fromNow(true)} ago</span>
                                                            </div>


                                                        </div>
                                                        {data.online && (
                                                            <div className='online_status'></div>
                                                        )}
                                                        {data.un_read > 0 && (
                                                            <div className='unread_sms'>
                                                                <div><medium className="chat-numbers-notfication">{data.un_read}</medium></div>
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
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>



                        </div>
                    </div>
                </nav>

                <div className={`app-header-search ${searchClass}`}>
                    <form className="search-form">
                        <div className="p-1 mb-0 border-0 form-group searchbox">
                            <input type="text" className="border-0 form-control" placeholder="Search..." />
                            <i className="input-icon">
                                <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                            </i>
                            <span className="mt-1 ms-1 d-inline-block close searchbox-close">
                                <i className="ti-close font-xs" onClick={this.toggleActive}></i>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}


Header.propTypes = {
    t: PropTypes.func.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(translate(Header)))


