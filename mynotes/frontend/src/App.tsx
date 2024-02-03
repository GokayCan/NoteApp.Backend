import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import { Suspense, lazy } from "react";
import routes from "./routes/routes";

function App() {
  return (
    <Suspense fallback={<h1>...</h1>}>
      <RouterProvider router={routes}></RouterProvider>
    </Suspense>
  );
}

export default App;
