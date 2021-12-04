import React, { Component , Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

class Cart extends Component {
    render() {
        return (
            <Fragment> 
                <Header />
                <Leftnav />
                <Rightchat />

                <div className="bg-white main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" >
                            <div className="row">
                                <div className="mb-4 col-xl-12 cart-wrapper">
                                    <div className="row">
                                        <div className="mb-3 col-lg-12">
                                            <div className="p-4 overflow-hidden border-0 card p-md-5 bg-primary-gradiant rounded-3 shadow-xss bg-pattern">
                                                <div className="bg-pattern-div"></div>
                                                <h2 className="mt-0 mb-0 text-white display2-size display2-md-size fw-700">Cart <span className="mt-2 fw-700 ls-3 text-grey-200 font-xsssss d-block">4 PRODUCT FOUND</span></h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="mb-3 col-lg-8">
                                            <div className="table-content table-responsive">
                                                <table className="table text-center">
                                                    <thead className="bg-greyblue rounded-3">
                                                        <tr>
                                                            <th className="p-4 border-0">&nbsp;</th>
                                                            <th className="p-4 text-left border-0">Product</th>
                                                            <th className="p-4 border-0">Price</th>
                                                            <th className="p-4 border-0">Quantity</th>
                                                            <th className="p-4 border-0">Total</th>
                                                            <th className="p-4 border-0">&nbsp;</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-left product-thumbnail ps-0">
                                                                <img src="https://via.placeholder.com/75x100.png" alt="Product Thumnail" className="w75 rounded-3" />
                                                            </td>
                                                            <td className="text-left product-headline wide-column">
                                                                <h3>
                                                                    <a href="/cart" className="text-grey-900 fw-600 font-xsss">Super skinny blazer</a>
                                                                </h3>
                                                            </td>
                                                            <td className="product-p">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money text-grey-500 fw-600 font-xsss"><span className="font-xsssss">$</span> 49.00</span>
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity">
                                                                <div className="quantity">
                                                                    <input type="number" className="quantity-input open-font fw-600" name="qty" id="qty-1" placeholder="1" min="1" /> 
                                                                <div className="dec qtybutton">-</div><div className="inc qtybutton">+</div></div>
                                                            </td>
                                                            <td className="product-total-price">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money fmont"><strong><span className="font-xsssss">€ </span>49.00</strong></span>
                                                                </span>
                                                            </td>
                                                            <td className="text-right product-remove"><a href="/cart"><i className="ti-trash font-xs text-grey-500"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left product-thumbnail ps-0">
                                                                <img src="https://via.placeholder.com/75x100.png" alt="Product Thumnail" className="w75 rounded-3" />
                                                            </td>
                                                            <td className="text-left product-headline wide-column">
                                                                <h3>
                                                                    <a href="/cart" className="text-grey-900 fw-600 font-xsss"> Jogging trousers</a>
                                                                </h3>
                                                            </td>
                                                            <td className="product-p">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money text-grey-500 fw-600 font-xsss"><span className="font-xsssss">$</span> 49.00</span>
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity">
                                                                <div className="quantity">
                                                                    <input type="number" className="quantity-input open-font fw-600" name="qty" id="qty-2" placeholder="1" min="1" />
                                                                <div className="dec qtybutton">-</div><div className="inc qtybutton">+</div></div>
                                                            </td>
                                                            <td className="product-total-price">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money fmont"><strong><span className="font-xsssss">$ </span>49.00</strong></span>
                                                                </span>
                                                            </td>
                                                            <td className="text-right product-remove"><a href="/cart"><i className="ti-trash font-xs text-grey-500"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left product-thumbnail ps-0">
                                                                <img src="https://via.placeholder.com/75x100.png" alt="Product Thumnail" className="w75 rounded-3" />
                                                            </td>
                                                            <td className="text-left product-headline wide-column">
                                                                <h3>
                                                                    <a href="/cart" className="text-grey-900 fw-600 font-xsss"> Grey blue leather backpack</a>
                                                                </h3>
                                                            </td>
                                                            <td className="product-p">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money text-grey-500 fw-600 font-xsss"><span className="font-xsssss">$</span> 49.00</span>
                                                                </span>
                                                            </td>
                                                            <td className="product-quantity">
                                                                <div className="quantity">
                                                                    <input type="number" className="quantity-input open-font fw-600" name="qty" id="qty-3" placeholder="1" min="1" />
                                                                <div className="dec qtybutton">-</div><div className="inc qtybutton">+</div></div>
                                                            </td>
                                                            <td className="product-total-price">
                                                                <span className="product-price-wrapper">
                                                                    <span className="money fmont"><strong><span className="font-xsssss">€ </span>49.00</strong></span>
                                                                </span>
                                                            </td>
                                                            <td className="text-right product-remove"><a href="/cart"><i className="ti-trash font-xs text-grey-500"></i></a></td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="float-left mb-2 coupon">
                                                <input type="text" className="p-3 input-code form-control h60" placeholder="Coupon Code.." />
                                                <a href="/cart" className="p-3 text-center text-white border bg-dark fw-600 text-uppercase font-xssss border-dark rounded-3 border-size-md d-inline-block w175 ls-3">Apply Coupon</a>
                                            </div>
                                            <a href="/cart" className="float-right p-3 text-center text-white border update-cart bg-dark fw-600 text-uppercase font-xssss border-dark rounded-3 border-size-md d-inline-block w175 ls-3">Update Cart</a>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="p-4 mb-3 border-0 checkout-payment card bg-greyblue">
                                                <div className="cart-totals">
                                                    <h4 className="mb-5 mont-font fw-600 font-md">Cart totals</h4>
                                                    <div className="table-content table-responsive">
                                                        <table className="table order-table">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="pt-2 font-xsss fw-600">Subtotal</td>
                                                                    <td className="pt-2 text-right font-xssss fw-700 text-grey-600">$196.00</td>  
                                                                </tr>
                                                                <tr>
                                                                    <td className="pt-2 font-xsss fw-600">Shipping</td>
                                                                    <td className="pt-2 text-right font-xssss fw-700 text-grey-600">
                                                                        <span>Flat rate: $20.00</span>
                                                                    </td>  
                                                                </tr>
                                                                <tr className="order-total">
                                                                    <td className="pt-2 font-xsss fw-600">Total</td>
                                                                    <td className="pt-2 text-right font-xssss fw-700 text-grey-600">
                                                                        <span className="product-price-wrapper">
                                                                            <span className="money fmont">$226.00</span>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <a href="/cart" className="float-right p-3 text-center text-white border bg-dark fw-600 text-uppercase font-xsss border-dark rounded-3 border-size-md d-inline-block w-100 ls-3">Proceed To Checkout</a>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Popupchat />
                <Appfooter /> 
            </Fragment>
        );
    }
}

export default Cart;