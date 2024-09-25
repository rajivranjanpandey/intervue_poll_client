import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket";
import { fetchStudentSuccess } from "../../reducers/studentReducer";
import { deleteSessionRole, deleteStudentNameSession } from "../../utils/storage";
import { removeStudentApi } from "../../api/student.api";

export function ChatBubble() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: students, loading } = useSelector((state) => state.students);
    const [tab, setTab] = useState('chat');
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        socket.on('connectedStudents', (data) => dispatch(fetchStudentSuccess(data)));
        socket.on('kickout', () => {
            deleteSessionRole();
            deleteStudentNameSession();
            navigate('/', { replace: true });
        })
    }, [])
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleKickOut = async (participant) => {
        const reponse = await removeStudentApi({ studentId: participant });
        console.log(`${participant} kicked out`);
    };

    const handleChatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
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
                                    {students.map((student, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>
                                                <Button color="error" onClick={() => handleKickOut(student.id)}>
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
        </>
    )
}