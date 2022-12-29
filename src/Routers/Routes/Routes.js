import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import Login from "../../Pages/AuthenticationPages/LoginPage/Login";
import Register from "../../Pages/AuthenticationPages/RegisterPage/Register";
import CompletedTask from "../../Pages/CompletedTask/CompletedTask";
import Home from "../../Pages/HomePage/Home";
import MyTask from "../../Pages/MyTask/MyTask";
import ErrorPage from "../../Pages/shared/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-task',
                element: <AddTask></AddTask>
            },
            {
                path: '/my-task',
                element: <MyTask></MyTask>
            },
            {
                path: '/completed-task',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/sign-in',
                element: <Login></Login>
            },
            {
                path: '/sign-up',
                element: <Register></Register>
            }
        ]
    }
])