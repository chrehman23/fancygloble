import React,{Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ACTIONS from '../store/actions/index.js.js'
import PostSound from '../../public/assets/sounds/post_sound.mp3'

import UserApi from '../api/Users'


class SendFriendRequest extends Component {

    constructor(props) {
        super();
        this.state = { 
            apiLoader: false,
        }
    }





    sendFrindRe=(id)=>{
        this.setState({ apiLoader:true})
        let data = {
            friend_id: id, 
        }
        UserApi.sendFriendRequest(data).then(res=>{
            console.log(res)
            this.setState({ apiLoader: false })
            this.props.updateProfileFriends(res.data.profile)
                new Audio(PostSound).play();
        }).catch(error=>{
            this.setState({ apiLoader: false })
            console.log(error)
        })
    }

    acceptFriendRequest=(id)=>{
        this.setState({ apiLoader:true})
        let data = {
            friend_id: id, 
        }
        UserApi.acceptFriendRequest(data).then(res=>{
            console.log(res)
            this.setState({ apiLoader: false })
            this.props.updateProfileFriends(res.data.profile)
                new Audio(PostSound).play();
        }).catch(error=>{
            this.setState({ apiLoader: false })
            console.log(error)
        })
    }
    
    unfriendFriendRequest=(id)=>{
        this.setState({ apiLoader:true})
        let data = {
            friend_id: id, 
        }
        UserApi.unfriendFriendRequest(data).then(res=>{
            console.log(res)
            this.setState({ apiLoader: false })
            this.props.updateProfileFriends(res.data.profile)
                new Audio(PostSound).play();
        }).catch(error=>{
            this.setState({ apiLoader: false })
            console.log(error)
        })
    }






    render() {
        let frindStatus = ""
        let {user} = this.props;
        let indexStatus = -1;
         indexStatus = this.props.friends &&  this.props.friends.findIndex(data => data.friend_id.user_name == user.user_name)
        if (indexStatus>=0){
            frindStatus = this.props.friends[indexStatus].status
        }
        
        return (
          <>
               
                <div  className="col-md-3 col-sm-4 pe-2 ps-2">
                    <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                        <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                            <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src={`${user.profile_photo ? `${process.env.REACT_APP_BASE_URL}/${user.profile_photo}` : "assets/images/user.png"}`} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                            <div className="clearfix w-100"></div>
                            {/* {user._id} */}
                            <h4 className="fw-700 font-xsss mt-3 mb-0">{user.name} </h4>
                            <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">{user.user_name}</p>
                            {/* <pre className='text-left'> {frindStatus}</pre> */}
                            {/* {JSON.stringify(this.props.friends.state,null,2)} */}
                            {this.state.apiLoader && (<button className="rounded  btn btn-sm btn-primary  text-white">Loading...</button>)}
                            {!this.state.apiLoader && (
                                <>
                                    {frindStatus == "request_sent" && (
                                        <button className="rounded btn btn-primary text-white"
                                        
                                            onClick={() => {
                                                this.unfriendFriendRequest(user._id)
                                            }}  
                                        >Cencal Request</button>
                                    )}
                                    {frindStatus == "request_recived" && (
                                        <div className='d-flex justify-content-between'>
                                            <button className="rounded  btn btn-sm btn-success  text-white"
                                             onClick={() => {
                                                 this.acceptFriendRequest(user._id);
                                            }}
                                            >Accepte Request</button>
                                            <button className="rounded  btn btn-sm btn-primary  text-white"
                                                onClick={() => {
                                                    this.unfriendFriendRequest(user._id)
                                                }}
                                            >Delete</button>
                                        </div>
                                    )}
                                    {frindStatus == "Friend" && (
                                        <button className="rounded btn btn-warning text-white"
                                        onClick={()=>{
                                            this.unfriendFriendRequest(user._id)
                                        }}
                                        >Unfriend</button>
                                    )}
                                    {frindStatus == "" && (
                                        <button className="rounded btn btn-success text-white"
                                            onClick={() => {
                                                this.sendFrindRe(user._id);
                                            }}
                                        >Add Friend</button>
                                    )}
                                </>
                            )}
                    
                           
                        </div>
                    </div>
                </div>
          </>
       
        );
    }
}

 const mapStateToProps = (state) => { 
    // let friends = state.UserProfile.profile.friends && state.UserProfile.profile.friends.filter(data => data.status == "friend");
    return {
        friends: state.UserProfile.profile.friends
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileFriends: (data) => {
            dispatch(ACTIONS.updateProfileFriends(data))
        },
 
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SendFriendRequest))



