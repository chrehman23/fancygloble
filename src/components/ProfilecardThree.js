import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import BackGroundImage from '../../public/assets/images/group.png'
import UserProfileImage from '../../public/assets/images/user.png'

import defaultPicture from '../../public/assets/images/user.png'
class   ProfilecardThree extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3" style={{height:'200px'}}>
                    <img className='w-100 h-100 image-conver' src={`${this.props.Profile && this.props.Profile.profile_cover ? `${this.props.Profile.profile_cover}`:UserProfileImage}`} alt="avater" />
                    </div>
                <div className="card-body p-0 position-relative">
                    <figure className="avatar imagelgresponsive position-absolute z-index-1" style={{ top: '-40px', left: '30px' }}><img src={`${this.props.Profile &&  this.props.Profile.profile_cover ? `${this.props.Profile.profile_photo}` : defaultPicture}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100" /></figure>
                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">{this.props.Profile &&  this.props.Profile.name} <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{this.props.Profile &&  this.props.Profile.user_name}</span></h4>
                    <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                        <div className='d-flex'>
                            <div className='px-2'><p><b>{this.props.Profile && this.props.Profile.followers && this.props.Profile.followers.length} Followers</b></p></div>
                            <div className='px-2'><p><b>{this.props.Profile && this.props.Profile.followings && this.props.Profile.followings.length} Followings</b></p></div>
                        </div>
                        {/* <Link to="/users" className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3">Add Friend</Link> */}
                        {/* <a href="/defaultemailbox" className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i className="feather-mail font-md"></i></a>
                        <a href="/home" id="dropdownMenu4" className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="ti-more font-md tetx-dark"></i></a> */}
                        <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg d-none" aria-labelledby="dropdownMenu4">
                            <div className="card-body p-0 d-flex">
                                <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">Save Link <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span></h4>
                            </div>
                            <div className="card-body p-0 d-flex mt-2">
                                <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">Hide Post <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                            </div>
                            <div className="card-body p-0 d-flex mt-2">
                                <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">Hide all from Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                            </div>
                            <div className="card-body p-0 d-flex mt-2">
                                <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                                <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0">Unfollow Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {JSON.stringify(this.props.Profile,null,2)} */}

                <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                    <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist">
                        <li onClick={() => this.props.profielTabsChange(1)} className="active list-inline-item me-5"><a className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${this.props.profileTabs == 1 ? "active" : ""}`} href="#about" data-toggle="tab">About</a></li>
                        <li onClick={() => this.props.profielTabsChange(2)} className="list-inline-item me-5"><a className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${this.props.profileTabs==2 ? "active" :""}`} href="#followers" data-toggle="tab">Followers</a></li>
                        <li onClick={()=>this.props.profielTabsChange(3)} className="list-inline-item me-5"><a className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${this.props.profileTabs==3 ? "active" :""}`} href="#follwings" data-toggle="tab">Followings</a></li>
                        {/* <li onClick={()=>this.props.profielTabsChange(4)} className="list-inline-item me-5"><a className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${this.props.profileTabs==4 ? "active" :""}`} href="#vedios" data-toggle="tab">Video</a></li> */}
                        {/* <li onClick={()=>this.props.profielTabsChange(5)} className="list-inline-item me-5"><a className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${this.props.profileTabs==5 ? "active" :""}`} href="#pictures" data-toggle="tab">Pictures</a></li> */}
                        <li onClick={() => this.props.profielTabsChange(6)} className="list-inline-item me-5"><a className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${this.props.profileTabs == 6 ? "active" : ""}`} href="#Courses" data-toggle="tab">Courses </a></li>
                        {/* <li className="list-inline-item me-5"><a className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs7" data-toggle="tab">Media</a></li> */}
                    </ul>
                </div>
            </div>
             
        );
    }
}

export default ProfilecardThree;