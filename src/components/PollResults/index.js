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

const PollResults = ({ result }) => {
    const classes = useStyles();
    const { question, answers } = result;

    return (

        <>
            <Typography variant="h5" color="text.primary">
                Question {question.id}
            </Typography>

            <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                {question.question}
            </Typography>

            {question.options.map((option, index) => {
                const selectionPercent = answers[option.text].selection_percent;
                return (
                    <Box key={index} className={classes.resultBox}>
                        <Box className={classes.resultBar}>
                            <Typography variant="body1" color="text.primary">
                                {option.text}
                            </Typography>
                            <LinearProgress variant="determinate" value={selectionPercent} />
                        </Box>
                        <Typography className={classes.selectionPercent}>{selectionPercent}%</Typography>
                    </Box>
                )
            }
            )}

        </>
    );
};

export default PollResults;
