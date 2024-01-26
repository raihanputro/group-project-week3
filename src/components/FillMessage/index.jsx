import PropTypes from 'prop-types';
import classes from "./style.module.scss";

function FillMessage({message, children}) {
    return(
        <div className={classes.fillMessageContainer}>
            {children}
            {(message && message != "") && <p className={classes.text}>{message}</p>}
        </div>
    );
}

FillMessage.propTypes = {
    message: PropTypes.string,
    children: PropTypes.element
}

export default FillMessage;