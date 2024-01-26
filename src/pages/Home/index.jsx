import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Avatar, Box, Grid } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';
import { getPost } from './actions';
import { selectPost } from './selectors';

const Home = ({ login, posts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <Box className={classes.container} padding={{ xs: '10px 15vw', sm: '10px 20vw', md: '10px 25vw' }}>
      <FormattedMessage id="app_home" />
      <Box className={classes.createSection}>
        <div>
          <p className={classes.intro}>Whats Happening?</p>
          <button type="button" className={classes.button}>
            Share Moment
          </button>
        </div>
      </Box>
      <div className={classes.postSection}>
        <div className={classes.infoSection}>
          <Grid container spacing={3}>
            <Grid item xs="auto">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={9}>
              <div className={classes.infoPost}>
                <Box className={classes.name}>
                  Farras Arkan <span> • 1 Januari 2023</span>
                </Box>
                <div className={classes.contentSection}>
                  <p>ini content 1</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
};

Home.propTypes = {
  login: PropTypes.bool,
  posts: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  posts: selectPost,
});

export default connect(mapStateToProps)(Home);
