import Phone from "../UI/Icon/Phone";
import * as constants from '../constants'
import React from "react";

export default function Footer(){
    return (
        <footer>
            <section className={'footer-contact d-flex justify-content-center align-items-center dir-rtl py-2'}>
                <Phone />&nbsp;
                <span>&nbsp;تلفن پشتیبانی :&nbsp;</span>
                <span>&nbsp;021-91076959&nbsp;</span>
            </section>
            <section className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="footer-newsletter dir-rtl">
                                <p>از آخرین محصولات، خبرها و تخفیف‌ها با خبر شوید!</p>
                                <form action="" className={"footer-newsletter-form"} name={"new-footer-main-form-input"}>
                                    <div className="d-flex">
                                        <input type="text"/>
                                        <button>تایید ایمیل</button>
                                    </div>
                                </form>
                            </div>
                            <div className="footer-social-media dir-rtl">
                                <p> هنری در شبکه‌های اجتماعی</p>
                                <div className="d-flex footer-social-media-buttons">
                                    <a href="https://t.me/honarichannel">
                                        <img alt="telegram" src={constants.classNextURL+'/images/icon/8223787565dc898d2998923383ae4a14.png'} />
                                        <span>تلگرام</span>
                                    </a>
                                    <a href="http://instagram.com/honari_com">
                                        <img alt="instagram" src={constants.classNextURL+'/images/icon/732c6a0910b30b4163ead7f9988155ac.png'} />
                                        <span>اینستاگرام</span>
                                    </a>
                                    <a href="http://aparat.com/honari.com">
                                        <img alt="aparat" src={constants.classNextURL+'/images/icon/23ae7b5e5ea6667f1c6f0b86fcd2c575.png'} />
                                        <span>آپارات</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="footer-information dir-rtl">
                                <div className="d-flex footer-logo">
                                    <img width={48} height={48} src={constants.classNextURL+"/images/icon/506bd908fac6e6cb98e0527e2878d0f7.png"} alt=""/>
                                    <div className="d-flex flex-column pr-2 align-self-end">
                                        <span className={'logo-title'}>هنری</span>
                                        <span className={'logo-subtitle'}>تحقق رویای هنرمندانه‌ ی تو</span>
                                    </div>
                                </div>
                                <p className={"footer-address"}>تهران، بلوار مرزداران، خیابان اطاعتی ،خیابان پاس فرهنگیان</p>
                                <div className="footer-main-links">
                                    <ul  className="footer-main-list d-flex p-0">
                                        <li>
                                            <a href={'https://honari.com/stepbysteps/buy_training/%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D9%86%D8%AD%D9%88%D9%87-%D8%AB%D8%A8%D8%AA-%D9%86%D8%A7%D9%85-%D8%AF%D8%B1-%D8%B3%D8%A7%DB%8C%D8%AA%D8%8C-%D8%AE%D8%B1%DB%8C%D8%AF-%D9%88-%D8%B9%D8%B6%D9%88%DB%8C%D8%AA-%D8%AF%D8%B1-%DA%A9%D9%84%D8%A7%D8%B3-%D9%87%D8%A7%DB%8C-%D9%85%D8%AC%D8%A7%D8%B2%DB%8C'}>راهنمای خرید و ثبت نام از وبسایت</a>
                                        </li>
                                        <li>
                                            <a href={'https://docs.google.com/forms/d/e/1FAIpQLSeQlMv9Ou6VEhBsBuW8Da2TQD4osto8i_UxhCu-Xmsxl3vMTA/viewform'}>همکاری با هنری</a>
                                        </li>
                                        <li>
                                            <a href={'https://honari.com/shop'}>جدیدترین محصولات</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={"copyright text-center py-2"}>
                تمامی حقوق برای شرکت دانش بنیان هنربخشان نوین شایگان محفوظ است و انتشار با ذکر دقیق مطلب و لینک به سایت هنری بلامانع است.
            </section>
        </footer>
    )
}