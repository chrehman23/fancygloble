import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { Link } from "react-router-dom";

class StripeAccountSuccess extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Leftnav />
        <Rightchat />

        <div
          className={
            "bg-white main-content right-chat-active about-team-wrapper"
          }
        >
          <div className={"middle-sidebar-bottom"}>
            <div className={"middle-sidebar-left about_bg"}>
              <div className="mt-3 row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className=" row">
                    <div className="pt-3 col-lg-12 text-center">
                      <div className="p-2 overflow-hidden border-0 card p-md-2 bg-primary-gradiant rounded-3 shadow-xss bg-pattern">
                        <div className="bg-pattern-div"></div>
                        <h2 className="mt-0 mb-0 text-white display2-size display2-md-size fw-700">
                          <i className="text-white fad fa-check-circle font-sm me-3 font-xxl"></i>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="paymentsucces text-center py-3">
                    <h1 className="paymentsucces font-xxl text-success">Account Connected Successfuly !</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nostrum excepturi esse porro veniam rem. Perferendis
                      suscipit sit omnis, autem vitae, distinctio, dolores ea
                      corporis earum esse nesciunt sunt.
                    </p>
                   
                    <Link to="/payment" className="mt-2 text-white d-inline-block">
                    <button class="btn-sm btn btn-primary bgthwh">Go To Payments</button>
                    </Link>
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

export default StripeAccountSuccess;
