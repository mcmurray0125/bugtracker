import { createBrowserRouter } from "react-router-dom";

import Index from "./views/Index";
import Register from "./views/Register";
import Login from "./views/Login";
import Administration from "./views/Administration";
import Tickets from "./views/Tickets";
import Project from "./views/Project";

import Auth from "./layouts/Auth";
import Admin from "./layouts/Admin";
import General from "./layouts/General";

const routes = [
  {
    path: "/",
    routeName: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        element: <Login />,
      },
    ],
  },
  {
    path: "/auth/*",
    routeName: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        element: <Login />,
      },
      {
        path: "register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        element: <Register />,
      },
    ],
  },
  {
    path: "/general/*",
    routeName: "general",
    element: <General />,
    children: [
      {
        path: "index",
        icon: "fa-solid fa-display",
        element: <Index />,
        layout: "general",
        name: "Dashboard",
        display: true,
      },
      {
        path: "tickets",
        icon: "fa-solid fa-book",
        element: <Tickets />,
        name: "Tickets",
        layout: "general",
        display: true,
      },
      {
        path: "project/:id",
        name: "Project",
        layout: "general",
        element: <Project />,
      },
    ],
  },
  {
    path: "/admin/*",
    routeName: "admin",
    element: <Admin />,
    children: [
      {
        path: "index",
        icon: "fa-solid fa-display",
        element: <Index />,
        layout: "admin",
        name: "Dashboard",
        display: true,
      },
      {
        path: "tickets",
        icon: "fa-solid fa-book",
        element: <Tickets />,
        name: "Tickets",
        layout: "admin",
        display: true,
      },
      {
        path: "project/:id",
        name: "Project",
        layout: "admin",
        element: <Project />,
      },
      {
        path: "administration",
        name: "Admin",
        icon: "fa-solid fa-toolbox",
        layout: "admin",
        element: <Administration />,
        display: true
      },
    ],
  }
]

const router = createBrowserRouter(routes);

export { routes, router };
