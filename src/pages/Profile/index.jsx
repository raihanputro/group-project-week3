import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Avatar, Box } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { selectInfoLoginUser } from '@containers/Client/selectors';
import { selectMyPost } from '@pages/CreatePost/selectors';
import { getUserPost } from '@pages/CreatePost/actions';
import PostCard from '@components/PostCard';
import { createStructuredSelector } from 'reselect';
import classes from './style.module.scss';

const Profile = ({ loginUser, posts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPost(loginUser?.id));
  }, [dispatch]);

  return (
    <Box className={classes.container} padding={{ xs: '10px 15vw', sm: '10px 20vw', md: '10px 25vw' }}>
      <div className={classes.userInfo}>
        <Avatar alt={loginUser?.fullname} src="/static/images/avatar/1.jpg" sx={{ width: 64, height: 64 }} />
        <p className={classes.name}>{loginUser?.fullname}</p>
        <p className={classes.email}>{loginUser?.email}</p>
      </div>

      <Box>
        <p className={classes.title}>My Moments</p>
        {posts?.map((post, index) => (
          <Box paddingBottom={2} key={index}>
            <PostCard data={post} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

Profile.propTypes = {
  loginUser: PropTypes.any,
  posts: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loginUser: selectInfoLoginUser,
  posts: selectMyPost,
});

export default connect(mapStateToProps)(Profile);
