import { Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./components/login";
import router from "./router/Router";

function App() {
  return (
    <Provider store={store}>
   <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
