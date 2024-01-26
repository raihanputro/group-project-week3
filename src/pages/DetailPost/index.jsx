import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { createStructuredSelector } from "reselect";

import { convertDate } from "@utils/allUtils";
import FillMessage from "@components/FillMessage";
import { selectLogin } from "@containers/Client/selectors";

import classes from "./style.module.scss";
import { getPostDetailData, insertComment } from "./actions";
import { selectPostComments, selectPostDetail } from "./selectors";
import PostCard from "@components/PostCard";

function DetailPost({ postDataSelect, commentsSelect, isLogined }) {
    const { postid } = useParams();
    const dispatch = useDispatch();
    const intl = useIntl();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({ content: "", fullname: "", created_date: "" });
    const [postComments, setPostComments] = useState([]);
    const [comment, setComment] = useState("");

    function sendComment() {
        const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
        const constructData = {
            post_id: postid,
            user_id: 1,
            fullname: "ini org komen",
            content: comment,
            created_date: dateNow
        }
        dispatch(insertComment(postid, constructData, (data) => {
            setPostComments(data)
            setComment("");
        }));
    }

    useEffect(() => {
        if (postid) {
            dispatch(getPostDetailData(postid, () => {
                navigate("/notfound");
            }, () => {}));
        } else {
            navigate("/");
        }
    }, [postid]);
    useEffect(() => {
        setPostData(postDataSelect);
        setPostComments(commentsSelect);

    }, [postDataSelect, commentsSelect])

    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.headerTitle}><FormattedMessage id="detail_post_title" /></h1>
            <div className={classes.headerPostContainer}>
                <h2 className={classes.name}>{postData?.fullname}</h2>
                <h3 className={classes.date}>{convertDate(postData?.created_date, intl.formatMessage({ id: "app_date_locale" }))}</h3>
            </div>
            <div className={classes.postContent} dangerouslySetInnerHTML={{ __html: postData?.content }} />
            {isLogined && <div className={classes.commnentFieldstContainer}>
                <TextField
                    id="comment-field"
                    label={intl.formatMessage({ id: "detail_post_commnet_field" })}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={classes.commentField}
                />
                <Button variant="contained" className={classes.button} onClick={sendComment}>
                    <FormattedMessage id="detail_post_comment_button" />
                </Button>
            </div>}
            <div className={classes.commentsContainer}>
                {postComments?.length > 0 ?
                    <div className={classes.commentsList}>
                        {postComments?.map((comment) => <PostCard data={comment} isShowDeleteBtn isComment onDelete={(id) => setPostComments(prevVal => prevVal.filter(v => v.id != id))} />)}
                    </div> : <FillMessage message={intl.formatMessage({ id: "detail_post_empty" })} />}
            </div>
        </div>
    )
}

DetailPost.propTypes = {
    postDataSelect: PropTypes.object,
    commentsSelect: PropTypes.array,
    isLogined: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    isLogined: selectLogin,
    postDataSelect: selectPostDetail,
    commentsSelect: selectPostComments
});

export default connect(mapStateToProps)(DetailPost);