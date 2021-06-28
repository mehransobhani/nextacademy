import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as constants from "../../constants";
import axiosInstance from "../../axiosInstance";
import {CircularProgress} from '@material-ui/core'
import {connect} from "react-redux";
import {withCookies} from "react-cookie";

class CheckOutModal extends React.Component {

    state = {
        userInsertedDiscountCode: '',
        sentDiscountCode: '',
        discountLoading: false,
        paymentLoading: false,
        discountRate: 0,
        errorMessage: '',
        lockInput: false,
    }

    updateUserInsertedDiscountCode = (event) => {
        this.setState({
            userInsertedDiscountCode: event.target.value.trim()
        })
    }

    checkDiscount = () => {
        if (this.state.userInsertedDiscountCode.trim().length > 2 && this.state.userInsertedDiscountCode !== this.state.sentDiscountCode) {

            this.setState({
                discountLoading: true,
                sentDiscountCode: this.state.userInsertedDiscountCode,
                errorMessage: ''
            })

            axiosInstance.post( '/api/payment/check-discount', {
                course: this.props.course.id,
                discountCode: this.state.userInsertedDiscountCode
            })
                .then((response) => {
                    if (response.data.success) {
                        this.setState({
                            discountLoading: false,
                            discountRate: response.data.data.discountRate,
                            lockInput: true
                        })
                    } else {
                        this.setState({
                            discountLoading: false,
                            errorMessage: response.data.message
                        })
                    }
                })
                .catch((error) => {
                    this.setState({
                        discountLoading: false,
                        errorMessage: "مشکلی پیش آمده لطفا دوباره تلاش کنید."
                    })
                })
        }
    }

    submitPayment = () => {
        this.setState({
            paymentLoading: true,
            errorMessage: ''
        })
        const target = 'api/payment?class_id='+this.props.course.id+'&discount_code='+this.state.userInsertedDiscountCode;
        axiosInstance.get(target)
            .then( (response) => {
                if (response.data.data && response.data.data.free){
                    location.reload();
                }
                else{
                    window.location.replace(response.data);
                }
            })
            .catch( (error) => {
                if(error.response && error.response.status === 400){
                    this.setState({
                        paymentLoading: false,
                        errorMessage: error.response.data.message
                    })
                }
                else {
                    this.setState({
                        paymentLoading: false,
                        errorMessage: "مشکلی پیش آمده لطفا دوباره تلاش کنید."
                    })
                }
            })
    }


    render = () => {
        const { cookies } = this.props;
        if(!cookies.cookies.class_token){
            return (
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    id={"checkout-modal"}
                    open={this.props.open}
                    onClose={this.props.checkOutModalButton}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 200,
                    }}
                >
                    <Fade in={this.props.open}>
                        <div className="col-lg-5 col-md-7 col-12 p-0 dir-rtl">
                            <div className="card border-0">
                                <div className="card-header text-center">

                                        <h4 className="mb-0">ورود / ثبت نام</h4>

                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                        <p>
                                            برای خرید دوره ابتدا
                                            <a href={this.props.course.kind === "bundle" ? constants.loginURL+"?site=class&callBack="+encodeURIComponent("/bundles/"+this.props.course.urlfa) : constants.loginURL+"?site=class&callBack="+encodeURIComponent("/courses/"+this.props.course.urlfa)} style={{color : "#00BAC6"}}>
                                                &nbsp;وارد حساب کاربری&nbsp;
                                            </a>
                                            خود شوید
                                        </p>
                                        <p>
                                            اگر حساب کاربری ندارید یک
                                            <a href={this.props.course.kind === "bundle" ? constants.loginURL+"?site=class&callBack="+encodeURIComponent("/bundles/"+this.props.course.urlfa) : constants.loginURL+"?site=class&callBack="+encodeURIComponent("/courses/"+this.props.course.urlfa)} style={{color : "#00BAC6"}}>
                                                &nbsp;حساب جدید&nbsp;
                                            </a>
                                            بسازید
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Fade>
                </Modal>
            )
        }

        return (
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    id={"checkout-modal"}
                    open={this.props.open}
                    onClose={this.props.checkOutModalButton}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 200,
                    }}
                >
                    <Fade in={this.props.open}>
                        <div className="container p-0 dir-rtl">
                            <div className="card border-0">
                                {this.props.course.price > 0 ? (
                                    <React.Fragment>
                                    <div className="card-header text-center">
                                        <h4 className="mb-0">تاییدیه پرداخت</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex course-checkout-wrapper">
                                            <div className="course-thumbnail col-lg-2 col-md-3 col-sm-4">
                                                <img src={constants.imageURL + '/classes/_600_300/' + this.props.course.cover_img}
                                                     alt={this.props.course.name}/>
                                            </div>
                                            <div className="course-info  col-lg-10 col-md-9 col-sm-8">
                                                <h5 className="lesson-title">{this.props.course.name}</h5>
                                                <p>قیمت
                                                    : {this.props.course.off > 0 ? this.props.course.off.toLocaleString('en') : this.props.course.price.toLocaleString('en')} تومان</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                {this.props.course.price === 0 ? null :
                                                    <React.Fragment>
                                                        <div className="course-checkout-form-wrapper align-items-center">
                                                            <label htmlFor="discount" className={"mb-0"}>کد تخفیف
                                                                :&nbsp;&nbsp;</label>
                                                            <input readOnly={this.state.lockInput}
                                                                   value={this.state.userInsertedDiscountCode}
                                                                   onChange={(event) => this.updateUserInsertedDiscountCode(event)}
                                                                   onBlur={this.checkDiscount} id={"discount"}
                                                                   className={"form-control discount-input"} type="text"/>
                                                            {!this.state.lockInput
                                                                ?
                                                                <span onClick={this.checkDiscount}
                                                                      style={{position: "absolute", left: "15px" , color : "#808080"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                             fill="currentColor" className="bi bi-check"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                        </svg>
                                                    </span>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                        <div className="payment-amount-wrapper">
                                                            {this.state.discountLoading
                                                                ?
                                                                <div className={"mb-2"}>
                                                                    <CircularProgress/>
                                                                </div>
                                                                :
                                                                this.state.discountRate > 0
                                                                    ?
                                                                    <div className={"mb-2"}>
                                                                        <p>تخفیف با موفقیت اعمال شد.</p>
                                                                        <p>مقدار تخفیف
                                                                            : {this.state.discountRate.toLocaleString('en')} تومان</p>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                            {
                                                                this.state.discountRate > 0
                                                                    ?
                                                                    <p>مبلغ قابل پرداخت
                                                                        : {this.props.course.off > 0 ? (this.props.course.off - this.state.discountRate).toLocaleString('en') : (this.props.course.price - this.state.discountRate).toLocaleString('en')} تومان</p>
                                                                    :
                                                                    <p>مبلغ قابل پرداخت
                                                                        : {this.props.course.off > 0 ? this.props.course.off.toLocaleString('en') : this.props.course.price.toLocaleString('en')} تومان</p>
                                                            }
                                                        </div>
                                                    </React.Fragment>
                                                }

                                                {
                                                    this.state.errorMessage ? <p className="mb-3 text-danger"> {this.state.errorMessage} </p>
                                                        :
                                                        null
                                                }
                                                <div className="discount-submit-button-wrapper">
                                                    <button onClick={this.submitPayment} type="button" className="btn btn-honari" disabled={this.state.paymentLoading}>
                                                        {
                                                            this.state.paymentLoading ? 'در حال اتصال به درگاه...' : 'پرداخت از طریق درگاه'
                                                        }
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </React.Fragment>) : (
                                    <React.Fragment>
                                        <div className="card-header text-center">
                                            <h4 className="mb-0">ثبت نام در دوره</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex course-checkout-wrapper">
                                                <div className="course-thumbnail col-lg-2 col-md-3 col-sm-4">
                                                    <img src={constants.imageURL + '/classes/_600_300/' + this.props.course.cover_img}
                                                         alt={this.props.course.name}/>
                                                </div>
                                                <div className="course-info  col-lg-10 col-md-9 col-sm-8">
                                                    <h5 className="lesson-title">{this.props.course.name}</h5>
                                                    <p>قیمت
                                                        : {this.props.course.off > 0 ? this.props.course.off.toLocaleString('en') : this.props.course.price.toLocaleString('en')} تومان</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mt-2 mx-auto">


                                                    {
                                                        this.state.errorMessage ? <p className="mb-3 text-danger"> {this.state.errorMessage} </p>
                                                            :
                                                            null
                                                    }
                                                    <div className="discount-submit-button-wrapper">
                                                        <button onClick={this.submitPayment} type="button" className="btn btn-honari" disabled={this.state.paymentLoading}>
                                                            {
                                                                this.state.paymentLoading ? 'در حال ارسال اطلاعات...' : 'ثبت نام در دوره'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </React.Fragment>
                                )

                                }

                            </div>
                        </div>

                    </Fade>
                </Modal>
        );
    }


}

const mapStateToProps = state => ({
    ...state
});

export default withCookies(connect(mapStateToProps)(CheckOutModal));