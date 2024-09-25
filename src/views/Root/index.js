import React, { useState } from 'react';
import { Typography, Box, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import socket from '../../utils/socket';
import { setSessionRole } from '../../utils/storage';

const Root = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const handleSelectRole = (role) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (selectedRole) {
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

    return (
        <Box sx={{
            backgroundColor: '#fff',  // White background as per desired design
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '32px',  // Adjust padding around the container
        }}>
            {/* Badge for "Intervue Poll" */}
            <Typography variant="h6" sx={{
                backgroundColor: '#6F2BDC',
                color: '#fff',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '24px',  // Adjust bottom margin for badge
            }}>
                Intervue Poll
            </Typography>

            {/* Title */}
            <Typography variant="h3" sx={{
                fontWeight: 600,
                fontSize: '28px',
                textAlign: 'center',
                marginBottom: '16px',  // Adjust bottom margin for title
            }}>
                Welcome to the <strong>Live Polling System</strong>
            </Typography>

            <Typography variant="body1" sx={{
                fontSize: '16px',
                color: '#6c757d',  // Grey color for the subtitle
                textAlign: 'center',
                marginBottom: '32px',  // Adjust bottom margin for subtitle
            }}>
                Please select the role that best describes you to begin using the live polling system
            </Typography>

            {/* Role Selection Cards */}
            <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '32px', maxWidth: '600px' }}>
                <Grid item xs={12} sm={5}>
                    <Paper
                        sx={{
                            padding: '32px 16px',  // Adjust padding for card
                            marginBottom: '16px',  // Adjust bottom margin for card
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: selectedRole === 'student' ? '2px solid #7765DA' : '1px solid #ccc',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedRole === 'student' ? '0px 4px 12px rgba(0,0,0,0.1)' : 'none',
                            '&:hover': {
                                borderColor: '#7765DA',
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                            },
                            height: '180px',  // Reduced fixed height for both cards
                        }}
                        onClick={() => handleSelectRole('student')}
                        elevation={3}
                    >
                        <Typography variant="h5" sx={{
                            fontSize: '18px',
                            fontWeight: 500,
                        }}>
                            I’m a Student
                        </Typography>
                        <Typography variant="body2" sx={{
                            fontSize: '14px',
                            color: '#6c757d',  // Grey description text
                            marginTop: '16px',  // Adjust margin top for description
                        }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Paper
                        sx={{
                            padding: '32px 16px',  // Adjust padding for card
                            marginBottom: '16px',  // Adjust bottom margin for card
                            textAlign: 'center',
                            borderRadius: '12px',
                            border: selectedRole === 'teacher' ? '2px solid #6F2BDC' : '1px solid #ccc',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedRole === 'teacher' ? '0px 4px 12px rgba(0,0,0,0.1)' : 'none',
                            '&:hover': {
                                borderColor: '#6F2BDC',
                                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                            },
                            height: '180px',  // Reduced fixed height for both cards
                        }}
                        onClick={() => handleSelectRole('teacher')}
                        elevation={3}
                    >
                        <Typography variant="h5" sx={{
                            fontSize: '18px',
                            fontWeight: 500,
                        }}>
                            I’m a Teacher
                        </Typography>
                        <Typography variant="body2" sx={{
                            fontSize: '14px',
                            color: '#6c757d',  // Grey description text
                            marginTop: '16px',  // Adjust margin top for description
                        }}>
                            Submit answers and view live poll results in real-time.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Continue Button */}
            <Button
                variant="contained"
                sx={{
                    marginTop: '32px',
                    padding: '12px 24px',  // Adjust padding for button
                    width: '180px',
                    borderRadius: '30px',
                    fontSize: '16px',
                    textTransform: 'none',  // Disable uppercase transform for button text
                    background: selectedRole
                        ? 'linear-gradient(to right, #7765DA, #5767D0)'
                        : '#ccc',
                    color: selectedRole ? '#fff' : '#aaa',
                    cursor: selectedRole ? 'pointer' : 'not-allowed',
                }}
                onClick={handleContinue}
                disabled={!selectedRole}
            >
                Continue
            </Button>
        </Box>
    );
};

export default Root;
