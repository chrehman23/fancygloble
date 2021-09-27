import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import { Card } from 'react-bootstrap';
import Load from '../components/Load';

import { withRouter } from "react-router";
import EventApis from '../api/Events'
import moment from 'moment'

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


    constructor(props) {
        super();
        this.state = {
            loader: true,
            events: [],
            inputSearch:""

        }
    }

    componentDidMount() {

        let token = localStorage.getItem("token")
        if (!token) {
            this.props.history.push("/login")
        }else{
            let data = {
                page: 1
            }
            EventApis.getEvents(data).then(res => {
                console.log(res.data)
                if (res.data.Error == false) {
                    this.setState({ events: res.data.events })
                }
                this.setState({ loader: false })
            }).catch(error => {
                console.log(error)
                this.setState({ loader: false })
            })
        }
       
    }

    searchEvents = (search)=>{
        let data={
            search: search
        }
        this.setState({loader:true})

        EventApis.searchEvents(data).then(res=>{
            if(res.data.Error==false){
                this.setState({ events: res.data.events})
            }
            this.setState({ loader: false })
        }).catch(error=>{
            this.setState({ loader: false })
        })
    }

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
                                                        onClick={() => {
                                                            this.props.history.push('/add-event')
                                                        }}
                                                    >Add Event</button>
                                                </div>
                                                <div>
                                                    <form action="#" className="pt-0 pb-0 ms-auto">

                                                        <div className="search-form-2 ms-2">
                                                            <i className="ti-search font-xss"></i>
                                                            <input
                                                            onChange={(e)=>{
                                                                    this.setState({ inputSearch:e.target.value})
                                                                    this.searchEvents(e.target.value)
                                                            }}
                                                            type="text" className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>


                                        </h2>
                                    </div>
                                    {this.state.inputSearch.length > 0 && (

                                        <p className='mb-0'><b>Searching by {this.state.inputSearch}</b></p>

                                    )}
                                    {this.state.loader && <Load />}
                                    {!this.state.loader && this.state.events.length==0 && (
                                        <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                            <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                                <div className="stage">
                                                    <p className='mb-0'><b>No Event found.</b></p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                  

                                    <div className="row ps-2 pe-1">
                                        {!this.state.loader && this.state.events.map((value, index) => (
                                            <div className='col-md-4 py-1'>

                                                <Card style={{ width: '100%' }} className=' p-0'>
                                                    <Card.Img variant="top" src={value.thumbnail && `${process.env.REACT_APP_BASE_URL}/${value.thumbnail[0] && value.thumbnail[0].picture}`} />
                                                    <Card.Body>
                                                        <Card.Title><b >{value.title}</b></Card.Title>
                                                        <Card.Text>
                                                            <br />
                                                            <table className='table table-bordered'>
                                                                <tr>
                                                                    <td>location</td>
                                                                    <td>{value.location}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Event type</td>
                                                                    <td>{value.event_type}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Payment amount</td>
                                                                    <td>{value.paid_amount}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Seats</td>
                                                                    <td>{value.seats_status}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Seats</td>
                                                                    <td>{value.event_seats}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Start date</td>
                                                                    <td>{moment(value.start_date).format("DD/MMM/YYY hh:mm a")}</td>
                                                                </tr> 
                                                                <tr>
                                                                    <td>End date</td>
                                                                    <td>{moment(value.end_date).format('DD/MMM/YYY hh:mm a')}</td>
                                                                </tr>
                                                            </table>
                                                            {value.paid_amount >0 && (
                                                                <div className='d-flex justify-content-end'>
                                                                    <button className='btn btn-primary'>Pay €{value.paid_amount} Now</button>
                                                                </div>
                                                            )}
                                                            {value.paid_amount == null && (
                                                                <div className='d-flex justify-content-end'>
                                                                    <button className='btn btn-success'>Get Ticket </button>
                                                                </div>
                                                            )}
                                                            
                                                          
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>

                                        ))}
                                    </div>
                                    <div className="row ps-2 pe-1">
                                        {false && storyList.map((value, index) => (

                                            <div key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
                                                <div className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{ backgroundImage: `url("assets/images/${value.bgImage}")` }}>
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