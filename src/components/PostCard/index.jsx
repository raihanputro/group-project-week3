import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { convertDate } from "@utils/allUtils";
import { useDispatch, connect } from "react-redux";
import { deletePost } from "@containers/App/actions";

import classes from "./style.module.scss";
import { createStructuredSelector } from "reselect";
import { selectUserData } from "@containers/Client/selectors";
import { useEffect, useState } from "react";
import { deleteComment } from "@pages/DetailPost/actions";

function PostCard({ data, isShowDeleteBtn = false, onDelete, isComment = false, userData }) {

    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isUserLogined, setIsUserLogined] = useState(false);
    const [isMyData, setIsMyData] = useState(false);

    function deletePostBtn() {
        if(isComment) {
            dispatch(deleteComment(data?.id, () => {
                if (typeof onDelete === "function") {
                    onDelete(data?.id);
                }
            }));
        } else {
            dispatch(deletePost(data?.id, () => {
                if (typeof onDelete === "function") {
                    onDelete(data?.id);
                }
            }));
        }
    }

    function goToPostDetail() {
        navigate(`/${data?.id}`);
    }

    useEffect(() => {
        if(userData) {
            setIsUserLogined(true);
            setIsMyData(data?.user_id === userData?.id);
        }
    }, [userData]);

    return (
        <Card className={classes.cardContainer} key={data?.id}>
            <CardContent>
                <div className={classes.cardHeader}>
                    <Typography variant="h3" className={classes.userfullname}>{data?.fullname}</Typography>
                    {(isShowDeleteBtn && isUserLogined && isMyData) && <IconButton aria-label="favorite" onClick={deletePostBtn} className={classes.deleteBtn}>
                        <DeleteIcon />
                    </IconButton>}
                </div>
                <div className={classes.cardBody} onClick={goToPostDetail}>
                    <Typography variant="body1" className={classes.content}>{isComment ? data?.content : data?.pure_text}</Typography>
                    <Typography variant="body2" className={classes.date}>{convertDate(data?.created_date, intl.formatMessage({ id: "app_date_locale" }))}</Typography>
                </div>
            </CardContent>
        </Card>
    );
}

PostCard.propTypes = {
    data: PropTypes.object.isRequired,
    isShowDeleteBtn: PropTypes.bool,
    onDelete: PropTypes.func,
    isComment: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    userData: selectUserData,
});

export default connect(mapStateToProps)(PostCard);