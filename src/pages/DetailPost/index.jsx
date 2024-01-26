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

function DetailPost({ data, isLogined }) {
    const { postid } = useParams();
    const dispatch = useDispatch();
    const intl = useIntl();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({ content: "", fullname: "", date: "" });
    const [postComments, setPostComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (postid) {

        } else {
            navigate("/");
        }
    }, [postid]);
    useEffect(() => {

    }, [data])

    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.headerTitle}><FormattedMessage id="detail_post_title" /></h1>
            <div className={classes.headerPostContainer}>
                <h2 className={classes.name}>{postData?.fullname}</h2>
                <h3 className={classes.date}>{convertDate(postData?.date, intl.formatMessage({ id: "app_date_locale" }))}</h3>
            </div>
            <div className={classes.postContent} />
            {isLogined && <div className={classes.commnentContainer}>
                <div className={classes.commentField}>
                    <TextField
                        id="comment-field"
                        label={intl.formatMessage({ id: "detail_post_commnet_field" })}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className={classes.commentField}
                    />
                    <Button variant="contained" className={classes.button}>
                        <FormattedMessage id="detail_post_comment_button" />
                    </Button>
                </div>
            </div>}
            <div className={classes.commentsContainer}>
                {postComments.length > 0 ?
                    <div className={classes.commentsList}>
                        {postComments.map((comment) => <div className={classes.comment}>
                            <h2 className={classes.fullname}>{comment.fullname}</h2>
                            <p className={content}>{comment.content}</p>
                        </div>)}
                    </div> : <FillMessage message={intl.formatMessage({ id: "detail_post_empty" })} />}
            </div>
        </div>
    )
}

DetailPost.propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    isLogined: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    isLogined: selectLogin,

});

export default connect(mapStateToProps)(DetailPost);