import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<signup/>}/>
    <Route path='/signin' element={<signin/>}/>
    <Route path='/dashboard' element={<dashboard/>}/>
    <Route path='/send' element={<sendMoney/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
