import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ACTIONS from "../store/actions/index.js";
import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthApi from "../api/Auth";
import { GoogleLogin } from "react-google-login-component";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Logo from "../../public/assets/images/logo2.png";
import Logo2 from "../../public/assets/images/Logo3.png";
import logIcon from "../../public/assets/images/logIcon.png";
import backgroundLogin from "../../public/assets/images/loginSo.jpg";

import loignImage1 from "../../public/assets/images/login image/login1.jpg";
import loignImage2 from "../../public/assets/images/login image/login2.jpg";
import loignImage3 from "../../public/assets/images/login image/login3.jpg";
import loignImage4 from "../../public/assets/images/login image/login4.jpg";
import loignImage5 from "../../public/assets/images/login image/login5.jpg";

import socketConnection from "../socketConnection";

import BtnLoader from "../components/ApiLoader";

import googleImage from "../../public/assets/images/icon-1.png";

// import io from 'socket.io-client';
// let socket = io.connect(process.env.REACT_APP_BASE_URL)

let validationSchemaLogin = Yup.object({
  email: Yup.string()
    .required("Email is Required.")
    .email("Email is not valid."),
  password: Yup.string()
    .required("Password is Required.")
    .min(6, "Must be greater then 6 characters."),
});

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      apiLoader: false,
      ApiError: "",
      google_facebook_login_loader: false,
      google_facebook_login_error: "",
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/");
    }
    let data={
      email:"mrahman9pk@gmail.com",
      password:"11223344"
    }
    // AuthApi.login(data)
    //   .then((res) => {
    //     if (res.data.Error == false) {
    //       socketConnection.emit("login", res.data._id);
    //       localStorage.setItem("token", res.data.token);

    //       this.props.removePosts();
    //       this.props.loadProfile(res.data.userProfile);
    //       this.props.history.push("/");
    //     }
    //     this.setState({
    //       apiLoader: false,
    //     });
    //   })
  }
  responseGoogle(googleUser) {
    console.log("googleUser", googleUser);
    let data = googleUser.vu;
    console.log(data);
    let googleres = {
      email: data.jv,
      name: data.jf,
      password: data.sW,
      account_type: "google",
    };
    console.log("googleUser", googleres);

    this.setState({
      google_facebook_login_loader: true,
      google_facebook_login_error: "",
    });

    AuthApi.socialLogin(googleres)
      .then((res) => {
        // console.log(res)
        if (res.data.Error == false) {
          socketConnection.emit("login", res.data.userProfile._id);
          localStorage.setItem("token", res.data.token);

          this.props.removePosts();
          this.props.loadProfile(res.data.userProfile);
          this.props.history.push("/");
        } else {
          this.setState({ google_facebook_login_error: res.data.msg });
        }

        this.setState({ google_facebook_login_loader: false });
      })
      .catch((error) => {
        // console.log(error)
        if (error.response.Error == true) {
          this.setState({ google_facebook_login_error: error.response.msg });
        }
        this.setState({ google_facebook_login_loader: false });
      });
  }
  responseFacebook = (response) => {
    console.log(response);
  };
  componentClicked = (response) => {
    console.log(response);
  };

  render() {
    return (
   
<div className="Container">
    <div className="row">
        <div className="col-md-6 col-12">
            <p className="login-paragraph">
                <h1>Global Fansy</h1>
            Globalfansy helps you connect and share with the people in your life.
            </p>
        </div>
        <div className="col-md-6 col-12"></div>
    </div>
</div>



    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePosts: (data) => {
      dispatch(ACTIONS.removePosts(data));
    },
    loadProfile: (data) => {
      dispatch(ACTIONS.loadProfile(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
