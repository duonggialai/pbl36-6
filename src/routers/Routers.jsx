import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Client from "../pages/Client";
import ListProduct from "../components/ListProduct";
import Contact from "../pages/Contact";
import MainForm from "../components/MainForm";
const router = createBrowserRouter([

    { 
        path: "/", 
        element: <Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
                children:[
                    {
                        path:"",
                        element: <MainForm/>
                    },
                    {
                        path:"contact",
                        element: <Contact/>
                    }
                ]

            },
            {
                path:"cart",
                element:<Cart/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"client",
                element: <Client/>
            },
           
        ]

    },
    // { path: "/cart", element: <Cart /> },
    // { path: "/client", element: <Client /> },
    // { path: "/login", element: <Login /> },
])
export default router;