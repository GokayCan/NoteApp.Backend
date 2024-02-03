import React from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";

// const NotesListPage = React.lazy(() => {
//   return new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
//   import("../pages/NotesListPage"));
// });
const NotesListPage = React.lazy(() => import("../pages/NotesListPage"));
const NotePage = React.lazy(() => import("../pages/NotePage"));
const Login = React.lazy(() => import("../pages/Login"));
const Layout = React.lazy(() => import("../components/Layout"));

const routes = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <NotesListPage /> },
      { path: "/note/:noteId", element: <NotePage /> },
    ],
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export default routes;
