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
import UpdateFood from "./components/UpdateFood/UpdateFood.jsx";
import SingleFood from "./components/SingleFood/SingleFood.jsx";
import FoodPurchase from "./components/FoodPurchase/FoodPurchase.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider.jsx";

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
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MyFoods></MyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: <SingleFood></SingleFood>,
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase></FoodPurchase>
          </PrivateRoute>
        ),
      },
      {
        path: "/myOrders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: <UpdateFood></UpdateFood>,
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
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
