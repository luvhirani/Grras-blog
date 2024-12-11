import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import SingleBlog from '../pages/blogs/SingleBlog';
import Login from '../components/login';
import Parent from '../components/Parent';

const router = createBrowserRouter([
    {
      path: "/",
      element : <Parent />,
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

export default router