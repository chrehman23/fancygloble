import React, { Component } from 'react';
import { connect } from 'react-redux' 
import moment from 'moment'

class Notify extends Component {
   render() {
      return (
         <>
            {/* {JSON.stringify(this.props.Notify, null, 2)} */}
            {this.props.Notify && this.props.Notify.map((data, index) => {
               if(index>5) return
               return (
                  <div key={index} style={{minWidth:'300px'}} className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                     <img src={data.profile ? `${process.env.REACT_APP_BASE_URL}/${data.profile}` : "assets/images/user.png"} alt="user" className="w40 position-absolute left-0" />
                     <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">{data.name}<span className="text-grey-400 font-xsssss fw-600 float-right mt-1 text-capitalize "> {moment(data.time).fromNow(true)} Ago</span></h5>
                     <h6 className="text-grey-500 fw-500 font-xssss lh-4">{data.des}</h6>
                  </div>
               )
            })}
            
             


         </>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      Notify: state.Nofify.notificaitons,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
   //    addnotificaions: (data) => {
   //       dispatch(ACTIONS.addnotificaion(data))
   //    }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify)
