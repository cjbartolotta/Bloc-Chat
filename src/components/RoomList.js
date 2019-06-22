import React, { Component } from 'react';


export default class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.createRoom = this.createRoom.bind(this);

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

    componentDidMount() {
      console.log('Hello World')
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) });
      })
    }

    createRoom(name) {
      this.roomsRef.push({
        name:name
      });
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      this.createRoom();
      event.preventDefault();
    }

    render() {
      return (
        this.state.rooms.map( (room, index) =>
          <div>
           {room.name}
          </div> ),
        <form onSubmit={this.handleSubmit}>
           <label>
             New Room Name:
             <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
           </label>
             <input type="submit" value="submit" />

        </form>
      )
    }
}
