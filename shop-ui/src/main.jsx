import { RouterProvider } from "react-router-dom";
import router from './app/router';
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";

import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

