import './App.css'
import { Routes, Route } from 'react-router-dom' 
import Home from './pages/Home'
import Channel from './pages/Channel'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/channel/:name' element={<Channel />} />
      </Routes>
    </>
  );
}

export default App;
