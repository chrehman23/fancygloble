import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat'; 
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import { withRouter } from "react-router";

const storyList = [
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Hendrix Stamp',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Stephen Grider',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        email: 'support@gmail.com',
        bgImage: 'product.png',
    },
    
]

class Events extends Component {
    
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-xl-12">
                                    
                                    <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex justify-content-between align-items-center">
                                            <div>Events</div>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <button className='btn btn-primary'
                                                    onClick={()=>{
                                                        this.props.history.push('/add-event')
                                                    }}
                                                    >Add Event</button>
                                                </div>
                                                <div>
                                                    <form action="#" className="pt-0 pb-0 ms-auto">

                                                        <div className="search-form-2 ms-2">
                                                            <i className="ti-search font-xss"></i>
                                                            <input type="text" className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                             
                                            
                                           </h2>
                                    </div>
                                    
                                    <div className="row ps-2 pe-1">
                                        {false && storyList.map((value , index) => (

                                        <div key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
                                            <div className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{backgroundImage: `url("assets/images/${value.bgImage}")`}}>
                                                <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                                                    <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src={`assets/images/${value.imageUrl}`} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                                                    <div className="clearfix"></div>
                                                    <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">{value.name}</h4>
                                                </div>
                                            </div>
                                        </div>

                                        ))}

                                        
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

export default withRouter(Events);