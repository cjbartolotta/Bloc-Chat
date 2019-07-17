import React, {Component} from 'react';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

// <script src="https://www.gstatic.com/firebasejs/6.1.1/firebase-app.js"></script>

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA9oZW7yL_BgNtkODEkOftd8SztNDm6aLw",
    authDomain: "bloc-chat-e5e85.firebaseapp.com",
    databaseURL: "https://bloc-chat-e5e85.firebaseio.com",
    projectId: "bloc-chat-e5e85",
    storageBucket: "bloc-chat-e5e85.appspot.com",
    messagingSenderId: "716557708964",
    appId: "1:716557708964:web:69e9e607313399b0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeRoom: null
      }

    render() {
      return (
        <div className="App">
         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <RoomList firebase={firebase}>
          </RoomList>
         </header>
       </div>
  );
 }
}

export default App;
