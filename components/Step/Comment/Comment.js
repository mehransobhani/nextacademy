import React, {useEffect, useState} from "react";
import {gregorian_to_jalali} from '../../jdf'
import Collapse from '@material-ui/core/Collapse';
import {useCookies} from 'react-cookie';
import axiosInstance from "../../axiosInstance";
import Pagination from '@material-ui/lab/Pagination';
import {useSelector} from "react-redux";
import * as constants from "../../constants"

function comment(props) {

    const [user, setUser] = useState({id: null, name: null, mobile: null, profilepic: null});
    const [commentNumber, setCommentNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [successReply, setSuccessReply] = useState({});
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [replyForm, setReplyForm] = useState({0: true});
    const [commentReplyInput, setCommentReplyInput] = useState('');


    const [cookies] = useCookies();

    const reduxUser = useSelector(state => state.user_info)


    useEffect(() => {
        if (reduxUser.user_id) {
            setUser({
                id: reduxUser.user_id,
                name: reduxUser.user_name,
                mobile: reduxUser.user_mobile,
                profilepic: reduxUser.profilepic,
            })
        } else {
            setUser({
                id: null,
                name: null,
                mobile: null,
                profilepic: null
            })
        }
    }, [reduxUser]);


    useEffect(() => {
        getComments({}, 1);
    }, [])

    const getComments = (event, page) => {
        setLoading(true)
        axiosInstance.get('/api/steps/' + props.step_id + '/comments?page=' + page)
            .then((response) => {
                setCommentNumber(response.data.data.comments.total)
                setComments(response.data.data.comments.data)
                setPageCount(response.data.data.comments.last_page)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const addReply = (comment_id) => {
        const obj = {0: true};
        obj[comment_id] = !replyForm[comment_id];
        setReplyForm(obj)

        setCommentReplyInput('');
    }


    const commentReplySubmitForm = (event, comment_id = 0) => {

        setSuccessReply({});

        event.preventDefault();
        if (commentReplyInput) {
            axiosInstance.post("api/steps/add-reply-comment", {
                replyToID: comment_id,
                comment: commentReplyInput,
                onIDofSection: props.step_id,

            })
                .then((response) => {
                    if (response && response.data.success) {
                        setSuccessReply({});

                        const ReplyFormObj = {};
                        ReplyFormObj[comment_id] = false;
                        setReplyForm({...replyForm, ...ReplyFormObj});

                        const SuccessReplyObj = {};
                        SuccessReplyObj[comment_id] = true;
                        setSuccessReply({...SuccessReplyObj});

                        setCommentReplyInput('');
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const commentInputChange = (event) => {
        setCommentInput(event.target.value)
    }

    const commentSubmitForm = (event) => {
        setSuccessReply({});


        event.preventDefault();
        if (setCommentInput) {
            axiosInstance.post("api/steps/add-reply-comment", {
                replyToID: 0,
                comment: commentInput,
                onIDofSection: props.step_id,

            })
                .then((response) => {
                    setReplyForm({...replyForm, 0: false})
                    setSuccessReply({...successReply, 0: true})
                    setCommentInput('')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const commentReplyInputChange = (event) => {
        setCommentReplyInput(event.target.value)
    }


    return (
        <div className="container-fluid dir-rtl mb-4">
            <div id={"step-comments-wrapper"}>
                <div className="comment-header">
                    <div className="comment-title">پرسش و پاسخ</div>
                    <span className="comments-count"> <span>{commentNumber}</span> پرسش  </span>
                </div>

                <div className="mt-4">
                    {user.id && user.name
                        ?
                        <React.Fragment>
                            <Collapse in={successReply[0]}>
                                <div className="alert alert-success">
                                    کامنت شما با موفقیت ثبت شد. پس از تایید مدیر در سایت نمایش داده میشود.
                                </div>
                            </Collapse>
                            <Collapse in={replyForm[0]}>
                                <div className="comment-reply">
                                    <div className="comment-wrapper">

                                        <div className={'user-avatar'}>
                                            <img alt={'avatar'}
                                                 src={user.profilepic ?  constants.authURL+"/warehouse/profileimg/_250/" +user.profilepic : "https://honari.com/image/profileimg/_48/sample-icon.png"}/>
                                        </div>

                                        <div className="comment-content-wrapper">


                                            <div className="each-comment">

                                                <div className="arrow-right"/>

                                                <div className="d-flex justify-content-between mb-2">
                                                    <div className="comment-owner">{user.name}</div>
                                                </div>
                                                <div className="comment-form">
                                                    <form onSubmit={(event) => commentSubmitForm(event)}>
            <textarea name="" id="" cols="30" rows="6" value={commentInput}
                      onChange={commentInputChange}/>
                                                        <button disabled={commentInput ? null : 'disabled'}
                                                                className={"btn btn-honari comment-submit-button"}>ثبت
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Collapse>
                        </React.Fragment>
                        :
                        null
                    }
                </div>


                {
                    comments.length > 0 ? <React.Fragment>
                            <div className={'old-comments'}>

                                {
                                    comments.map((comment, index) => {

                                        const currentDate = new Date(comment.date * 1000);
                                        const currentDayOfMonth = currentDate.getDate();
                                        const currentMonth = currentDate.getMonth();
                                        const currentYear = currentDate.getFullYear();

                                        const jalaliDate = gregorian_to_jalali(currentYear, currentMonth + 1, currentDayOfMonth)


                                        if (comment.get_user) {
                                            return (
                                                <div key={comment.id}>
                                                    <div className="main-comment">
                                                        <div className="comment-wrapper">

                                                            <div className={'user-avatar'}>
                                                                <img alt={'avatar'}
                                                                     src={comment.get_user.profilepic ? constants.authURL+"/warehouse/profileimg/_250/" +comment.get_user.profilepic : 'https://honari.com/image/profileimg/_48/sample-icon.png'}
                                                                />
                                                            </div>

                                                            <div className="comment-content-wrapper">
                                                                <div className="comment-content">


                                                                    <div className="each-comment">

                                                                        <div className="arrow-right"/>

                                                                        <div
                                                                            className="d-flex justify-content-between mb-2">

                                                                            <div
                                                                                className="comment-owner">{comment.get_user ? comment.get_user.name : null}</div>
                                                                            <div
                                                                                className="comment-date dir-ltr">{jalaliDate[0] + ' / ' + (jalaliDate[1] < 10 ? '0' : '') + jalaliDate[1] + ' / ' + (jalaliDate[2] < 10 ? '0' : '') + jalaliDate[2]}</div>
                                                                        </div>
                                                                        <div className="comment-text">
                                                                            <div
                                                                                dangerouslySetInnerHTML={{__html: comment.comment}}/>
                                                                        </div>

                                                                        {user.id && user.name ?
                                                                            <a onClick={() => addReply(comment.id)}
                                                                               className="btn btn-honari comment-reply-button"> {replyForm[comment.id] ? 'بستن' : 'پاسخ'} </a> : null}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <Collapse in={successReply[comment.id]}>
                                                        <div className="alert alert-success">
                                                            کامنت شما با موفقیت ثبت شد. پس از تایید مدیر در سایت نمایش داده
                                                            میشود
                                                        </div>
                                                    </Collapse>

                                                    <Collapse in={replyForm[comment.id]}>
                                                        <div className="comment-reply">
                                                            <div className="comment-wrapper">

                                                                <div className={'user-avatar'}>
                                                                    <img alt={'avatar'}
                                                                         src={user.profilepic ?  constants.authURL+"/warehouse/profileimg/_250/" +user.profilepic : "https://honari.com/image/profileimg/_48/sample-icon.png"}/>
                                                                </div>

                                                                <div className="comment-content-wrapper">


                                                                    <div className="each-comment">

                                                                        <div className="arrow-right"/>

                                                                        <div
                                                                            className="d-flex justify-content-between mb-2">
                                                                            <div className="comment-owner">{user.name}</div>
                                                                        </div>
                                                                        <div className="comment-form">
                                                                            <form
                                                                                onSubmit={(event) => commentReplySubmitForm(event, comment.id)}>
                                                            <textarea name="" id="" cols="30" rows="6"
                                                                      value={commentReplyInput}
                                                                      onChange={commentReplyInputChange}/>
                                                                                <button
                                                                                    disabled={commentReplyInput ? null : 'disabled'}
                                                                                    className={"btn btn-honari comment-submit-button"}>ثبت
                                                                                </button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Collapse>


                                                    {Array.isArray(comment.get_reply) ? comment.get_reply.map((replyComment, index2) => {
                                                        const currentDate = new Date(replyComment.date * 1000);
                                                        const currentDayOfMonth = currentDate.getDate();
                                                        const currentMonth = currentDate.getMonth();
                                                        const currentYear = currentDate.getFullYear();

                                                        const jalaliDate = gregorian_to_jalali(currentYear, currentMonth + 1, currentDayOfMonth)

                                                        return (
                                                            <div key={replyComment.id}>
                                                                <div className="comment-reply">
                                                                    <div className="comment-wrapper">

                                                                        <div className={'user-avatar'}>
                                                                            <img alt={'avatar'}
                                                                                 src={replyComment.profilepic ?  constants.authURL+"/warehouse/profileimg/_250/" +replyComment.profilepic : "https://honari.com/image/profileimg/_48/sample-icon.png"}
                                                                            />
                                                                        </div>

                                                                        <div className="comment-content-wrapper">
                                                                            <div className="comment-content">


                                                                                <div className="each-comment">

                                                                                    <div className="arrow-right"/>

                                                                                    <div
                                                                                        className="d-flex justify-content-between mb-2">
                                                                                        <div
                                                                                            className="comment-owner">{replyComment.get_user ? replyComment.get_user.name : null}</div>
                                                                                        <div
                                                                                            className="comment-date dir-ltr">{jalaliDate[0] + ' / ' + (jalaliDate[1] < 10 ? '0' : '') + jalaliDate[1] + ' / ' + (jalaliDate[2] < 10 ? '0' : '') + jalaliDate[2]}</div>
                                                                                    </div>
                                                                                    <div className="comment-text">
                                                                                        <div
                                                                                            dangerouslySetInnerHTML={{__html: replyComment.comment}}/>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        )
                                                    }) : null}
                                                </div>
                                            )
                                        }


                                    })

                                }


                            </div>
                            <div className={'dir-ltr py-3 d-flex justify-content-center'}>
                                <Pagination count={pageCount} shape="rounded" onChange={getComments}/>
                            </div>
                        </React.Fragment>
                        : null
                }


            </div>
        </div>
    )
}

export default comment;