import React, { Component } from 'react';
import CourseApi from '../api/Courses'
class CourseLactures extends Component {
    constructor() {
        super();
        this.state = {
            lactureLoader: false,
            loaded: false,
            lactures: [],

        }
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
                    <div>Loading....</div>
                )}
                {this.state.lactures.length == 0 && !this.state.lactureLoader && !this.state.loaded && (<div className='link-info cursor-pointer'
                    onClick={() => { this.loadLactures() }}
                ><u>Load lactures</u></div>)}
                {this.state.lactures.map((data, index) => {
                    return (
                        <div className='border-bottom' key={index}
                        onClick={()=>{
                            this.props.updateLactures(data)
                        }}
                        >
                            <div className=' cursor-pointer d-flex justify-content-between'>
                                <u className='link-info'>{data.lacture_title}</u>
                                {data.files && data.files.length > 0 && (
                                    <span><i className="fas fa-file-alt px-2"></i>{data.files && data.files.length}</span>
                                )}
                            </div>
                            <p className='mb-0 pb-0'> {data.lacture_des} </p>
                        </div>
                    )
                })}

                {this.state.lactures.length == 0 && this.state.loaded && (<div>No lacture found</div>)}

            </>
        );
    }
}

export default CourseLactures;