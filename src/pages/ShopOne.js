import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';


class ShopOne extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content bg-white right-chat-active">
            
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left">
                            <div className="row">
                                <div className="col-xl-12 col-xxl-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                                                <div className="bg-pattern-div"></div>
                                                <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">About</h2>
                                            </div>
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