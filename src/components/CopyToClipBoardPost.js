import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SweetAlert from 'react-bootstrap-sweetalert'
class CopyToClip2 extends Component {
    state = {
        copied: false,
    }
    render() {
        return (

          <>
               
                <CopyToClipboard
                    text={this.props.copyText}
                    onCopy={() => this.setState({ copied: true })}
                >
                    <div className={`pointer ms-auto   d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss`} data-bs-toggle="dropdown" aria-expanded="false"
                    // onClick={this.toggleOpen}
                    >
                        <i className="far fa-share text-grey-900 btn-round-sm font-lg"></i>
                        <span className="d-none-xs">
                    <span>{this.state.copied ? "copied" : "Share"}</span>
                    </span>
                    </div >
                    
                </CopyToClipboard>
            
                {this.state.copied && (
                    <SweetAlert success title="copied" onConfirm={() => this.setState({ copied: false })}
                        customButtons={
                            <React.Fragment>
                                <button className='btn btn-primary bgthwh ms-2' onClick={() => this.setState({ copied: false })}>OK</button>
                            </React.Fragment>
                        }
                    >
                    
                    </SweetAlert>
                )}
               
          </>

        );
    }
}

export default CopyToClip2;