import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Box, Card, CardContent, Typography, TextField, FormControl, FormLabel } from '@mui/material';

import { selectUserLogin } from './selectors';
import { getUserDataLogin } from './actions';
import { doLogin, showPopup } from '@containers/App/actions';

import classes from './style.module.scss';

const Login = ({ dataUser }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const intl = useIntl();

    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      dispatch(getUserDataLogin());
    }, [dispatch])

    useEffect(() => {
      setUser(dataUser);
    }, [dataUser]);

    const onSubmit = (e) => {
        e.preventDefault();

        if(email === "" && password === "") {
          dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_requied'})));
        } else if(email === "") {
          dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_email_required'})));
        } else if(password === "") {
          dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_password_required'})));
        }

        const matchingAccount = user.filter(item => item.email === email);
        console.log(matchingAccount[0], 'matching account');

        if(matchingAccount.length === 0) {
          dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_account_no_account'})));
        } else if (matchingAccount[0].password !== password) {
          dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_password_not_match'})));
        } else if (matchingAccount[0].email === email && matchingAccount[0].password === password) {
          dispatch(doLogin({ id: matchingAccount[0].id, fullname: matchingAccount[0].fullname, email: matchingAccount[0].email}));
          navigate('/');
        }
     };

  return (
    <>
        <Box className={classes.container}>
            <Card component={Box} className={classes.cardContainer}>
                <CardContent>
                    <Typography variant='h1' component='div' className={classes.pageTitle} >
                      <FormattedMessage id="app_login_title" />
                    </Typography>
                    <FormControl className={classes.formContainer}>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                              <FormattedMessage id="app_login_label_email" />
                            </FormLabel>
                            <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='text' value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                        </Box>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                              <FormattedMessage id="app_login_label_password" />
                            </FormLabel>
                            <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='text' value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                        </Box>
                    </FormControl>
                    <Button className={classes.loginButton} onClick={onSubmit}><FormattedMessage id="app_login_title" /></Button>
                    <Typography variant='h1' component='div' className={classes.linkRegister} >
                      <FormattedMessage id="app_login_register_link" />
                      <b className={classes.here} onClick={() => navigate('/register')}><FormattedMessage id="app_login_register_here" /></b>
                    </Typography>
                </CardContent>  
            </Card>
        </Box>
    </>
  )
};

Login.propTypes = {
  dataUser: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  dataUser: selectUserLogin,
})

export default connect(mapStateToProps)(Login);