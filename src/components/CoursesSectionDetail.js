import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseApi from '../api/Courses';
import CoursesSectionLactures from "./CoursesSectionLactures";
class CoursesSectionDetail extends Component {
    constructor() {
        super();
        this.state = {
            sections: [],
            addSection: false, 
        }
    }

    componentDidMount() {
        let data = {
            course_id: this.props.course_id
        }
        CourseApi.courseSections(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    sections: res.data.data
                })
            }
        })
    }

    addCourseSection = () => {
        let data = {
            course_id: this.props.course_id,
            section_title: this.state.section_title,
            section_description: this.state.section_description

        }
        CourseApi.addCourseSection(data).then(res => {
            if (res.data.Error == false) {
                this.setState({
                    sections: [...this.state.sections, res.data.data],
                })
                
            }
            this.setState({
                addSection: false,
                section_title: "",
                section_description: ""
            })
        }).catch(error=>{
            this.setState({
                addSection: false,
                section_title: "",
                section_description: ""
            })
        })
    }


    render() {
        return (
            <  >
                <div className='row  mt-3'>
                    <div className='col-12 border-bottom'>
                        <h4 className=' mt-3'><i class="fas fa-list"></i> Course Content</h4>
                    </div>
                </div>
                {this.state.sections.map((data, index) => <CoursesSectionLactures course_id={this.props.course_id} data={data}/>)}


               
            </>
        );
    }
}

export default CoursesSectionDetail;