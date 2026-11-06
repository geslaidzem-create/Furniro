import { useState } from 'react'
import Header from "./layout components/Header"
import './App.css'
import Footer from "./layout components/Footer"
import './layout components/Footer.scss'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header />
     <Footer/>
    </>
  )
}

export default App
