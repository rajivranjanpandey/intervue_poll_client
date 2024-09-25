import React from 'react';
import { Typography, Box, Paper, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    pollPaper: {
        padding: theme.spacing(4),
        width: '60%',
        textAlign: 'left',
        marginBottom: theme.spacing(4),
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
}));

const pollHistoryData = [
    {
        question: 'Which planet is known as the Red Planet?',
        results: [
            { option: 'Mars', percentage: 75 },
            { option: 'Venus', percentage: 5 },
            { option: 'Jupiter', percentage: 5 },
            { option: 'Saturn', percentage: 15 },
        ],
    },
    {
        question: 'Which planet is closest to the sun?',
        results: [
            { option: 'Mercury', percentage: 80 },
            { option: 'Venus', percentage: 10 },
            { option: 'Earth', percentage: 5 },
            { option: 'Mars', percentage: 5 },
        ],
    },
];

const TeacherPollHistory = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography variant="h4" color="text.primary" sx={{ mb: 4 }}>
                View <strong>Poll History</strong>
            </Typography>

            {pollHistoryData.map((poll, index) => (
                <Paper key={index} className={classes.pollPaper}>
                    <Typography variant="h5" color="text.primary">
                        Question {index + 1}
                    </Typography>

                    <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                        {poll.question}
                    </Typography>

                    {poll.results.map((result, resultIndex) => (
                        <Box key={resultIndex} className={classes.resultBox}>
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
                </Paper>
            ))}
        </Box>
    );
};

export default TeacherPollHistory;
