import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import PostCard from '@components/PostCard';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import classes from './style.module.scss';
import { getHomePost } from './actions';
import { selectPost } from './selectors';

const Home = ({ login, posts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHomePost());
  }, [dispatch]);

  return (
    <Box className={classes.container} padding={{ xs: '10px 15vw', sm: '10px 20vw', md: '10px 25vw' }}>
      <p className={classes.title}>
        <FormattedMessage id="app_home" />
      </p>
      {login && (
        <Box className={classes.createSection}>
          <div>
            <p className={classes.intro}>
              <FormattedMessage id="home_what_happen" />
            </p>
            <button
              type="button"
              className={classes.button}
              onClick={() => {
                navigate('/createnew');
              }}
            >
              <FormattedMessage id="home_share_button" />
            </button>
          </div>
        </Box>
      )}

      {posts.map((post, index) => (
        <Box paddingBottom={2} key={index}>
          <PostCard data={post} />
        </Box>
      ))}
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
