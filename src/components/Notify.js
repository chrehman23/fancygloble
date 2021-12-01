import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'

import defaultUsrImage from '../../public/assets/images/user.png'

class Notify extends Component {
   render() {
      return (
         <>
            {/* {JSON.stringify(this.props.Notify, null, 2)} */}
            {this.props.Notify && this.props.Notify.map((data, index) => {
               if (index > 5) return
               return (
                  // <div key={index} style={{minWidth:'300px'}} className="mb-3 border-0 card bg-transparent-card w-100 ps-5">
                  //    <img src={data.profile ? `${data.profile}` : "assets/images/user.png"} alt="user" className="left-0 w40 position-absolute" />
                  //    <h5 className="mt-0 mb-1 font-xsss text-grey-900 fw-700 d-block">{data.name}<span className="float-right mt-1 text-grey-400 font-xsssss fw-600 text-capitalize "> {moment(data.time).fromNow(true)} Ago</span></h5>
                  //    <h6 className="text-grey-500 fw-500 font-xssss lh-4">{data.des}</h6>
                  // </div>
                  <div className='px-2' style={{ minWidth: '300px' }} key={index}>
                     <div class="card bg-transparent-card w-100 align-items-center align-items-center d-flex flex-row border-0 mb-3"  >
                        <div className='smImageControlerRs'>
                           <img src={data.profile ? `${data.profile}` : defaultUsrImage} alt="user" className="" />
                        </div>
                        <div className='flex-grow-1'>
                           <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">{data.name}
                              <span class="text-grey-400 font-xsssss fw-600 float-right mt-1">{moment(data.time).fromNow(true)} ago
                              </span></h5>
                           <h6 class="text-grey-500 fw-500 font-xssss lh-4">{data.des}</h6>
                        </div>
                     </div>
                  </div>
               )
            })}


            {this.props.Notify && this.props.Notify.length == 0 && (
               <div className='px-1' style={{ minWidth: '200px' }}>
                  <small className='color-theme-gray'>No notification found.</small>
               </div>
            )}

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
