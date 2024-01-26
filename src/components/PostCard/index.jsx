import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { convertDate } from "@utils/allUtils";
import { useDispatch } from "react-redux";
import { deletePost } from "@containers/App/actions";

import classes from "./style.module.scss";

function PostCard({ data, isShowDeleteBtn = false, onDelete }) {

    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function deletePostBtn() {
        dispatch(deletePost(data?.id, () => {
            if(typeof onDelete === "function") {
                onDelete(data?.id);
            }
        }))
    }

    // function

    return (
        <Card className={classes.cardContainer}>
            <CardContent>
                <div className={classes.cardHeader}>
                    <Typography variant="h3" className={classes.userfullname}>{data?.fullname}</Typography>
                    {isShowDeleteBtn && <IconButton aria-label="favorite" onClick={deletePostBtn} className={classes.deleteBtn}>
                        <DeleteIcon />
                    </IconButton>}
                </div>
                <Typography variant="body1" className={classes.content}>{data?.pure_text}</Typography>
                <Typography variant="body2" className={classes.date}>{convertDate(data?.created_date, intl.formatMessage({id: "app_date_locale"}))}</Typography>
            </CardContent>
        </Card>
    );
}

export default PostCard;