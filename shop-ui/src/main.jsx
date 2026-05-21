import { RouterProvider } from "react-router-dom";
import router from './app/router';
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ShopSettingsProvider } from "./context/ShopSettingsContext";

const queryClient = new QueryClient()

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <ShopSettingsProvider>
      <RouterProvider router={router} />
    </ShopSettingsProvider>
  </QueryClientProvider>
);
