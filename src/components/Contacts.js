import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js'
const contactList = [
    {
        imageUrl: 'user.png',
        name: 'Armany Seary',
        friend: '45',
    },
    {
        imageUrl: 'user.png',
        name: 'Mohannad Zitoun',
        friend: '18',
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        friend: '28',
    },
]

class Contacts extends Component {
    render() {
        return (
            <>
                {/* {JSON.stringify(this.props.friends,null,2)} */}
                {!this.props.Profileloading && this.props.friends.length > 0 && (
                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                        <div className="card-body d-flex align-items-center p-4">
                            <h4 className="fw-700 mb-0 font-xssss text-grey-900">Confirm Friends</h4>
                            {/* <a href="/defaultmember" className="fw-600 ms-auto font-xssss text-primary">See all</a> */}
                        </div>
                        {this.props.friends.map((value, index) => {
                            return (
                                <div key={index} className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3 mb-3">
                                    <figure className="avatar me-2 mb-0"><img src={`${value.friend_id.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${value.friend_id.profile_photo}` : "assets/images/user.png"}`} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                                    {/* <h4 className="fw-700 text-grey-900 font-xssss mt-2">{value.name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{value.friend} mutual friends</span></h4> */}
                                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">{value.friend_id.name}</h4>
                                    {/* <a href="/defaultmember" className="btn-round-sm bg-white ms-auto mt-2"><span className="feather-chevron-right font-xss text-grey-900"></span></a> */}
                                </div>
                            )
                        })}


                    </div>
                )}
            </>

        );
    }
}

const mapStateToProps = (state) => {
    let friends = state.UserProfile.profile.friends && state.UserProfile.profile.friends.filter(data => data.status == "Friend");
    return {
        friends,
        Profileloading: state.UserProfile.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addPosts: (data) => {
        //     dispatch(ACTIONS.addPosts(data))
        // },

    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Contacts))