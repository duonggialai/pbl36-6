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
import Register from "../pages/Register";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageUser from "../pages/admin/ManageUser";
import ManageOrders from "../pages/admin/ManageOrders";
import AdminProfile from "../pages/admin/AdminProfile";
import ManageShipping from "../pages/admin/ManageShipping";
import ManageSupplier from "../pages/admin/ManageSupplier";
import AboutUs from "../pages/AboutUs";
import ManageReview from "../pages/admin/ManageReview";
import PaymentOnline from "../components/PaymentOnline";

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
                        path:"about",
                        element: <AboutUs/>
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
            path: "payment/:orderId",
            element: <PaymentOnline />
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
            {
                path:"register",
                element: <Register/>
            },
            // {
            //     path:"news",
            //     element: <PaymentOnline/>
            // },
           {
                 path:"userprofile",
                element: <UserProfile/>
           }
        ]

    },
    {
        path: "/admin",
        element: <AdminLayout />,   
        children: [
        {
        path: "dashboard",         
        element: <Dashboard />
        },
          {
        path: "profile", 
        element: <AdminProfile/>
        },
        {
        path: "products", 
        element: <ManageProducts />
        },
        {
        path: "users",   
        element: <ManageUser />    
        },
        {
        path: "reviews",   
        element: <ManageReview/>   
        },
        {
        path: "orders",  
        element: <ManageOrders />   
        },
        {
         path: "shipping",  
        element: <ManageShipping /> 
        },
        {
         path: "supplier",  
        element: <ManageSupplier />
        },

    ]
    }

    // { path: "/cart", element: <Cart /> },
    // { path: "/client", element: <Client /> },
    // { path: "/login", element: <Login /> },
])
export default router;