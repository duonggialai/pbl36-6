import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Client from "../pages/Client";
import ListProduct from "../components/ListProduct";
import Contact from "../pages/Contact";
import MainForm from "../components/MainForm";
import HotDeals from "../pages/HotDeals";
import UserProfile from "../pages/UserProfile";
import ProductDetail from '../pages/ProductDetail';
import Categories from "../pages/Categories";
import Suppliers from "../pages/Suppliers";
import Checkout from "../pages/Checkout";
import SearchResults from "../pages/SearchResults";
import SupplierProducts from "../pages/SupplierProducts";
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
                        path:"products",
                        element: <ListProduct/>
                    },
                    {
                            path:"hot",
                            element: <HotDeals/>
                    },
                    {
                        path:"contact",
                        element: <Contact/>
                    },
                    {
                        path:"product/:id",
                        element:<ProductDetail/>
                    },
                    {
                        path:"categories",
                        element: <Categories/>
                    },
                    {
                        path:"suppliers",
                        element: <Suppliers/>
                    }
                    
                ]

            },
            {
                path:"cart",
                element:<Cart/>
            },
            {
                path:"/search",
                element: <SearchResults/>
            },
            {
                path:"/supplier/:id",
                element: <SupplierProducts/>
            },
            {
                path:"checkout",
                element:<Checkout/>
            },
            {
                path:"login",
                element: <Login/>
            },
            // {
            //     path:"client",
            //     element: <Client/>
            // },
           {
                 path:"userprofile",
                element: <UserProfile/>
           }
        ]

    },
    // { path: "/cart", element: <Cart /> },
    // { path: "/client", element: <Client /> },
    // { path: "/login", element: <Login /> },
])
export default router;