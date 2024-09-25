import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, RadioGroup, FormControlLabel, Radio, Select, MenuItem, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

const PollResults = () => {
    const classes = useStyles();
    const [question, setQuestion] = useState({
        id: 1,
        text: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    });

    // const handleAddOption = () => {
    //     setOptions([...options, { text: '', correct: null }]);
    // };

    // const handleOptionChange = (index, value) => {
    //     const newOptions = [...options];
    //     newOptions[index].text = value;
    //     setOptions(newOptions);
    // };

    // const handleCorrectChange = (index, value) => {
    //     const newOptions = [...options];
    //     newOptions[index].correct = value === 'yes';
    //     setOptions(newOptions);
    // };


    const pollResults = [
        { option: 'Mars', percentage: 75 },
        { option: 'Venus', percentage: 5 },
        { option: 'Jupiter', percentage: 5 },
        { option: 'Saturn', percentage: 15 },
    ];

    return (

        <>
            <Typography variant="h5" color="text.primary">
                Question {question.id}
            </Typography>

            <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                {question.text}
            </Typography>

            {pollResults.map((result, index) => (
                <Box key={index} className={classes.resultBox}>
                    <Box className={classes.resultBar}>
                        <Typography variant="body1" color="text.primary">
                            {result.option}
                        </Typography>
                        <LinearProgress variant="determinate" value={result.percentage} />
                    </Box>
                    <Typography className={classes.resultPercentage}>{result.percentage}%</Typography>
                </Box>
            ))}

        </>
    );
};

export default PollResults;
