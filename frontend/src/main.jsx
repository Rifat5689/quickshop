import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import router from './app/router';
import ReactDOM from "react-dom/client";



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);

