import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { ping } from '@containers/App/actions';
import { selectInfoLoginUser } from '@containers/Client/selectors';

const Home = ({ login }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(ping());
  // }, [dispatch]);

  console.log(login);

  return (
    <div>
      <FormattedMessage id="app_greeting" />
    </div>
  );
};

Home.propTypes = {
  login: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectInfoLoginUser,
});

export default connect(mapStateToProps)(Home);
