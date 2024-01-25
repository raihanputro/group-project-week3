import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Box, Card, CardContent, Typography, TextField, FormControl, FormLabel, Button } from '@mui/material';

import { setRegisterUser } from './actions';

import classes from './style.module.scss';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        dispatch(setRegisterUser({ fullname: fullname, email: email, password: password }));
        navigate('/login')
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
                            <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='text' value={fullname} onChange={(e) => setFullName(e.target.value)} required={true}/>
                        </Box>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                                <FormattedMessage id="app_register_label_email" />
                            </FormLabel>
                            <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='text' value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                        </Box>
                        <Box className={classes.inputLabelContainer}>
                            <FormLabel className={classes.label}>
                                <FormattedMessage id="app_register_label_password" />
                            </FormLabel>
                            <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='text' value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                        </Box>
                    </FormControl>
                    <Button className={classes.registerButton} onClick={onSubmit}><FormattedMessage id="app_register_title" /></Button>
                </CardContent>  
            </Card>
        </Box>
  )
}

export default Register