import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class CopyToClip extends Component {
    state = {
        copied: false,
    }
    render() {
        return (

            <div className='mt-2'>
                <div className='p-2 rounded-3 bg-grey d-flex justify-content-between'>
                    <div> <small className='font-xssss text-grey-800'>{this.props.copyText}</small></div>
                    <div className='px-2 cursor-pointer'>
                        <CopyToClipboard
                            text={this.props.copyText}
                            onCopy={() => this.setState({ copied: true })}
                        >
                            {this.state.copied ? (<i class="far fa-check text-success"></i>) : (<i class="far fa-copy text-grey-800"></i>)}
                        </CopyToClipboard>
                    </div>

                </div>
            </div>



        );
    }
}

export default CopyToClip;