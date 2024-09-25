import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Fab, LinearProgress } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { makeStyles } from '@mui/styles';
import TimerIcon from '@mui/icons-material/Timer';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(4),
        width: '50%',
        textAlign: 'left',
    },
    questionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    resultBox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    resultBar: {
        flexGrow: 1,
        height: 10,
        borderRadius: '5px',
        backgroundColor: '#E0E0E0',
        '& .MuiLinearProgress-bar': { backgroundColor: '#6F2BDC' },
    },
    resultPercentage: {
        marginLeft: theme.spacing(2),
        width: '50px',
        textAlign: 'right',
    },
    fabChat: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#6F2BDC',
    },
    timer: {
        display: 'flex',
        alignItems: 'center',
    },
    timerIcon: {
        color: '#FF4136',
        marginRight: theme.spacing(1),
    },
    submitButton: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(1.5),
        borderRadius: '30px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

const Student = () => {
    const classes = useStyles();
    const [question, setQuestion] = useState({
        id: 1,
        text: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    });

    const pollResults = [
        { option: 'Mars', percentage: 75 },
        { option: 'Venus', percentage: 5 },
        { option: 'Jupiter', percentage: 5 },
        { option: 'Saturn', percentage: 15 },
    ];

    return (
        <Box className={classes.container}>
            {/* Question Section */}
            <Paper className={classes.paper}>
                <Box className={classes.questionHeader}>
                    <Typography variant="h5">Question 1</Typography>
                    <Box className={classes.timer}>
                        <TimerIcon className={classes.timerIcon} />
                        <Typography variant="body1">00:15</Typography>
                    </Box>
                </Box>

                <Typography variant="body1" color="text.primary">
                    {question.text}
                </Typography>

                {/* Poll Results */}
                {pollResults.map((result, index) => (
                    <Box key={index} className={classes.resultBox}>
                        <Box className={classes.resultBar}>
                            <Typography variant="body1" color="text.primary">
                                {result.option}
                            </Typography>
                            <LinearProgress variant="determinate" value={result.percentage} />
                        </Box>
                        <Typography className={classes.resultPercentage}>
                            {result.percentage}%
                        </Typography>
                    </Box>
                ))}

                {/* Submit Button */}
                <Fab variant="extended" color="primary" className={classes.submitButton}>
                    Submit
                </Fab>
            </Paper>

            {/* Floating Chat Button */}
            <Fab color="primary" aria-label="chat" className={classes.fabChat}>
                <ChatBubbleOutlineIcon />
            </Fab>
        </Box>
    );
};

export default Student;
