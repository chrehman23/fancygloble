import React,{Component} from 'react';
import moment from 'moment'
class chatList extends Component {
    render() {
        return (
            <>
                {this.props.massages.map((data, index) => {
                    return (
                        <div key={index}  className={`message-items ${data.send_by == "me" ? "" : "out-messages"}`}>
                            <div className="message-users">
                                <div className="avatar-img">
                                    <img src={data.user && data.user.profile_photo} alt="avater" />
                                </div>
                                <div>
                                    <h5>{data.user && data.user.name}</h5>
                                    <div className="time">
                                        {moment(data.created_at).fromNow(true)} ago
                                        {/* <i className="ti-double-check text-info"></i> */}
                                    </div>
                                </div>
                            </div>
                            <div className='px-2'>
                                <div className="message-wraps py-0  ">
                                    <div className=' p-3 py-2 round-1 chat-color'>{data.content}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }
}

export default chatList;