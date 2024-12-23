import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Errorpage from "./components/Errorpage/Errorpage.jsx";
import Root from "./components/Root/Root.jsx";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Home from "./components/Home/Home.jsx";
import AddFood from "./components/AddFood/AddFood.jsx";
import AllFoods from "./components/AllFoods/AllFoods.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import MyFoods from "./components/MyFoods/MyFoods.jsx";
import MyOrders from "./components/MyOrders/MyOrders.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/AddFood",
        element: <AddFood></AddFood>,
      },
      {
        path: "/AllFoods",
        element: <AllFoods></AllFoods>,
      },
      {
        path: "/Gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/myFoods",
        element: <MyFoods></MyFoods>,
      },
      {
        path: "/myOrders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
