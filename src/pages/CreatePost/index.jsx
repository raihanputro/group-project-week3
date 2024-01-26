import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useDispatch, connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { selectTheme } from "@containers/App/selectors";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import { createStructuredSelector } from 'reselect';
import 'react-quill/dist/quill.snow.css';

import { selectInfoLoginUser, selectUserData } from "@containers/Client/selectors";
import { showPopup } from "@containers/App/actions";
import { editPostData, getUserPost, insertNewPost } from "./actions";
import Button from '@mui/material/Button'
import PostCard from "@components/PostCard";
import FillMessage from "@components/FillMessage";
import { selectMyPost } from "./selectors";

import classes from "./style.module.scss";
import { getPostDetailData } from "@pages/DetailPost/actions";

function CreatePost({ userData, postData }) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const { postid } = useParams();
    const navigate = useNavigate();

    const [postDataInternal, setPostDataInternal] = useState([]);
    const [content, setContent] = useState("");
    const [pureText, setPureText] = useState("");

    function quilOnChange(value, delta) {
        setContent(value);
        if (delta?.ops[0]?.insert || delta?.ops[1]?.insert) {
            const insert = delta?.ops[0]?.insert || delta?.ops[1]?.insert;
            setPureText(prevVal => prevVal + "" + insert)
        } else if (delta?.ops[0]?.delete || delta?.ops[1]?.delete) {
            setPureText(prevVal => {
                const sliced = prevVal.slice(0, prevVal.length - 1);
                return sliced;
            });
        }
    }

    function sendPostToApi() {
        if (pureText.length < 10) {
            dispatch(showPopup(intl.formatMessage({ id: "createnew_title" }), intl.formatMessage({ id: "createnew_error_posting" })));
            return;
        }

        const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");

        if(postid) {
            dispatch(editPostData(postid, { user_id: userData?.id, fullname: userData?.fullname, content: content, pure_text: pureText, created_date: dateNow }, () => {
                navigate(`/${postid}`);
            }))
        } else {
            dispatch(insertNewPost({ user_id: userData?.id, fullname: userData?.fullname, content: content, pure_text: pureText, created_date: dateNow }, () => {
                dispatch(showPopup(intl.formatMessage({ id: "createnew_title" }), intl.formatMessage({ id: "createnew_success_posting" })));
                setContent("");
                setPureText("");
                dispatch(getUserPost(userData?.id));
            }));
        }

    }

    function postOnDelete(id) {
        setPostDataInternal(prevVal => prevVal.filter(v => v.id != id));
    }

    useEffect(() => {
        if (postData) {
            setPostDataInternal(postData);
        }
    }, [postData]);
    useEffect(() => {
        dispatch(getUserPost(userData?.id));
    }, []);
    useEffect(() => {
        setContent("");
        setPureText("");
        
        if (postid) {
            dispatch(getPostDetailData(postid, () => {
                navigate("/notfound");
            }, (data) => {
                if (data?.user_id != userData.id) {
                    navigate("/");
                    return;
                }

                setContent(data?.content);
                setPureText(data?.pure_text);
            }));
        }
    }, [postid]);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.input}>
                <h1 className={classes.title}><FormattedMessage id={postid ? "createnew_title_edit" : "createnew_title"} /></h1>
                <ReactQuill theme="snow" value={content} onChange={quilOnChange} className={classes.inputForm} />
                {/* <p>{pureText.split("\n").map(e => (<>{e}<br></br></>))}</p> */}
                <div className={classes.buttonContainer}>
                    <Button variant="contained" onClick={sendPostToApi}>
                        <FormattedMessage id="createnew_button_send" />
                    </Button>
                </div>
            </div>
            {!postid && <div className={classes.containerDataList}>
                <h1 className={classes.title}><FormattedMessage id="createnew_list_title" /></h1>
                {postDataInternal.length > 0 ?
                    <div className={classes.listContainer}>
                        {postDataInternal.map(e => (
                            <PostCard key={e?.id} data={e} isShowDeleteBtn onDelete={postOnDelete} />
                        ))}
                    </div>
                    :
                    <FillMessage>
                        <FormattedMessage id="app_empty" />
                    </FillMessage>
                }
            </div>}
        </div>
    );
}

CreatePost.propTypes = {
    userData: PropTypes.object,
    postData: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    userData: selectInfoLoginUser,
    postData: selectMyPost
});

export default connect(mapStateToProps)(CreatePost);