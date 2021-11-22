import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import UsersApi from '../api/Users'
import SendFriendRequest from '../components/SendFriendRequest'
import Load from '../components/Load';


import { connect } from 'react-redux';
import { withRouter } from 'react-router';
class Users extends Component {
    constructor(props) {
        super();
        this.state = {
            users: [],
            apiLoader: true,
            search: ""
        }
    }

    componentDidMount() {
        UsersApi.getAllUsers().then(res => {
            console.log(res.data);
            if (res.data.Error == false) {
                this.setState({
                    users: res.data.Users,
                })
            }
            this.setState({
                apiLoader: false
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                apiLoader: false
            })
        })
    }

    search_users(e) {
        let data = {
            search: e
        }
        this.setState({
        apiLoader:true
        })
        UsersApi.searchUsers(data).then(res => {
            console.log(res.data);
            if (res.data.Error == false) {
                this.setState({
                    users: res.data.data,
                })
            }
            this.setState({
                apiLoader: false
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                apiLoader: false
            })
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
                                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">
                                            Find New Friends
                                            <form action="#" className="pt-0 pb-0 ms-auto">
                                                <div className="search-form-2 ms-2">
                                                    {this.state.search && (<i className="far fa-times cursor-pointer font-xss" 
                                                        onClick={() => {
                                                            this.setState({ search: "" })
                                                            this.search_users("")
                                                        }}
                                                    ></i>)}
                                                    {!this.state.search && (<i className="ti-search font-xss"></i>)}

                                                    <input type="text"
                                                        value={this.state.search}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                search: e.target.value
                                                            })
                                                            this.search_users(e.target.value)
                                                        }}
                                                        className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
                                                </div>
                                            </form>
                                            {/* <a href="/" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i className="feather-filter font-xss text-grey-500"></i></a> */}
                                        </h2>
                                    </div>

                                    <div className="row ps-2 pe-2">
                                        {this.state.apiLoader && (<Load />)}

                                        {!this.state.apiLoader && !this.props.profileLoading && this.state.users && this.state.users.map((value, index) => {
                                            // if (value._id == this.props.profile_id) return
                                            return (
                                                <SendFriendRequest key={index} user={value} />
                                            )
                                        })}

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


const mapStateToProps = (state) => {
    // let friends = state.UserProfile.profile.friends && state.UserProfile.profile.friends.filter(data => data.status == "friend");
    return {
        profileLoading: state.UserProfile.Loading,
        profile: state.UserProfile.profile,
        profile_id: state.UserProfile.profile._id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addPosts: (data) => {
        //     dispatch(ACTIONS.addPosts(data))
        // },

    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users))