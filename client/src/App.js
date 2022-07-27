import './App.css'
import { Routes, Route } from 'react-router-dom' 
import Home from './pages/Home'
import Channel from './pages/Channel'
import Navbar from './components/Navbar'

// import LoginForm from './components/Login'


function App() {
  // const [isShowLogin, setIsShowLogin] = useState(false)
  // const handleLoginClick = () => {
  //   setIsShowLogin((isShowLogin) => !isShowLogin)
  // }
  return (
    <>
      <Navbar />
      {/* <LoginForm isShowLogin={isShowLogin} /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/channel/:name' element={<Channel />} />
        
      </Routes>
    </>
    
  );
}

export default App;
