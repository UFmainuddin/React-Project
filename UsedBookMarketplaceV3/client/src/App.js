import './assets/workshop-styles.css';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error'; 
import AuthContext from './context/AuthContext';
import BooksContext from './context/BooksContext';
import Home from './pages/Home';
import RecentlySold from './pages/RecentlySold';
import SellBooks from './pages/SellBooks';
import MyCart from './pages/MyCart';
import My_books from './pages/My_books';
import { getBooks, getCart} from './services';
import Edit from './pages/Edit';


function App() {
  const [books, setBooks] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [isAuth, setIsAuth] = useState(localStorage.getItem('userData'));

	
  useEffect(() => { 
	getBooks(setBooks)
   }, [])

  useEffect(() => { 
	{isAuth&& getCart(setCartItems)}
   }, [])
  
	const updateBooks = () => { 
	getBooks(setBooks)
   }
	const updatedCart = () => { 
		getCart(setCartItems)
   }



  return (
	<AuthContext.Provider value={{ isAuth: isAuth, setIsAuth }}>
        <BooksContext.Provider value={{books, updateBooks, cartItems, setCartItems, updatedCart}}>
				<Navigation />
	<div className='container' style={{marginTop: '50px'}}>

	  <Routes>
		  
			{!isAuth ? (	<>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/" element={<Home />} />
							<Route path="/sold" element={<RecentlySold />} />
							</>
						) : (
							<>
							<Route path="/cart" element={<MyCart />} />
							<Route path="/sold" element={<RecentlySold />} />
							<Route path="/myStuff" element={<My_books />} />
							<Route path="/sellbooks" element={<SellBooks updateBooks={updateBooks}/>} />
							<Route path="/" element={<Home />} />
							<Route path="/book/:id" element={<Edit />} />

							</>
								)}

			<Route path="*" element={!isAuth ? <Login /> : <Error />} />
	 </Routes>

    </div>

    <Footer/>
    	</BooksContext.Provider>
	</AuthContext.Provider>

	);
}

export default App;
