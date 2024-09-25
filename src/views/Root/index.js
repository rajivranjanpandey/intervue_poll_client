import React, { useState } from 'react';
import { Typography, Box, Paper, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import socket from '../../utils/socket';
import { setSessionRole } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    badge: {
        backgroundColor: '#6F2BDC',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '12px',
        marginBottom: theme.spacing(3),
    },
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(2),
    },
    roleCard: {
        padding: theme.spacing(4),
        textAlign: 'center',
        borderRadius: '12px',
        border: '2px solid transparent',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#6F2BDC',
        },
    },
    selectedCard: {
        borderColor: '#6F2BDC',
    },
    button: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(1.5),
        width: '200px',
        borderRadius: '30px',
    },
}));

const Root = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const handleSelectRole = (role) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (selectedRole) {
            console.log(`Role selected: ${selectedRole}`);
            setSessionRole(selectedRole);
            if (selectedRole === 'teacher') {
                socket.emit('register', { role: selectedRole, name: 'Teacher' });

                navigate('/teacher/create-poll');
            } else {
                navigate('/student/register');
            }
            // Navigate to the appropriate screen based on role selection
        }
    };
    console.log('root_page');
    return (
        <Box className={classes.container}>
            {/* Badge for "Intervue Poll" */}
            <Typography variant="h4" className={classes.badge}>
                Intervue Poll
            </Typography>

            {/* Title */}
            <Typography variant="h3" className={classes.title}>
                Welcome to the <strong>Live Polling System</strong>
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 4 }}>
                Please select the role that best describes you to begin using the live polling system
            </Typography>

            {/* Role Selection Cards */}
            <Grid container spacing={4} sx={{ marginBottom: 4 }}>
                <Grid item xs={6}>
                    <Paper
                        className={`${classes.roleCard} ${selectedRole === 'student' ? classes.selectedCard : ''}`}
                        onClick={() => handleSelectRole('student')}
                        elevation={3}
                    >
                        <Typography variant="h5">
                            I’m a Student
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper
                        className={`${classes.roleCard} ${selectedRole === 'teacher' ? classes.selectedCard : ''}`}
                        onClick={() => handleSelectRole('teacher')}
                        elevation={3}
                    >
                        <Typography variant="h5">
                            I’m a Teacher
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                            Submit answers and view live poll results in real-time.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Continue Button */}
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleContinue}
                disabled={!selectedRole}  // Disable button if no role is selected
            >
                Continue
            </Button>
        </Box>
    );
};

export default Root;
