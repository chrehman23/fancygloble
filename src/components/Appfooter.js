import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import image from '../../public/assets/images/logIcon.png'

class Appfooter extends Component {
    render() {
        return (
            <div className="border-0 shadow-lg app-footer bg-primary-gradiant ">
                <Link to="/home" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>
                <Link to="/courses" className="nav-content-bttn"><i className="feather-package"></i></Link>
                <Link to="/users" className="nav-content-bttn" data-tab="chats"><i className="feather-layout"></i></Link>
                <Link to="/defaultmessage" className="nav-content-bttn"><i className="feather-layers"></i></Link>
                <Link to="/home" className="nav-content-bttn"><img src={image} alt="user" className="w30 shadow-xss" /></Link>
            </div>        
        );
    }
}

export default Appfooter;