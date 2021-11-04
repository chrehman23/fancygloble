// React Required
import React, { Component } from 'react';
import './socket'
import { connect } from 'react-redux';
import ACTIONS from './store/actions/index.js';
import { withRouter } from 'react-router';
// Create Import File
import './main.scss';
import './index.scss';
import '../media.scss';


 
import "../public/assets/css/style.css" ;
import "../public/assets/css/feather.css" ;
import "../public/assets/css/themify-icons.css" ; //icons
import "./assets/fontawesome-pro/css/all.min.css" ; //icons

// Common Layout
import Demo from './demo/Demo';
import Home from './pages/Home';

import Badge from './pages/Badge';
import Group from './pages/Group';
import Storie from './pages/Storie';
import EventLiveView from './pages/EventLiveView';

import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import CoursesDetail from './pages/CoursesDetail';
import CoursesStart from './pages/CoursesStart';
import Events from './pages/Events';
import UpdatePassword from './pages/ChangePassword';
import Member from './pages/Member';
import Users from './pages/Users';
import Email from './pages/Email';
import Emailopen from './pages/Emailopen';
import ChatMassages from './pages/ChatMassages';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Contactinfo from './pages/Contactinfo';
import Socialaccount from './pages/Socialaccount';
import Password from './pages/Password';
import Payment from './pages/Payment';
import Notification from './pages/Notification';
import Helpbox from './pages/Helpbox';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Notfound from './pages/Notfound';

import ShopOne from './pages/ShopOne';
import Maintenance from './pages/Maintenance ';
import ShopTwo from './pages/ShopTwo';
import ShopThree from './pages/ShopThree';
import Singleproduct from './pages/Singleproduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Chat from './pages/Chat';
import Live from './pages/Live';
import EventLive from './pages/EventLive';
import LiveView from './pages/LiveView';
import Job from './pages/Job';
import Event from './pages/Event';
import AddEvent from './pages/AddEvent';
import Hotel from './pages/Hotel';
import Videos from './pages/Videos';
import Comingsoon from './pages/Comingsoon';
import AddCourses from './pages/AddCourses';

import Grouppage from './pages/Grouppage';
import Userpage from './pages/Userpage';
import UserProfile from './pages/UserProfile';
import Authorpage from './pages/Authorpage';
import Hotelsingle from './pages/Hotelsingle';
import Analytics from './pages/Analytics';
import AuthApi from './api/Auth';
import PostApi from './api/Posts';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Post from './pages/Post'

class App extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }
  componentDidMount() {


    let token = localStorage.getItem("token")
    if (!token) {
      // this.props.history.push("/login")
    } else {
      window.scrollTo(0, 0)
      AuthApi.getUserProfileByToken().then(res => {
        if (res.data.Error == false) {
          this.props.loadProfile(res.data.profile)
        }
      })

      if (this.props.Posts.length == 0) {
        // this.setState({ postApiLoader: true });
        // let data = {
        //   page: 1
        // }
        // PostApi.getPostsByuser(data).then(res => {
        //   if (res.data.Error == false) {
        //     this.setState({
        //       // posts: res.data.posts,
        //       postApiLoader: false,
        //     })
        //     this.props.addPosts(res.data.posts)
        //   } else {
        //     console.log("Posts api error.")
        //   }
        // })
      }

    }
  }



  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route exact path={`/maintenance`} component={Maintenance} />
          <Route exact path={`/login`} component={Login} />
          <Route exact path={`/register`} component={Register} />
          <Route exact path={`/forgot`} component={Forgot} />
          <Route exact path={`/reset-password/:email/:otp`} component={UpdatePassword} />
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/home`} component={Home} />
          <Route exact path={`/post/:id`} component={Post} />
          <Route exact path={`/user/:user_name`} component={UserProfile} />
          <Route exact path={`/add-course`} component={AddCourses} />
          <Route exact path={`/courses`} component={Courses} />
          <Route exact path={`/my-courses`} component={MyCourses} />
          <Route exact path={`/course-detail/:id`} component={CoursesDetail} />
          <Route exact path={`/course-start/:id`} component={CoursesStart} />


          <Route exact path={`/defaultmessage`} component={Chat} />
          <Route exact path={`/room/:id`} component={ChatMassages} />

          <Route exact path={`/defaultlive`} component={Live} />
          <Route exact path={`/live-view/:id`} component={LiveView} />
          <Route exact path={`/live-event/:id`} component={EventLive} />
          <Route exact path={`/live-event-view/:id`} component={EventLiveView} />
          <Route exact path={`/defaultstorie`} component={Storie} />

          <Route exact path={`/defaultbadge`} component={Badge} />
          <Route exact path={`/defaultgroup`} component={Group} />
          <Route exact path={`/events`} component={Events} />
          <Route exact path={`/add-event`} component={AddEvent} />
          <Route exact path={`/defaultemailbox`} component={Email} />
          <Route exact path={`/defaultemailopen`} component={Emailopen} />
          <Route exact path={`/defaultsettings`} component={Settings} />
          <Route exact path={`/defaultvideo`} component={Videos} />
          <Route exact path={`/defaultanalytics`} component={Analytics} />

          <Route exact path={`/accountinformation`} component={Account} />
          <Route exact path={`/defaultmember`} component={Member} />
          <Route exact path={`/Users`} component={Users} />
          <Route exact path={`/contactinformation`} component={Contactinfo} />
          <Route exact path={`/socialaccount`} component={Socialaccount} />
          <Route exact path={`/password`} component={Password} />
          <Route exact path={`/payment`} component={Payment} />
          <Route exact path={`/defaultnotification`} component={Notification} />
          <Route exact path={`/helpbox`} component={Helpbox} />

        

          <Route exact path={`/shop1`} component={ShopOne} />
          <Route exact path={`/shop2`} component={ShopTwo} />
          <Route exact path={`/shop3`} component={ShopThree} />
          <Route exact path={`/singleproduct`} component={Singleproduct} />
          <Route exact path={`/cart`} component={Cart} />
          <Route exact path={`/checkout`} component={Checkout} />
       

          <Route exact path={`/defaultjob`} component={Job} />
          <Route exact path={`/defaultevent`} component={Event} />
          <Route exact path={`/defaulthotel`} component={Hotel} />
          <Route exact path={`/grouppage`} component={Grouppage} />
          <Route exact path={`/userpage`} component={Userpage} />
          <Route exact path={`/authorpage`} component={Authorpage} />
          <Route exact path={`/comingsoon`} component={Comingsoon} />
          <Route exact path={`/defaulthoteldetails`} component={Hotelsingle} />
          <Route component={Notfound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Posts: state.Posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProfile: (data) => {
      dispatch(ACTIONS.loadProfile(data))
    },
    addPosts: (data) => {
      dispatch(ACTIONS.addPosts(data))
    },
    createPost: (data) => {
      dispatch(ACTIONS.addPost(data))
    }

  }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

