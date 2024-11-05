import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div className="fixed top-0">
        <Navbar title={'Kinect'} />
      </div>
      <Outlet />
    </>
  );
}

export default App;
