import { Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Hero from "./components/Home/Hero"


function App() {
  

  return (

   <div className="min-h-screen flex flex-col">
    
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
         
        </Routes>


      </main>
      
    </div>
  )
}

export default App
