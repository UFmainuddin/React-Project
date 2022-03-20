import React, { useContext } from 'react'
import CardComponet from '../components/CardComponent'
import BooksContext from '../context/BooksContext'

const Home = () => {
    const {books} = useContext(BooksContext)

  return (
    <div>   
         <h1 style={{margin:'18px'}}>Used Book Marketplace</h1>
      <div className='row'>
          {books.map((book, index)=>( <div className='col-3' style={{marginBottom: '20px'}} key={index}> <CardComponet book = {book}/></div>))}
      </div>

    </div>
  )
}

export default Home