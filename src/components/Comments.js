import React, { Component } from "react";
import PostApi from "../api/Posts";
import ApiLoader from "../components/ApiLoader";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ACTIONS from "../store/actions/index.js";
import PostSound from "../../public/assets/sounds/post_sound.mp3";

import userDefaultImage from "../../public/assets/images/user.png";
import ShowMoreText from "react-show-more-text";

import moment from "moment";
class Comments extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      comments: [],
      commentinput: "",
      commentloader: false,
      commentapi: false,

      commentPage: 1,
      noMoreComments: false,
    };
  }

  commentOnPost = () => {
    if (this.state.commentinput != "") {
      this.setState({ commentapi: true });
      let data = {
        post_id: this.props._id,
        description: this.state.commentinput,
        created_at: new Date(),
      };

      PostApi.commentOnPost(data)
        .then((res) => {
          console.log(res.data);
          new Audio(PostSound).play();
          // this.props.addcomment({
          //     post_id: this.props._id,
          //     comments: res.data.comment
          // })
          this.props.updateComentsCount();
          this.setState({
            comments: [res.data.comment, ...this.state.comments],
            commentapi: false,
            commentinput: "",
          });
        }).catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    let data = {
      post_id: this.props._id,
      page: this.state.commentPage,
    };
    this.setState({ commentloader: true });
    PostApi.getCommentsByPost(data)
      .then((res) => {
        console.log(res.data);
        // this.props.addcomments({
        //     post_id: this.props._id,
        //     comments: res.data.comments,
        // })
        if (res.data.comments.length == 0 || res.data.comments.length < 10) {
          this.setState({ noMoreComments: true });
        }

        this.setState({
          commentloader: false,
          comments: this.state.comments.concat(res.data.comments),
          commentPage: this.state.commentPage + 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  render() {
    return (
      <>
        {this.state.commentapi && (
          <div className="py-2 d-flex justify-content-center align-items-center">
            <ApiLoader />
          </div>
        )}
        {!this.state.commentapi && (
          <div className="d-flex mt-2">
            <div className="flex-grow-1 me-2">
              <textarea
                type="text"
                rows={1}
                value={this.state.commentinput}
                onChange={(e) => {
                  this.setState({ commentinput: e.target.value });
                }}
                placeholder="Write comment....."
                className="commentInput text-grey-500 fw-500 font-xssss"
              
              />
            </div>
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  this.commentOnPost();
                }}
              >
                Comment
              </button>
            </div>
          </div>
        )}
      

        <div className="pt-2 mt-2 ">
          {/* {this.props._id} */}
          {/* {JSON.stringify(this.state.comments,null,2)} */}

          {!this.state.commentloader &&
            this.state.comments &&
            !this.state.comments.length && (
              <div className="pr-2 my-3 text-center text-grey-500 fw-500 font-xssss lh-4">
                No Comment found
              </div>
            )}
          {/* <pre> {JSON.stringify(this.state.comments, null, 2)}</pre> */}
          {this.state.comments.length !== 0 && (
            <div className="commentsContainer">
              {this.state.comments.map((data) => {
                return (
                  <div className="px-2">
                    <div class="card bg-transparent-card w-100   border-0 mb-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start align-items-center ">
                          <div className="smImageControlerRs">
                            <img
                              src={
                                data.comment_by && data.comment_by.profile_photo
                                  ? `${data.comment_by &&
                                  data.comment_by.profile_photo
                                  }`
                                  : userDefaultImage
                              }
                              alt="user"
                              className=""
                            />
                          </div>
                          <div>
                            <h5 class="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block mr-3">
                              {data.comment_by && data.comment_by.name}
                            </h5>
                          </div>
                        </div>

                        <div>
                          <span class="text-grey-400 font-xsssss fw-600 float-right mt-1 text-capitalize ">
                            {moment(data.created_at).fromNow(true)} Ago
                          </span>
                        </div>
                      </div>

                      <div className="flex-grow-1">
                        <h6 class="text-grey-500 fw-500 font-xssss lh-4 comment-paragraph">
                         
                          <ShowMoreText
                            /* Default options */
                            lines={3}
                            more="Show more"
                            less="Show less"
                            className="content-css"
                            anchorClass="my-anchor-css-class"
                            onClick={this.executeOnClick}
                            expanded={false}
                            truncatedEndingComponent={"... "}
                          >
                            {data.description}
                          </ShowMoreText>
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* ************************************** */}
          {this.state.commentloader && (
            <div className="pr-2 my-3 text-center text-grey-500 fw-500 font-xssss lh-4">
              Loading....
            </div>
          )}
          {/* ************************************** */}
          {!this.state.noMoreComments &&
            !this.state.commentloader &&
            this.state.comments &&
            this.state.comments.length >= 10 && (
              <div
                className="pr-2 my-3 text-center cursor-pointer text-grey-500 fw-500 font-xssss lh-4"
                onClick={() => {
                  this.getComments();
                }}
              >
                Load more
              </div>
            )}

          {/* ************************************** */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Posts: state.Posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addcomments: (data) => {
      dispatch(ACTIONS.addcomments(data));
    },
    addcomment: (data) => {
      dispatch(ACTIONS.addcomment(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Comments));
