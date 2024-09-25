import React from 'react';
import { Typography, Box, Fab, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    logoText: {
        backgroundColor: '#6F2BDC',
        padding: theme.spacing(0.5, 2),
        borderRadius: '20px',
        color: '#fff',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
    loader: {
        color: '#6F2BDC',
        marginBottom: theme.spacing(2),
    },
    message: {
        fontSize: '1.2rem',
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
        marginBottom: theme.spacing(6),
    },
    fabChat: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundImage: 'linear-gradient(45deg, #7765DA 30%, #5767D0 90%)',
    },
}));

const QuestionLoader = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            {/* Intervue Poll Logo */}
            <Box className={classes.logoContainer}>
                <Typography className={classes.logoText}>Intervue Poll</Typography>
            </Box>

            {/* Loader */}
            <CircularProgress size={50} thickness={5} className={classes.loader} />

            {/* Message */}
            <Typography className={classes.message}>
                Wait for the teacher to ask questions..
            </Typography>
        </Box>
    );
};

export default QuestionLoader;
