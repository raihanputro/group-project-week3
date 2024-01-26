import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectTheme } from "@containers/App/selectors";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import { createStructuredSelector } from 'reselect';
import 'react-quill/dist/quill.snow.css';

import classes from "./style.module.scss";
import { selectUserData } from "@containers/Client/selectors";
import { showPopup } from "@containers/App/actions";
import { getUserPost, insertNewPost } from "./actions";
import Button from '@mui/material/Button'
import PostCard from "@components/PostCard";
import FillMessage from "@components/FillMessage";
import { selectMyPost } from "./selectors";

function CreatePost({ theme, userData, postData }) {
    const dispatch = useDispatch();
    const intl = useIntl();
    const navigate = useNavigate();

    const [userDataInternal, setUserDataInternal] = useState(null);
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

        const dateNow = new Date().toISOString();

        dispatch(insertNewPost({ user_id: 1, fullname: "Ini orang aja", content: content, pure_text: pureText, created_date: dateNow }, () => {
            dispatch(showPopup(intl.formatMessage({ id: "createnew_title" }), intl.formatMessage({ id: "createnew_success_posting" })));
            setContent("");
            setPureText("");
            dispatch(getUserPost(1));
        }));
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
        dispatch(getUserPost(1));
    }, []);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.input}>
                <h1 className={classes.title}><FormattedMessage id="createnew_title" /></h1>
                <ReactQuill theme="snow" value={content} onChange={quilOnChange} className={classes.inputForm} />
                {/* <p>{pureText.split("\n").map(e => (<>{e}<br></br></>))}</p> */}
                <div className={classes.buttonContainer}>
                    <Button variant="contained" onClick={sendPostToApi}>
                        <FormattedMessage id="createnew_button_send" />
                    </Button>
                </div>
            </div>
            <div className={classes.containerDataList}>
                <h1 className={classes.title}><FormattedMessage id="createnew_list_title" /></h1>
                {postDataInternal.length > 0 ? 
                    <div className={classes.listContainer}>
                        {postDataInternal.map(e => (
                            <PostCard key={e?.id} data={e} isShowDeleteBtn onDelete={postOnDelete}/>
                        ))}
                    </div>
                :
                    <FillMessage>
                        <FormattedMessage id="app_empty" />
                    </FillMessage>
                }
            </div>
        </div>
    );
}

CreatePost.propTypes = {
    theme: PropTypes.string,
    userData: PropTypes.object,
    postData: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    theme: selectTheme,
    userData: selectUserData,
    postData: selectMyPost
});

export default connect(mapStateToProps)(CreatePost);