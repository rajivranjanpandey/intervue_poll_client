import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_API_CONN_URI);
export default socket;