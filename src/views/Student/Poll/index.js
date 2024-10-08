import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, RadioGroup, FormControlLabel, Radio, Button, Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TimerIcon from '@mui/icons-material/Timer';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import apiService from '../../../utils/apiService';
import { fetchActivePollRequest, fetchActivePollSuccess } from '../../../reducers/pollReducer';
import { useDispatch, useSelector } from 'react-redux';
import QuestionLoader from '../../../components/QuestionLoader';
import { submitPollAnswer, submitPollAnswerApi } from '../../../api/poll.api';
import { useNavigate } from 'react-router-dom';
import socket from '../../../utils/socket';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    paper: {
        padding: theme.spacing(4),
        width: '600px',
        borderRadius: '12px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E5E5',
    },
    questionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    questionText: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    timer: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    timerIcon: {
        color: '#FF4136',
        marginRight: theme.spacing(1),
    },
    questionBox: {
        backgroundColor: '#444444',  // Darker background color for the question
        borderRadius: '8px',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        color: '#fff',
    },
    options: {
        marginTop: theme.spacing(2),
        '& .MuiFormControlLabel-root': {
            marginBottom: theme.spacing(1.5),
        },
    },
    selectedOption: {
        background: 'linear-gradient(45deg, #7765DA 30%, #5767D0 90%)',
        color: 'white',
        borderRadius: '12px',
        border: '2px solid #7765DA',
        '& .MuiTypography-root': {
            color: 'white',
        },
    },
    normalOption: {
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        border: '1px solid #E5E5E5',
    },
    numberCircle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: '1px solid #7765DA',
        textAlign: 'center',
        lineHeight: '24px',
        marginRight: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(4),
        width: '150px',
        padding: theme.spacing(1.5),
        borderRadius: '30px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: 'linear-gradient(45deg, #7765DA 30%, #5767D0 90%)',
        color: 'white',
        '&:hover': {
            backgroundImage: 'linear-gradient(45deg, #4F0DCE 30%, #5767D0 90%)',
        },
    },
    fabChat: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',  // Proper bottom-right positioning for the chat icon
        backgroundImage: 'linear-gradient(45deg, #7765DA 30%, #5767D0 90%)',
    },
}));

const StudentPoll = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: pollData, loading } = useSelector(state => state.poll);

    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        dispatch(fetchActivePollRequest());
        socket.on('newPoll', (dt) => dispatch(fetchActivePollSuccess(dt)));
    }, [])

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async () => {
        if (selectedOption) {
            const payload = {
                question_id: pollData.id,
                selected_option: selectedOption
            }
            // const response = await submitPollAnswerApi(payload);
            socket.emit('submitAnswer', payload);
            // if (response) {
            navigate('/student/poll-result', { replace: true });
            // }
            // Handle submission logic here
        }
    };
    if (loading) {
        return (<QuestionLoader />)
    } else if (pollData) {
        return (
            <Box className={classes.container}>
                <Paper className={classes.paper}>
                    {/* Question Section */}
                    <Box className={classes.questionHeader}>
                        <Typography variant="h5" className={classes.questionText}>
                            Question {pollData.id}
                        </Typography>
                        <Box className={classes.timer}>
                            <TimerIcon className={classes.timerIcon} />
                            <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                00:15
                            </Typography>
                        </Box>
                    </Box>

                    <Box className={classes.questionBox}>
                        <Typography variant="body1">
                            {pollData.question}
                        </Typography>
                    </Box>

                    {/* Options */}
                    <RadioGroup value={selectedOption} onChange={handleOptionChange} className={classes.options}>
                        {pollData.options.map((option, index) => (
                            <Box
                                key={index}
                                className={selectedOption === option ? classes.selectedOption : classes.normalOption}
                                display="flex"
                                alignItems="center"
                                padding={2}
                            >
                                <Box className={classes.numberCircle}>{index + 1}</Box>
                                <FormControlLabel
                                    value={option.text}
                                    control={<Radio color="primary" />}
                                    label={option.text}
                                />
                            </Box>
                        ))}
                    </RadioGroup>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        className={classes.submitButton}
                        onClick={handleSubmit}
                        disabled={!selectedOption}
                    >
                        Submit
                    </Button>
                </Paper>

                {/* Floating Chat Button */}
                <Fab color="primary" aria-label="chat" className={classes.fabChat}>
                    <ChatBubbleOutlineIcon />
                </Fab>
            </Box>
        );
    } else {
        <span>No Questions Available</span>
    }
};

export default StudentPoll;
