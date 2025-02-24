import { createBrowserRouter } from "react-router-dom";
import ForgetPassword from "../components/Forgetpassword";
import Login from "../components/Login";
import PrivateRoute from "../components/PrivateRoute";
import Register from "../components/Register";
import UpdateUserInfo from "../components/UpdateUserInfo";
import UserProfile from "../components/UserProfile";
import Dashbaord from "../Dashboard/Dashboard";
import Profile from "../Dashboard/Profile";
import MainLayout from "../MainLayout/MainLayout";
import About from "../Pages/About";
import AllScholarshipPage from "../Pages/AllScholarShipPage";
import Contact from "../Pages/Contact";
import ErrorPage from "../Pages/ErrorPage";
import Gallery from "../Pages/Gallery";
import Home from "../Pages/Home";
import ManageScholarships from "../Pages/ManageScholarships";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import AddScholarship from "./../Dashboard/AddScholarship";
import Admin from "./../Dashboard/Admin";
import AllReviews from "./../Dashboard/AllReviews";
import AppliedScholarshipManage from "./../Dashboard/AppliedScholarshipManage";
import AppliedScholarships from "./../Dashboard/AppliedScholarships";
import DashboardMain from "./../Dashboard/DashboardMain";
import ManageUsers from "./../Dashboard/ManageUsers";
import MyApplications from "./../Dashboard/MyApplications";
import MyReviews from "./../Dashboard/MyReviews";
import PaymentPage from "./../Pages/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/scholarship-details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/allscholarship",
        element: (
          <PrivateRoute>
            <AllScholarshipPage />
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-user-info",
        element: (
          <PrivateRoute>
            <UpdateUserInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      // Added new routes for About, Gallery, and Contact
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashbaord />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardMain /> },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/myapplications", element: <MyApplications /> },
      { path: "/dashboard/admin", element: <Admin /> },

      {
        path: "/dashboard/appliedscholarships",
        element: <AppliedScholarships />,
      },
      {
        path: "/dashboard/manageusers",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/myreviews",
        element: <MyReviews />,
      },
      {
        path: "/dashboard/managescholarships",
        element: <ManageScholarships />,
      },
      {
        path: "/dashboard/addscholarship",
        element: <AddScholarship />,
      },
      {
        path: "/dashboard/allscholarships",
        element: <AllScholarshipPage />,
      },
      {
        path: "/dashboard/allreviews",
        element: <AllReviews />,
      },
      {
        path: "/dashboard/allappliedscholarships",
        element: <AppliedScholarshipManage />,
      },
    ],
  },
]);

export default router;
