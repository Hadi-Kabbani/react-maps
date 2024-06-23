import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFound from './Pages/NotFound';
import SingleBook from './Pages/SingleBook';
import Books from './Pages/Books';
import WishList from './Pages/WishList';
import Cart from './Pages/Cart';
import CheckOut from './Pages/checkout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewReleased from './Pages/newreleased';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
  ,
  {
    path: "/books",
    element: <Books />
  }
  ,
  {
    path: "/books/:id",
    element: <SingleBook />
  }
  ,
  {
    path: "/about",
    element: <About />
  }
  ,
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/wishlist",
    element: <WishList />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/checkout",
    element: <CheckOut />
  },
  {
    path: "/newreleased",
    element: <NewReleased />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;


