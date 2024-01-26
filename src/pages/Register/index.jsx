import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Card, CardContent, Typography, TextField, FormControl, FormLabel, Button } from '@mui/material';

import { setRegisterUser } from './actions';
import { showPopup } from '@containers/App/actions';

import classes from './style.module.scss';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const intl = useIntl();

    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(fullname === "" && email === "" && password === "") {
            dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_requied'})));
        } else if (fullname === "") {
            dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_fullname_required'})));
        } else if (email === "") {
            dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_email_required'})));
        } else if(!isValidEmail(email)) {
            dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_email_pattern'})));
        }  else if (password === "") {
            dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_password_required'})));
        } else if(password.length < 6) {
            dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_password_min'})));
        } else {
            dispatch(setRegisterUser({ fullname: fullname, email: email, password: password }));
            navigate('/login');
        }
    }

  return (
    <Box className={classes.container}>
            <Card component={Box} className={classes.cardContainer}>
                <CardContent>
                    <Typography variant="h1" component="div" className={classes.pageTitle} >
                        <FormattedMessage id="app_register_title" />
                    </Typography>
                    <FormControl className={classes.formContainer}>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                                <FormattedMessage id="app_register_label_fullname" />
                            </FormLabel>
                            <TextField className={classes.input} variant="outlined" type='text' value={fullname} onChange={(e) => setFullName(e.target.value)} required={true}/>
                        </Box>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                                <FormattedMessage id="app_register_label_email" />
                            </FormLabel>
                            <TextField className={classes.input} variant="outlined" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                        </Box>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                                <FormattedMessage id="app_register_label_password" />
                            </FormLabel>
                            <TextField className={classes.input} variant="outlined" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                        </Box>
                    </FormControl>
                    <Button className={classes.registerButton} onClick={onSubmit}><FormattedMessage id="app_register_title" /></Button>
                </CardContent>  
            </Card>
        </Box>
  )
}

export default Register