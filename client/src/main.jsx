
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import SingleBlog from './pages/blogs/SingleBlog.jsx';
import Login from './components/login.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
