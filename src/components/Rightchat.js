import React,{Component} from 'react';

const chatMember = [
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'bg-success'
    },
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon',
        status: 'bg-success'
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        status: 'bg-warning'
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast',
        status: 'bg-danger'
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'bg-success'
    },
    {
        imageUrl: 'user.png',
        name: 'David Goria',
        status: 'bg-success'
    },
    {
        imageUrl: 'user.png',
        name: 'Seary Victor',
        status: 'bg-success'
    },
    {
        imageUrl: 'user.png',
        name: 'Ana Seary',
        status: 'bg-success'
    },
]

class Rightchat extends Component {
    state = {
        isOpen: false
    };

    constructor() {
        super();
        this.state = {
          width:  800,
          height: 182
        }
      }
    
      /**
       * Calculate & Update state of new dimensions
       */
      updateDimensions() {
        if(window.innerWidth < 500) {
          this.setState({ width: 450, height: 102 });
        } else {
          let update_width  = window.innerWidth-100;
          let update_height = Math.round(update_width/4.4);
          this.setState({ width: update_width, height: update_height });
        }
      }
    
      /**
       * Add event listener
       */
      componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
      }
    
      /**
       * Remove event listener
       */
      componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
      }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        
        const menuClass = `${this.state.isOpen ? " d-block" : ""}`;

        return (
            
            <div id="main-content-wrap" className={`right-chat nav-wrap mt-2 right-scroll-bar d-none ${this.state.width > 1500 ? "active-sidebar" : " "}`}>
                <div className="bg-white middle-sidebar-right-content shadow-xss rounded-xxl">

                    <div className="pt-4 section full pe-3 ps-4 position-relative feed-body">
                        <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">CONTACTS</h4>
                        <ul className="list-group list-group-flush">

                            {chatMember.map((value , index) => (
                                // Start Single Demo 
                                <li  key={index} className="pt-2 pb-2 bg-transparent border-0 list-group-item no-icon pe-0 ps-0 d-flex align-items-center">
                                    <figure className="float-left mb-0 avatar me-2">
                                        <img src={`assets/images/${value.imageUrl}`} alt="avater" className="w35" />
                                    </figure>
                                    <h3 className="mt-0 mb-0 fw-700">
                                        <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer" onClick={this.toggleOpen}>{value.name}</span>
                                    </h3>
                                    <span className={`${value.status} ms-auto btn-round-xss`}></span>
                                </li>
                                // End Single Demo 
                            ))}
                            
                        </ul>
                    </div>
                    <div className="pt-4 pb-4 section full pe-3 ps-4 position-relative feed-body">
                        <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">GROUPS</h4>
                        <ul className="list-group list-group-flush">
                            <li className="pt-2 pb-2 bg-transparent border-0 list-group-item no-icon pe-0 ps-0 d-flex align-items-center">
                                
                                <span className="text-white btn-round-sm bg-primary-gradiant me-3 ls-3 font-xssss fw-700">UD</span>
                                <h3 className="mt-0 mb-0 fw-700">
                                    <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer" onClick={this.toggleOpen}>Studio Express</span>
                                </h3>
                                <span className="mt-0 badge text-grey-500 badge-pill pe-0 font-xsssss">2 min</span>
                            </li>
                            <li className="pt-2 pb-2 bg-transparent border-0 list-group-item no-icon pe-0 ps-0 d-flex align-items-center">
                                
                                <span className="text-white btn-round-sm bg-gold-gradiant me-3 ls-3 font-xssss fw-700">AR</span>
                                <h3 className="mt-0 mb-0 fw-700">
                                    <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer" onClick={this.toggleOpen}>Armany Design</span>
                                </h3>
                                <span className="bg-warning ms-auto btn-round-xss"></span>
                            </li>
                            <li className="pt-2 pb-2 bg-transparent border-0 list-group-item no-icon pe-0 ps-0 d-flex align-items-center">
                                
                                <span className="text-white btn-round-sm bg-mini-gradiant me-3 ls-3 font-xssss fw-700">UD</span>
                                <h3 className="mt-0 mb-0 fw-700">
                                    <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer" onClick={this.toggleOpen}>De fabous</span>
                                </h3>
                                <span className="bg-success ms-auto btn-round-xss"></span>
                            </li>
                        </ul>
                    </div>

                    <div className="pt-0 pb-4 section full pe-3 ps-4 position-relative feed-body">
                        <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">Pages</h4>
                        <ul className="list-group list-group-flush">
                            <li className="pt-2 pb-2 bg-transparent border-0 list-group-item no-icon pe-0 ps-0 d-flex align-items-center">
                                
                                <span className="text-white btn-round-sm bg-primary-gradiant me-3 ls-3 font-xssss fw-700">AB</span>
                                <h3 className="mt-0 mb-0 fw-700">
                                    <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer" onClick={this.toggleOpen}>Armany Seary</span>
                                </h3>
                                <span className="bg-success ms-auto btn-round-xss"></span>
                            </li>
                            <li className="pt-2 pb-2 bg-transparent border-0 list-group-item no-icon pe-0 ps-0 d-flex align-items-center">
                                
                                <span className="text-white btn-round-sm bg-gold-gradiant me-3 ls-3 font-xssss fw-700">SD</span>
                                <h3 className="mt-0 mb-0 fw-700">
                                    <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer" onClick={this.toggleOpen}>Entropio Inc</span>
                                </h3>
                                <span className="bg-success ms-auto btn-round-xss"></span>
                            </li>
                            
                        </ul>
                    </div>



                </div>

                <div className={`modal-popup-chat ${menuClass}`}>
                    <div className="p-0 bg-white shadow-lg modal-popup-wrap rounded-3">
                        <div className="modal-popup-header w-100 border-bottom">
                            <div className="p-3 border-0 card d-block">
                                <figure className="float-left mb-0 avatar me-2">
                                    <img src="assets/images/user-12.png" alt="avater" className="w35 me-1" />
                                </figure>
                                <h5 className="mt-1 mb-1 fw-700 text-primary font-xssss">Hendrix Stamp</h5>
                                <h4 className="mt-0 mb-0 text-grey-500 font-xsssss"><span className="m-0 d-inline-block bg-success btn-round-xss"></span> Available</h4>
                                <div className="top-0 right-0 mt-3 font-xssss position-absolute me-4 pointer" onClick={this.toggleOpen}><i className="mt-2 ti-close text-grey-900 d-inline-block"></i></div>
                            </div>
                        </div>
                        <div className="h-auto p-3 modal-popup-body w-100">
                            <div className="message"><div className="message-content font-xssss lh-24 fw-500">Hi, how can I help you?</div></div>
                            <div className="mt-2 mb-2 date-break font-xsssss lh-24 fw-500 text-grey-500">Mon 10:20am</div>
                            <div className="mt-2 text-right message self"><div className="message-content font-xssss lh-24 fw-500">I want those files for you. I want you to send 1 PDF and 1 image file.</div></div>
                            <div className="float-right pt-3 pb-2 mt-2 snippet ps-4 pe-3 bg-grey rounded-xl" data-title=".dot-typing"><div className="stage"><div className="dot-typing"></div></div></div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="modal-popup-footer w-100 border-top">
                            <div className="p-3 border-0 card d-block">
                                <div className="mb-0 form-group icon-right-input style1-input"><input type="text" placeholder="Start typing.." className="border-0 form-control rounded-xl bg-greylight font-xssss fw-500 ps-3" /><i className="feather-send text-grey-500 font-md"></i></div>
                            </div>
                        </div>
                    </div> 
                </div>   
            </div>

            


            

        );
    }
}

export default Rightchat;