import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import t1 from "../../public/assets/images/team/t1.png";
import t2 from "../../public/assets/images/team/t2.png";
import t3 from "../../public/assets/images/team/t3.png";
import { Link } from 'react-router-dom'
class ShopOne extends Component {
  constructor(props) {
    super();
    this.state = {
      login: false,

    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.setState({
        login: true
      })
    }

  }
  render() {
    return (
      <Fragment>
        {this.state.login && (
          <>
            <Header />
            <Leftnav />
            <Rightchat />
          </>
        )}


        <div className={this.state.login && "bg-white main-content right-chat-active about-team-wrapper"}>
          <div className={this.state.login && "middle-sidebar-bottom"}>
            <div className={this.state.login ? "middle-sidebar-left about_bg" :"container about_bg"}>
              <div className="mt-3 row">
                <div className="col-xl-12 col-xxl-12 col-lg-12">
                  <div className=" row">
                    <div className="pt-3 col-lg-12">
                      <div className="p-2 overflow-hidden border-0 card p-md-2 bg-primary-gradiant rounded-3 shadow-xss bg-pattern">
                        <div className="bg-pattern-div"></div>
                        <h2 className="mt-0 mb-0 text-white display2-size display2-md-size fw-700">
                          <Link to="/" className="mt-2 text-white d-inline-block"><i className="text-white ti-arrow-left font-sm me-3 font-xl"></i>About Us</Link>

                        </h2>
                      </div>
                    </div>

                    <div className="py-5 col-md-12 col-12">
                      <h2 className="team-heading about_text">What We Provide ?</h2>
                      <p className="py-2 about-team-paragraph">
                        This platform is a social networking website with
                        possibility for digital marketing, selling and producing
                        services, like social media content, live stream or
                        other online courses, concerts, exhibitions, on line
                        shop for products and so forth, all in one platform.
                        <br></br>
                        <br></br>
                        Global Fansy is a social network on an event platform,
                        built to give content creators, performers, lecturers,
                        instructors and presenters the ability to post photo,
                        document and video content, live video stream, thus
                        having the possibility to earn money from consumers who
                        will view and subscribe to their paid content. The
                        website and mobile application are created to make it
                        simple to enjoy live events, meetings and concerts and
                        meet people. It is made to be simple and effective to
                        digitally market the events / services / products.
                        Global Fansy Inc. has the possibility too to market its
                        chosen customers and their content and services.
                        <br></br>
                        <br></br>
                        All registered to our sites are regarded as users or
                        consumers of the services we provide and are herein
                        pertained in this Terms and Conditions Agreement.
                        <br></br><br></br>
                        The
                        user acknowledges and agrees that all the services
                        provided and made available through our website and
                        applications, are sole property of Global Fansy Inc.
                        These applications may be made available on various
                        social media networking sites and other web platforms.
                        <br></br><br></br>
                        At its discretion, Global Fansy Inc may offer additional
                        website services and/or products, or update, modify or
                        revise any current content and services, and this
                        agreement shall apply to any and all additional services
                        and/or products and any and all updated, modified or
                        revised services unless otherwise stipulated.
                        stipulated
                        Global
                        Fansy Inc does hereby reserve the right to cancel and
                        cease offering any of the aforementioned services and/or
                        products. You, as the end user acknowledge, accept and
                        agree that Global Fansy Inc. shall not be held liable
                        for any aforementioned situations. Your continued use of
                        the services provided, after Global Fansy has made
                        updates, changes, and/or modifications shall constitute
                        your acceptance of them, and as such, frequent review of
                        this Agreement and any and all applicable terms and
                        policies should be made by you to ensure you are aware
                        of all terms and policies currently in effect.
                        <br></br><br></br>
                        Should
                        you not agree to the updated, modified, revised or
                        modified terms, you must stop using the provided
                        services. Furthermore, the user understands,
                        acknowledges and agrees that the services offered shall
                        be provided "AS IS" and as such Global Fansy Inc. shall
                        not assume any responsibility or obligation for the
                        timelines, missed delivery, deletion and/or any failure
                        to store user content, communication or personalization
                        settings.
                      </p>
                    </div>

                    <div className="my-5 row ">
                      {/* <h1 className="text-center team-heading">
                        Our Globalfansy Team
                      </h1> */}

                      <div className="col-md-4 col-12">
                        <div className="text-center card ">
                          <img src={t1} alt="avater" className=" img-fluid" />
                          <div className="img-heading">
                            <p className="pt-2 paragraph-bar">
                              CEO Founder
                            </p>
                            <h5>- Tanja</h5>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <br></br>
                      <br></br>
                      {/* <div className="col-md-4 col-12">
                        <div className="text-center card ">
                          <img src={t2} alt="avater" className=" img-fluid" />
                          <div className="img-heading">
                            <p className="pt-2 paragraph-bar">
                              Designation XYZ
                            </p>
                            <h5>- Ville</h5>
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="col-md-4 col-12">
                        <div className="text-center card ">
                          <img src={t3} alt="avater" className=" img-fluid" />
                          <div className="img-heading">
                            <p className="pt-2 paragraph-bar">
                              Designation XYZ
                            </p>
                            <h5>- Kalle</h5>
                          </div>
                        </div>
                      </div> */}
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
