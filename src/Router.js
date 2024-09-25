import { createBrowserRouter } from "react-router-dom";
import RoleBasedRoute from "./components/RoleBasedRoute";
import StudentPoll from "./views/Student/Poll";
import Root from "./views/Root/index";
import StudentRegister from "./views/Student/Register";
import TeacherCreatePoll from "./views/Teacher/CreatePoll";
import TeachePollResults from "./views/Teacher/PollResults";
import TeacherPollHistory from "./views/Teacher/PollHistory";
import StudentPollResults from "./views/Student/PollResults";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "",
                element: <Root />,
            },
            {
                path: "student",
                children: [
                    {
                        path: "poll",
                        index: true,
                        element: <RoleBasedRoute><StudentPoll /></RoleBasedRoute>
                    },
                    {
                        path: "register",
                        element: <RoleBasedRoute><StudentRegister /></RoleBasedRoute>
                    },
                    {
                        path: "poll-result",
                        element: <RoleBasedRoute><StudentPollResults /></RoleBasedRoute>
                    }
                ]
            },
            {
                path: "teacher",
                children: [
                    {
                        path: "create-poll",
                        index: true,
                        element: <RoleBasedRoute><TeacherCreatePoll /></RoleBasedRoute>
                    },
                    {
                        path: "poll-result",
                        element: <RoleBasedRoute><TeachePollResults /></RoleBasedRoute>
                    },
                    {
                        path: "poll-history",
                        element: <RoleBasedRoute><TeacherPollHistory /></RoleBasedRoute>
                    }
                ]
            },
        ]
    },
]);
export default router;