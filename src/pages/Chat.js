import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

class Chat extends Component {
    render() {
        return (
            <Fragment> 
                <Header showChat={true} openSideBar={true} />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                            <div className="row">
                                <div className="col-lg-12  h-100">
                                    <div className="chat-wrapper pt-0 h-100vh d-flex justify-content-center align-items-center   bg-white  ">
                                        <h4 className='fw-700 mb-0  mt-0 font-md text-grey-900 d-flex'>Use sidebar to chat</h4>
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

export default Chat;