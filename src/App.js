import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom'
import Item from './Item/item';
import './App.css';
import SignUp from './Authentication/signup';
import Login from './Authentication/login';
// import socketIO from 'socket.io';
import socketIO from "socket.io-client";

// const socket = socketIO.connect('http://localhost:4000');


function App() {
  return (
  <Routes>
    <Route exact path="/" element={<SignUp/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route  exact path="/item" element={<Item />}  />
  </Routes>
  );
}

export default App;
