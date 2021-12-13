import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat"; 
import { Link } from 'react-router-dom'

class ShopOne extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,

    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    if (!token) {
      this.props.history.push("/login")
    }

  }


  render() {
    return (
      <Fragment>
        {true && (
          <>
            <Header />
            <Leftnav />
            <Rightchat />
          </>
        )}


        <div className={true && "bg-white main-content right-chat-active about-team-wrapper"}>
          <div className={true && "middle-sidebar-bottom"}>
            <div className={true ? "middle-sidebar-left about_bg" :"container about_bg"}>
              <div className="mt-3 row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className=" row">
                    <div className="pt-3 col-lg-12">
                      <div className="p-2 overflow-hidden border-0 card p-md-2 bg-primary-gradiant rounded-3 shadow-xss bg-pattern">
                        <div className="bg-pattern-div"></div>
                        <h2 className="mt-0 mb-0 text-white display2-size display2-md-size fw-700">
                          <Link to="/" className="mt-2 text-white d-inline-block"><i className="text-white ti-arrow-left font-sm me-3 font-xl"></i>Make Globalfansy Account</Link>

                        </h2>
                      </div>
                    </div>

                    <div className="py-5 col-md-12 col-12">
                      <h2 className="team-heading about_text">Make GlobalFansy Account.</h2>
                      <p className="py-2 about-team-paragraph">
                        This platform is a social networking website with
                        possibility for digital marketing, selling and producing
                        services, like social media content, live stream or
                        other online courses, concerts, exhibitions, on line
                        shop for products and so forth, all in one platform.
                        </p>
                       
                    </div>
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

export default ShopOne;
