import React, { Component, Fragment } from "react";
 
class Maintenance  extends Component {


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 pt-5">
                            <div className="error-template d-flex justify-content-center flex-column align-items-center ">
                                <h1>
                                    :) Oops!</h1>
                                <h2>
                                    Temporarily down for maintenance</h2>
                                <h1>
                                    We’ll be back soon!</h1>
                                <div>
                                    <p>
                                        Sorry for the inconvenience but we’re performing some maintenance at the moment.
                                        we’ll be back online shortly!</p>
                                   
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-md-6">
                            
                        </div>
                    </div>
                </div>
                </>
        );
    }
}
 
export default Maintenance