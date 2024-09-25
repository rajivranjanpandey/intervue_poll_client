import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { createPollApi } from '../../../api/poll.api';

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
        borderRadius: '16px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    },
    badge: {
        backgroundColor: '#6F2BDC',
        color: '#fff',
        padding: '5px 15px',
        borderRadius: '20px',
        display: 'inline-block',
        marginBottom: theme.spacing(2),
    },
    button: {
        width: '200px',
        borderRadius: '30px',
        padding: theme.spacing(1.5),
        marginTop: theme.spacing(2),
        backgroundColor: '#6F2BDC',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#5A23AB',
        },
    },
    addButton: {
        backgroundColor: '#fff',  // Set background color to white
        color: '#6F2BDC',  // Purple text
        textTransform: 'none',
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: '12px',
        marginBottom: theme.spacing(3),
        border: '1px solid #6F2BDC',  // Optional border to give a defined look
        '&:hover': {
            backgroundColor: '#f0f0f0', // Slightly darker on hover
        },
    },
    buttonContainer: {
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'flex-end',
    },
    characterCount: {
        textAlign: 'right',
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary,
    }
}));

const TeacherCreatePoll = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', correct: false }]);
    const [pollDuration, setPollDuration] = useState(60);

    const handleAddOption = () => {
        setOptions([...options, { text: '', correct: false }]);
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


    const handleCreatePoll = async () => {
        console.log('Poll Created', { question, options, pollDuration });
        const response = await createPollApi({
            question,
            options
        });
        if (response) {
            navigate('/teacher/poll-result');
        }
    };

    return (
        <Box className={classes.container}>
            <Paper className={classes.paper}>
                <Typography className={classes.badge}>
                    Intervue Poll
                </Typography>
                <Typography variant="h4" color="textPrimary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Let’s Get Started
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    You’ll have the ability to create and manage polls, ask questions, and monitor your students’ responses in real-time.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Enter your question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                            sx={{ backgroundColor: '#f7f7f7' }}
                            inputProps={{ maxLength: 100 }}
                        />
                        <Typography variant="body2" className={classes.characterCount}>
                            {question.length}/100
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                    <Grid container spacing={2} sx={{ mt: 2 }} key={index} alignItems="center">
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

                {/* Add More Option Button */}
                <Grid container className={classes.buttonContainer}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            className={classes.addButton}
                            onClick={handleAddOption}
                        >
                            + Add More option
                        </Button>
                    </Grid>
                </Grid>

                {/* Ask Question Button aligned to the right of the screen */}
                <Box className={classes.buttonContainer} sx={{ width: '100%' }}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleCreatePoll}
                    >
                        Ask Question
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default TeacherCreatePoll;