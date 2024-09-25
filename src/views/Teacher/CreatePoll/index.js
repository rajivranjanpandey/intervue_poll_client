import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(5),
        width: '80%',
        margin: '0 auto',
    },
    badge: {
        backgroundColor: '#6F2BDC',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '12px',
    },
    button: {
        width: '200px',
        borderRadius: '30px',
        padding: theme.spacing(1.5),
        marginTop: theme.spacing(6),
    },
}));

const TeacherCreatePoll = () => {
    const classes = useStyles();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', correct: null }]);
    const [pollDuration, setPollDuration] = useState(60);

    const handleAddOption = () => {
        setOptions([...options, { text: '', correct: null }]);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const handleCorrectChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].correct = value === 'yes';
        setOptions(newOptions);
    };

    const handleCreatePoll = () => {
        console.log('Poll Created', { question, options, pollDuration });
    };

    return (
        <Box className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h4" color="primary" align="left" gutterBottom className={classes.badge}>
                    Intervue Poll
                </Typography>
                <Typography variant="h3" color="text.primary" align="left" gutterBottom>
                    Let’s Get Started
                </Typography>
                <Typography variant="body1" color="text.secondary" align="left" gutterBottom>
                    You’ll have the ability to create and manage polls, ask questions, and monitor your students’ responses in real-time.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={9}>
                        <TextField
                            label="Enter your question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            value={pollDuration}
                            onChange={(e) => setPollDuration(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value={60}>60 seconds</MenuItem>
                            <MenuItem value={30}>30 seconds</MenuItem>
                            <MenuItem value={90}>90 seconds</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                {options.map((option, index) => (
                    <Grid container spacing={2} sx={{ mt: 2 }} key={index}>
                        <Grid item xs={1}>
                            <Typography>{index + 1}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                placeholder="Enter option"
                                value={option.text}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <RadioGroup row value={option.correct ? 'yes' : 'no'} onChange={(e) => handleCorrectChange(index, e.target.value)}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                ))}

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleCreatePoll}
                >
                    Ask Question
                </Button>
            </Paper>
        </Box>
    );
};

export default TeacherCreatePoll;
