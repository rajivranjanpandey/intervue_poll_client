import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setStudentNameSession } from '../../../utils/storage';
import socket from '../../../utils/socket';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(6),
        width: '50%',
        textAlign: 'center',
    },
    button: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        borderRadius: '30px',
    },
    badge: {
        backgroundImage: 'linear-gradient(45deg, #7765DA 30%, #5767D0 90%)',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '12px',
    },
}));

const StudentRegister = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const onNameInput = (e) => {
        const tempInput = e.target.value.trim();
        if (tempInput.length > 0)
            setName(e.target.value)
    }
    const handleContinue = () => {
        if (name) {
            setStudentNameSession(name);
            socket.emit('register', { name, role: 'student' });
            navigate('/student/poll');
        }
    };

    return (
        <Box className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h4" color="primary" gutterBottom className={classes.badge}>
                    Intervue Poll
                </Typography>

                <Typography variant="h3" color="text.primary" align="center">
                    Let’s Get Started
                </Typography>

                <Typography variant="body1" color="text.secondary" align="center">
                    If you’re a student, you’ll be able to submit your answers, participate in live polls, and see how your responses compare with your classmates.
                </Typography>

                <TextField
                    label="Enter your Name"
                    value={name}
                    onChange={onNameInput}
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 4 }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    disabled={!name}
                    className={classes.button}
                    onClick={handleContinue}
                    fullWidth
                >
                    Continue
                </Button>
            </Paper>
        </Box>
    );
};

export default StudentRegister;
