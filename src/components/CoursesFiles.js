import React, { Component } from 'react';

import CourseApi from '../api/Courses';
import ApiLoader from '../components/ApiLoader'
class CoursesFiles extends Component {
    constructor() {
        super()
        this.state = {
            files: [],
            fileError: "",
            apiLoader:false,
        }
    }

    componentDidMount() {
        this.setState({
            files: this.props.files
        })
    }

    uploadFile = (data) => {
this.setState({
    apiLoader:true
})

        CourseApi.addLactureDocument(data).then(res => {
            console.log(res.dat)
            if (res.data.Error == false) {
                this.setState({
                    files: res.data.data.files,
                    apiLoader:false
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    fileName = (data) => {
        let name = data.split('/').pop()
        return name
    }
    removeFile=(id)=>{
        this.setState({
            apiLoader: true
        })

        let data = {
            lacture_id :this.props.lacture_id,
            document_id :id,
        }
        CourseApi.removeLactureDocument(data).then(res => {
            console.log(res.dat)
            if (res.data.Error == false) {
                this.setState({
                    files: res.data.data.files,
                    apiLoader: false
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className='row'>
                {this.state.files.map((data, index) => {
                    return (
                        <div className="col-4" key={index}>
                            <div className="d-flex">
                                <a href={data.file} className='document_link' target="_blank" >
                                    <div className="d-flex ">
                                        <div><i className="px-2 fas fa-file-alt"></i></div>
                                        <div className='cursor-pointer'>Document</div>

                                    </div>
                                </a>
                                <div className='text-right flex-grow-1 '><i className="cursor-pointer fas fa-trash-alt"
                                onClick={()=>{
                                    this.removeFile(data._id)
                                }}
                                ></i></div>
                            </div>
                           
                        </div>
                    )
                })}
                <div className="col-4">
                    <div className="cursor-pointer d-flex"
                        onClick={() => { document.getElementById(`document${this.props.lacture_id}`).click() }}
                    >
                        <div><i class="fas fa-upload px-2"></i></div>
                        <div><small><b>Upload document</b></small></div>
                    </div>
                </div>
                <small className='py-1 text-danger'><b>{this.state.fileError}</b></small>
                {/* {this.props.lacture_id} */}
                <input type='file' id={`document${this.props.lacture_id}`}
                    onChange={(e) => {
                        if (e.target.value) {
                            let mb = parseInt((e.currentTarget.files[0].size / (1024 * 1024)).toFixed(2));
                            // console.log("mb", typeof mb)
                            if (mb > 10) {
                                this.setState({
                                    fileError: "File size should less then 10MB",
                                })
                            } else {
                                let fileTyps = ['png', 'jpg', 'jpeg', 'pdf'];
                                if (fileTyps.includes(e.currentTarget.files[0].name.split('.').pop())) {
                                    const file = e.currentTarget.files[0];
                                    let data = new FormData();
                                    data.append('document', file)
                                    data.append('lacture_id', this.props.lacture_id)
                                    this.uploadFile(data)
                                } else {
                                    this.setState({
                                        fileError: "File format error",
                                    })
                                }
                            }
                        } else {
                            this.setState({
                                fileError: "Please select file",
                            })
                        }


                    }}
                    className='d-none' />
                {this.state.apiLoader && (
                    <div className="row">
                        <div className="col-12">
                            <div className='CuruseSavingCotiner'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='px-3 py-2'> <ApiLoader /> </div>
                                    <div>
                                        <b className='text-grey-900'>Saving Details</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CoursesFiles;