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
                    <span>{this.state.copied ? "copied" : "Share"}</span>
                    
                </CopyToClipboard>
                {this.state.copied && (
                    <SweetAlert success title="copied" onConfirm={() => this.setState({ copied: false })}
                        customButtons={
                            <React.Fragment>
                                <button className='btn btn-primary bgthwh ms-2' onClick={() => this.setState({ copied: false })}>ok</button>
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