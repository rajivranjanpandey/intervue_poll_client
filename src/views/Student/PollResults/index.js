import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, LinearProgress, Fab, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tab, Tabs, Popover, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { makeStyles } from '@mui/styles';
import PollResults from '../../../components/PollResults';
import { fetchActivePollRequest } from '../../../reducers/pollReducer';
import socket from '../../../utils/socket';
import { fetchLivePollRequest } from '../../../reducers/livePollReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
    viewPollButton: {
        position: 'absolute',
        top: '30px',
        right: '30px',
        backgroundColor: '#6F2BDC',
        color: 'white',
    },
    pollPaper: {
        padding: theme.spacing(4),
        width: '50%',
        textAlign: 'left',
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
    askQuestionButton: {
        marginTop: theme.spacing(4),
        width: '250px',
        padding: theme.spacing(1.5),
        borderRadius: '30px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    fabChat: {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#6F2BDC',
    },
    popoverContent: {
        padding: theme.spacing(2),
    },
    tableHead: {
        backgroundColor: theme.palette.grey[100],
    },
}));

const StudentPollResults = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { data: pollData, loading } = useSelector(state => state.livePoll);

    const [tab, setTab] = useState('chat');
    const [anchorEl, setAnchorEl] = useState(null);
    const participants = [];
    useEffect(() => {
        dispatch(fetchLivePollRequest());

    }, [])
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleKickOut = (participant) => {
        console.log(`${participant} kicked out`);
    };

    const handleChatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const onViewPollHistory = () => {
        navigate('/teacher/poll-history');
    }
    const postNewQuestion = () => {
        navigate('/teacher/create-poll', { replace: true })
    }

    const isPopoverOpen = Boolean(anchorEl);
    console.log({ pollData });
    if (pollData)
        return (
            <Box className={classes.container}>
                {/* View Poll History Button */}
                <IconButton className={classes.viewPollButton} onClick={onViewPollHistory}>
                    <VisibilityIcon />
                    <Typography sx={{ ml: 1 }}>View Poll History</Typography>
                </IconButton>

                {/* Poll Results Section */}
                <Paper className={classes.pollPaper}>
                    <PollResults result={pollData} />
                </Paper>

                {/* Floating Chat Button */}
                <Fab color="primary" aria-label="chat" className={classes.fabChat} onClick={handleChatClick}>
                    <ChatBubbleOutlineIcon />
                </Fab>

                {/* Popover for Chat/Participants near Chat Icon */}
                <Popover
                    open={isPopoverOpen}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Box className={classes.popoverContent}>
                        <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
                            <Tab label="Chat" value="chat" />
                            <Tab label="Participants" value="participants" />
                        </Tabs>

                        {tab === 'participants' && (
                            <TableContainer>
                                <Table>
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {participants.map((participant, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{participant}</TableCell>
                                                <TableCell>
                                                    <Button color="error" onClick={() => handleKickOut(participant)}>
                                                        Kick out
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        {tab === 'chat' && (
                            <Box sx={{ p: 2 }}>
                                <Typography variant="body1">Chat functionality coming soon...</Typography>
                            </Box>
                        )}
                    </Box>
                </Popover>
            </Box>
        );
    else
        return null
};

export default StudentPollResults;
