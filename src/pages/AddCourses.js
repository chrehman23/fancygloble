import React, { Component, Fragment } from 'react'
import Header from '../components/Header'
import Leftnav from '../components/Leftnav'
import Rightchat from '../components/Rightchat'
import Pagetitle from '../components/Pagetitle'
import Appfooter from '../components/Appfooter'
import Popupchat from '../components/Popupchat'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import ApiLoader from '../components/ApiLoader'

import CourseApi from '../api/Courses'

import CoursesSectionList from '../components/CoursesSectionList'
import moment from 'moment'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      updateingCourse: false,
      loadingCourse: true,

      TitleEdite: false,
      titleInput: 'Course Title',
      desEdite: false,
      desInput: 'Course des',

      Course_id: '',

      learning_points: '',
      requirements: '',
      course_level: '',
      audio_language: '',
      course_category: '',
      paid_amount: 0,
      discount_amount: 0,
      video_url: '',
      thumbnail: '',

      vedioUploading: false,
      publish: false,
      start_date: '',
      end_date: '',
      editing: false,
      coupon: false,
      coupon_code: '',
      coupon_type: '',
      coupon_value: '',
      coupon_count: 0,
      coupon_validity: ''
    }
  }
  componentDidMount() {
    let Course_id = localStorage.getItem('add_course_id')
    if (Course_id) {
      this.setState({
        editing: true
      })
      let data = {
        course_id: Course_id
      }
      CourseApi.courseDetails(data)
        .then(res => {
          console.log(res)
          if (res.data.Error == false) {
            this.setState({
              titleInput: res.data.data.title,
              desInput: res.data.data.description,
              learning_points: res.data.data.learning_points,
              requirements: res.data.data.requirements,
              course_level: res.data.data.course_level,
              audio_language: res.data.data.audio_language,
              course_category: res.data.data.course_category,
              paid_amount: res.data.data.paid_amount,
              discount_amount: res.data.data.discount_amount,
              video_url: res.data.data.video_url,
              thumbnail: res.data.data.thumbnail,
              publish: res.data.data.publish,
              end_date: res.data.data.end_date,

              Course_id: res.data.data._id,
              loadingCourse: false,
              start_date: res.data.data.start_date,

              coupon: res.data.data.coupon,
              coupon_code: res.data.data.coupon_code,
              coupon_type: res.data.data.coupon_type,
              coupon_value: res.data.data.coupon_value,
              coupon_validity: res.data.data.coupon_validity
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      CourseApi.addCourse()
        .then(res => {
          console.log(res)
          if (res.data.Error == false) {
            this.setState({
              Course_id: res.data.Course_id,
              loadingCourse: false
            })
            localStorage.setItem('add_course_id', res.data.Course_id)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  updateCourse = data => {
    data.append('course_id', this.state.Course_id)
    this.setState({
      updateingCourse: true
    })
    CourseApi.updateCourse(data)
      .then(res => {
        console.log(res)
        if (res.data.Error == false) {
          this.setState({
            updateingCourse: false,
            video_url: res.data.data.video_url,
            thumbnail: res.data.data.thumbnail,
            publish: res.data.data.publish,
            vedioUploading: false
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Leftnav />
        <Rightchat />

        <div className='main-content right-chat-active'>
          <div className='middle-sidebar-bottom'>
            <div className='middle-sidebar-left pe-0'>
              <div className='p-4 border-0 card-body w-100 bgthwh d-flex rounded-3'>
                <a
                  href='#'
                  className='mt-2 d-inline-block'
                  onClick={() => {
                    this.props.history.goBack()
                  }}
                >
                  <i className='text-white ti-arrow-left font-sm'></i>
                </a>
                {/* <Link to="/" className="mt-2 d-inline-block"></Link> */}
                <h4 className='mt-2 mb-0 text-white font-xs fw-600 ms-4'>
                  {' '}
                  {this.state.editing ? 'Edit Course' : 'Add New Course'}
                </h4>
              </div>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='p-4 mb-3 border-0 card shadow-xss w-100 d-block d-flex'>
                    <h2 className='mt-0 mb-0 fw-800 font-md text-grey-900 d-flex justify-content-between align-items-center'>
                      How to add course
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries,
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>

              {!this.state.loadingCourse && (
                <div className='p-4 mb-3 border-0 card shadow-xss w-100 d-block d-flex'>
                  <div className='row'>
                    <div className='col-12 col-md-12'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Course Title
                      </label>
                      <input
                        type='text'
                        value={this.state.titleInput}
                        onChange={e => {
                          this.setState({
                            titleInput: e.target.value
                          })
                        }}
                        onBlur={() => {
                          let data = new FormData()
                          data.append('title', this.state.titleInput)
                          this.updateCourse(data)
                        }}
                        className='form-control course-input'
                        placeholder='Course Title'
                      />
                    </div>
                  </div>

                  <div className='mt-3 row'>
                    <div className='col-12 col-md-12'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Course Description
                      </label>
                      <textarea
                        className='form-control course-input'
                        row='15'
                        value={this.state.desInput}
                        onChange={e => {
                          this.setState({
                            desInput: e.target.value
                          })
                        }}
                        onBlur={() => {
                          let data = new FormData()
                          data.append('description', this.state.desInput)
                          this.updateCourse(data)
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-12 col-md-6'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        What will students learn in your course?
                      </label>
                      <textarea
                        className='form-control course-input'
                        row='15'
                        value={this.state.learning_points}
                        onChange={e => {
                          this.setState({
                            learning_points: e.target.value
                          })
                        }}
                        onBlur={() => {
                          let data = new FormData()
                          data.append(
                            'learning_points',
                            this.state.learning_points
                          )
                          this.updateCourse(data)
                        }}
                      ></textarea>
                    </div>
                    <div className='col-12 col-md-6'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Requirements
                      </label>
                      <textarea
                        className='form-control course-input'
                        row='15'
                        value={this.state.requirements}
                        onChange={e => {
                          this.setState({
                            requirements: e.target.value
                          })
                        }}
                        onBlur={() => {
                          let data = new FormData()
                          data.append('requirements', this.state.requirements)
                          this.updateCourse(data)
                        }}
                      ></textarea>
                    </div>
                    <div className='col-12 col-md-6'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Course Level
                      </label>
                      <select
                        name=''
                        id=''
                        className='form-control course-input'
                        value={this.state.course_level}
                        onChange={e => {
                          this.setState(
                            {
                              course_level: e.target.value
                            },
                            () => {
                              let data = new FormData()
                              data.append(
                                'course_level',
                                this.state.course_level
                              )
                              this.updateCourse(data)
                            }
                          )
                        }}
                      >
                        <option value=''>Select Level</option>
                        <option value='Beginner'>Beginner</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Expert'>Expert</option>
                      </select>
                    </div>
                    <div className='col-12 col-md-6'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Audio Language
                      </label>
                      <select
                        name=''
                        id=''
                        className='form-control course-input'
                        value={this.state.audio_language}
                        onChange={e => {
                          this.setState(
                            {
                              audio_language: e.target.value
                            },
                            () => {
                              let data = new FormData()
                              data.append(
                                'audio_language',
                                this.state.audio_language
                              )
                              this.updateCourse(data)
                            }
                          )
                        }}
                      >
                        <option value=''>Select Language</option>
                        <option value='English'>English</option>
                        <option value='French'>French</option>
                        <option value='Finnish'>Finnish</option>
                      </select>
                    </div>
                    <div className='col-12 col-md-6'>
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Course Category
                      </label>
                      <select
                        name=''
                        id=''
                        className='form-control course-input'
                        value={this.state.course_category}
                        onChange={e => {
                          this.setState({ course_category: e.target.value })
                          let data = new FormData()
                          data.append('course_category', e.target.value)
                          this.updateCourse(data)
                        }}
                      >
                        <option value=''>Select Category</option>
                        <option value='Communications'>Communications</option>
                        <option value='Management'>Management</option>
                        <option value='Sales'>Sales</option>
                        <option value='Operations'>Operations</option>
                      </select>
                      {/* ******************** */}
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Course Start Date
                      </label>
                      <input
                        type='datetime-local'
                        className='form-control course-input'
                        value={this.state.start_date}
                        min={new Date()}
                        onChange={e => {
                          this.setState({ start_date: e.target.value })
                          let data = new FormData()
                          data.append('start_date', e.target.value)
                          this.updateCourse(data)
                        }}
                      />
                      <label htmlFor='' className='course-title-font'>
                        Course End Date
                      </label>
                      <input
                        type='datetime-local'
                        className='form-control course-input'
                        value={this.state.end_date}
                        min={new Date()}
                        onChange={e => {
                          this.setState({ end_date: e.target.value })
                          let data = new FormData()
                          data.append('end_date', e.target.value)
                          this.updateCourse(data)
                        }}
                      />
                      {/* ******************** */}
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Discount Price
                      </label>
                      <input
                        type='number'
                        className='form-control course-input'
                        placeholder='€0'
                        value={this.state.discount_amount}
                        onChange={e => {
                          if (e.target.value < this.state.paid_amount) {
                            this.setState({
                              discount_amount: parseInt(e.target.value)
                            })
                          }
                        }}
                        onBlur={() => {
                          let data = new FormData()
                          data.append(
                            'discount_amount',
                            this.state.discount_amount
                          )
                          this.updateCourse(data)
                        }}
                      />
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Actual Cost Price
                      </label>
                      <input
                        type='number'
                        className='form-control course-input'
                        placeholder='€0'
                        value={this.state.paid_amount}
                        onChange={e => {
                          this.setState({
                            paid_amount: parseInt(e.target.value)
                          })
                        }}
                        onBlur={() => {
                          let data = new FormData()
                          data.append('paid_amount', this.state.paid_amount)
                          this.updateCourse(data)
                        }}
                      />

                      <h3>
                        €{this.state.paid_amount} €
                        <del> {this.state.paid_amount + this.state.discount_amount}</del>
                      </h3>
                      {/* ******************** */}
                    </div>

                    <div className='col-12 col-md-6'>
                      <input
                        type='file'
                        id='vedio_c'
                        onChange={e => {
                          if (e.target.value) {
                            let mb = parseInt(
                              (
                                e.currentTarget.files[0].size /
                                (1024 * 1024)
                              ).toFixed(2)
                            )
                            // console.log("mb", typeof mb)
                            if (mb > 10) {
                              this.setState({
                                fileError: 'File size should less then 1MB'
                              })
                            } else {
                              if (
                                e.currentTarget.files[0].type.split('/')[0] ==
                                'video'
                              ) {
                                const file = e.currentTarget.files[0]
                                let data = new FormData()
                                data.append('video_url', file)
                                this.setState({
                                  vedioUploading: true
                                })
                                this.updateCourse(data)
                              } else {
                              }
                            }
                          } else {
                          }
                        }}
                        className='d-none'
                      />
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Intro Course Overview
                      </label>
                      {this.state.video_url == '' && (
                        <div className='rounded courseUploadVedio bgthwh'>
                          <div className='text-center'>
                            <button
                              onClick={() => {
                                document.getElementById('vedio_c').click()
                              }}
                              className='btn btn-danger'
                            >
                              Upload Video
                            </button>
                            <p className='pb-0 mb-0'>File Format: .mp4</p>
                          </div>
                        </div>
                      )}

                      {!this.state.updateingCourse && this.state.video_url && (
                        <button
                          className='btn btn-tertiary'
                          onClick={() => {
                            document.getElementById('vedio_c').click()
                          }}
                        >
                          Update
                        </button>
                      )}

                      {!this.state.vedioUploading && this.state.video_url && (
                        <div className='p-0 mt-3 mb-3 card-body d-block'>
                          <div className='row'>
                            <div className='col-12 '>
                              <video className='vedioPlayer' controls>
                                <source
                                  src={this.state.video_url}
                                  type='video/mp4'
                                />
                                Your browser does not support HTML5 video.
                              </video>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className='pt-3 discount-coupon'>
                        <div
                          className='mt-1 d-flex align-items-center'
                          onClick={() => {
                            this.setState(
                              { coupon: !this.state.coupon },
                              () => {
                                let data = new FormData()
                                data.append('coupon', this.state.coupon)
                                this.updateCourse(data)
                              }
                            )
                          }}
                        >
                          <div className='check_coup'>
                            <span
                              className={this.state.coupon ? 'active' : ''}
                            ></span>
                          </div>
                          <div>
                            <p className='mb-0 ms-2 font-weight-bold '>
                              {' '}
                              <b>Add Discount Coupon</b>{' '}
                            </p>
                          </div>
                        </div>
                        {this.state.coupon && (
                          <>
                            <label
                              htmlFor=''
                              className='mb-0 course-title-font'
                            >
                              Create Coupon Code
                            </label>
                            <input
                              type='text'
                              className='form-control course-input'
                              placeholder='E24234AD'
                              value={this.state.coupon_code}
                              onChange={e => {
                                this.setState({
                                  coupon_code: e.target.value
                                })
                              }}
                              onBlur={() => {
                                let data = new FormData()
                                data.append(
                                  'coupon_code',
                                  this.state.coupon_code
                                )
                                this.updateCourse(data)
                              }}
                            />
                            <label
                              htmlFor=''
                              className='mb-0 course-title-font'
                            >
                              Discount Type
                            </label>
                            <div>
                              <div class="form-check cursor-pointer">
                                <input class="form-check-input" type="radio" name="coupon_type" id="coupon_type"
                                  checked={this.state.coupon_type == "Flate Price" ? true : false}
                                  onChange={(e) => {
                                    this.setState(
                                      {
                                        coupon_type: e.target.value
                                      },
                                      () => {
                                        let data = new FormData()
                                        data.append(
                                          'coupon_type',
                                          this.state.coupon_type
                                        )
                                        if (this.state.coupon_value > 99) {
                                          data.append('coupon_value', 0)
                                          this.setState({
                                            coupon_value: 0
                                          })
                                        }
                                        this.updateCourse(data)
                                      }
                                    )
                                  }}
                                  value="Flate Price"
                                />
                                <label class="form-check-label" for="coupon_type">
                                  Flate Price
                                </label>
                              </div>
                              <div class="form-check cursor-pointer">
                                <input class="form-check-input" type="radio" name="coupon_type" id="coupon_type1"
                                  checked={this.state.coupon_type == "Percentage" ? true : false}
                                  onChange={(e) => {
                                    this.setState(
                                      {
                                        coupon_type: e.target.value
                                      },
                                      () => {
                                        let data = new FormData()
                                        data.append(
                                          'coupon_type',
                                          this.state.coupon_type
                                        )
                                        if (this.state.coupon_value > 99) {
                                          data.append('coupon_value', 0)
                                          this.setState({
                                            coupon_value: 0
                                          })
                                        }
                                        this.updateCourse(data)
                                      }
                                    )
                                  }}
                                  value="Percentage"
                                />
                                <label class="form-check-label" for="coupon_type1">
                                  Percentage
                                </label>
                              </div>
                            </div>



                            {this.state.coupon_type == 'Flate Price' && (
                              <>
                                <label
                                  htmlFor=''
                                  className='mb-0 course-title-font'
                                >
                                  Flate Price
                                </label>
                                <input
                                  type='number'
                                  className='form-control course-input'
                                  placeholder='€0'
                                  value={this.state.coupon_value}
                                  onChange={e => {
                                    if (
                                      e.target.value <
                                      this.state.paid_amount -
                                      this.state.discount_amount
                                    ) {
                                      this.setState({
                                        coupon_value: e.target.value
                                      })
                                    }
                                  }}
                                  onBlur={() => {
                                    let data = new FormData()
                                    data.append(
                                      'coupon_value',
                                      this.state.coupon_value
                                    )
                                    this.updateCourse(data)
                                  }}
                                />
                              </>
                            )}
                            {this.state.coupon_type == 'Percentage' && (
                              <>
                                <label
                                  htmlFor=''
                                  className='mb-0 course-title-font'
                                >
                                  Percentage
                                </label>
                                <input
                                  type='number'
                                  className='form-control course-input'
                                  placeholder='%'
                                  value={this.state.coupon_value}
                                  onChange={e => {
                                    if (e.target.value < 100) {
                                      this.setState({
                                        coupon_value: e.target.value
                                      })
                                    }
                                  }}
                                  onBlur={() => {
                                    let data = new FormData()
                                    data.append(
                                      'coupon_value',
                                      this.state.coupon_value
                                    )
                                    this.updateCourse(data)
                                  }}
                                />
                              </>
                            )}
                            {this.state.coupon_type && (
                              <>
                                <label
                                  htmlFor=''
                                  className='mb-0 course-title-font'
                                >
                                  Number Of Uses
                                </label>
                                <input
                                  type='number'
                                  className='form-control course-input'
                                  placeholder='Number Of Uses'
                                  value={this.state.coupon_count}
                                  onChange={e => {
                                    this.setState({
                                      coupon_count: e.target.value
                                    })
                                  }}
                                  onBlur={() => {
                                    let data = new FormData()
                                    data.append(
                                      'coupon_count',
                                      this.state.coupon_count
                                    )
                                    this.updateCourse(data)
                                  }}
                                />
                                <label
                                  htmlFor=''
                                  className='mb-0 course-title-font'
                                >
                                  Valdity Date
                                </label>
                                {moment(new Date()).format('YYYY-MM-DDTHH:MM:SS')}
                                <input
                                  type='datetime-local'
                                  className='form-control course-input'
                                  placeholder='Number Of Uses'
                                  // min="2021-2-18T10:30:55"
                                  // min="2019-02-18T10:30:55"
                                  
                                  // min={moment(new Date()).format('YYYY-MM-DD')}
                                  value={this.state.coupon_validity}
                                  min={moment(new Date()).format('YYYY-MM-DDTHH:MM:SS')}
                                  onChange={e => {
                                    this.setState({
                                      coupon_validity: e.target.value
                                    })
                                  }}
                                  onBlur={() => {
                                    let data = new FormData()
                                    data.append(
                                      'coupon_validity',
                                      this.state.coupon_validity
                                    )
                                    this.updateCourse(data)
                                  }}
                                />
                              </>
                            )}
                          </>
                        )}
                      </div>

                      <div className='float-right d-flex'>
                        {this.state.publish && (
                          <div>
                            <button
                              onClick={() => {
                                let data = new FormData()
                                data.append('publish', false)
                                this.updateCourse(data)
                              }}
                              className='bgthwh btn btn-sm btn-primary'
                            >
                              Unpublish
                            </button>
                          </div>
                        )}
                        {!this.state.publish && (
                          <div>
                            <button
                              onClick={async () => {
                                let data = new FormData()
                                data.append('publish', true)
                                await this.updateCourse(data)
                                this.props.history.goBack('/courses')
                              }}
                              className='bgthwh btn btn-sm btn-primary'
                            >
                              Publish
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='col-12 col-md-6'>
                      <input
                        type='file'
                        id='thumbnail'
                        onChange={e => {
                          if (e.target.value) {
                            let mb = parseInt(
                              (
                                e.currentTarget.files[0].size /
                                (1024 * 1024)
                              ).toFixed(2)
                            )
                            // console.log("mb", typeof mb)
                            if (mb > 1) {
                              this.setState({
                                fileError: 'File size should less then 1MB'
                              })
                            } else {
                              if (
                                e.currentTarget.files[0].type.split('/')[0] ==
                                'image'
                              ) {
                                const file = e.currentTarget.files[0]
                                let data = new FormData()
                                data.append('thumbnail', file)
                                this.updateCourse(data)
                              } else {
                              }
                            }
                          } else {
                          }
                        }}
                        className='d-none'
                      />
                      <label htmlFor='' className='mb-0 course-title-font'>
                        Course Thumbnail
                      </label>
                      {this.state.thumbnail == '' && (
                        <div className='rounded courseUploadVedio bgthwh'>
                          <div className='text-center'>
                            <button
                              className='btn btn-danger'
                              onClick={() => {
                                document.getElementById('thumbnail').click()
                              }}
                            >
                              Upload Thumbnail
                            </button>
                            <p className='pb-0 mb-0'>
                              File Format: jpg,jpeg, or png
                            </p>
                          </div>
                        </div>
                      )}
                      {!this.state.updateingCourse && this.state.thumbnail && (
                        <button
                          className='mx-2 bgthwh btn btn-sm btn-primary'
                          onClick={() => {
                            document.getElementById('thumbnail').click()
                          }}
                        >
                          Upload
                        </button>
                      )}
                      <div>
                        {this.state.thumbnail !== '' && (
                          <img
                            src={this.state.thumbnail}
                            className='img-fluid'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {this.state.Course_id && (
                    <CoursesSectionList
                      course_title={this.state.titleInput}
                      course_des={this.state.desInput}
                      course_id={this.state.Course_id}
                    />
                  )}
                </div>
              )}
              {/************************************* */}
            </div>
          </div>
        </div>

        {/* ******************************** */}

        {this.state.updateingCourse && (
          <div className='row'>
            <div className='col-12'>
              <div className='CuruseSavingCotiner'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='px-3 py-2'>
                    {' '}
                    <ApiLoader />{' '}
                  </div>
                  <div>
                    <b className='text-grey-900'>Saving Details</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Popupchat />
        <Appfooter />
      </Fragment>
    )
  }
}

export default withRouter(Courses)
