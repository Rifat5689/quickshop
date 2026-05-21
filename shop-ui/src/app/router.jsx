import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../landingPage/page/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/:slug",
    element: <LandingPage />,
  },
]);

export default router ;


