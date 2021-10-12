import React, { Component , Fragment } from "react";
import Header from '../components/Header';

class Comingsoon extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <div className="main-content pt-0 bg-white ps-0 pe-0">
                    <div className="container">
                        <div className="row justify-content-center">
                            
                            <div className="col-xl-12 vh-100   d-flex bg-white rounded-3 overflow-hidden">
                                <div className="card shadow-none border-0 ps-lg--5 me-auto coming-soon-card">
                                    <div className="card-body rounded-0 text-left    ps-0 pe-0">
                                        {/* <div className="timer w-100 mb-3 bg-grey-time"><div className="time-count"><span className="text-time">04</span> <span className="text-day">Day</span></div> <div className="time-count"><span className="text-time">04</span> <span className="text-day">Hours</span> </div> <div className="time-count"><span className="text-time">39</span> <span className="text-day">Min</span> </div> <div className="time-count"><span className="text-time">13</span> <span className="text-day">Sec</span> </div> </div> */}
                                        <h2 className="fw-700 text-grey-900 display3-size display4-md-size lh-2">We're under <span className="text-primary">construction.</span> Check back for an update soon.</h2>
     
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div> 
                </div>  
            </Fragment>    
        );
    }
}

export default Comingsoon;