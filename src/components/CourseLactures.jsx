import React, { Component } from 'react';
import CourseApi from '../api/Courses';
import { Card, Accordion, Tab, Tabs, Dropdown } from "react-bootstrap";
import Load from './ApiLoader';
class CourseLactures extends Component {
    constructor() {
        super();
        this.state = {
            lactureLoader: false,
            loaded: false,
            lactures: [],

        }
    }
    componentDidMount() {
        this.loadLactures()
    }
    loadLactures = () => {
        let data = {
            course_id: this.props.course_id,
            section_id: this.props.section_id,
        }
        this.setState({
            lactureLoader: true
        })
        CourseApi.getLactures(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    lactures: res.data.data,
                    lactureLoader: false,
                    loaded: true,
                })
            }
        })
    }

    render() {
        return (
            <>
                {this.state.lactureLoader && (
                    <div className='d-flex justify-content-lg-center align-items-center'
                    style={{height:"50px"}}
                    ><Load /></div>
                )}
                {/* {this.state.lactures.length == 0 && !this.state.lactureLoader && !this.state.loaded && (<div className='cursor-pointer link-info'
                    onClick={() => {  }}
                ><u>Load lactures</u></div>)} */}
                {this.state.lactures.map((data, index) => {
                    return (
                        <>
                            <div className="adjust_padding border-bottom-dotted"
                                key={index}
                            >
                                <div class="card adjust_padding pb-0 mt-0">
                                    <div className="description_collapse lectures-play" 
                                        onClick={() => {
                                            this.props.updateLactures(data)
                                        }}
                                    >
                                        <div className="video-length">
                                            <div className="pr-1 d-flex justify-content-between">
                                                <div
                                                   
                                                >
                                                    {this.props.details_page ? (
                                                        <>
                                                            {data.lacture_vedio == "" && (
                                                                <i class="fas fa-lock"></i>
                                                            )}
                                                            {data.lacture_vedio !== "" && (
                                                                <i>{data.lacture_vedio == "" ? (<i class="fas fa-signal-stream"></i>) : (<i class="far fa-play-circle"></i>)}</i>
                                                            )}
                                                        </>
                                                    ):(
                                                            <>
                                                                {data.lacture_vedio == "" ? (<i class="fas fa-signal-stream"></i>) : (<i class="far fa-play-circle"></i>)}
                                                            </>
                                                    )}
                                                   
                                                    
                                                    
                                                    
                                                    <span className="ms-2">
                                                       {index+1}. {data.lacture_title}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="video-resources">
                                                    <button className="btn btn-outline-light btn-sm d-flex">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                class="bi bi-folder me-1"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                                            </svg>
                                                            <small> ({data.files_count && data.files_count})</small>
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="pb-0 mb-0"> 
                                                {data.lacture_des && data.lacture_des.substring(0, 100)}
                                                {data.lacture_des && data.lacture_des.length > 100 && "..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ************* */}

                        </>

                    )
                })}

                {this.state.lactures.length == 0 && this.state.loaded && (<div className='text-center'><small className=' text-grey-500 w-100'>No lacture found</small></div>)}

            </>
        );
    }
}

export default CourseLactures;