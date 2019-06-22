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
      event.preventDefault();
      const roomName = event.target.value;
      this.createRoom(roomName);
    }

    render() {
      const rooms = this.state.rooms.map(room => {
        return (
          <p>{room}</p>
        );
      })
      console.log({rooms});
      return (
        this.state.rooms.map( (room, index) =>
          <div>
           {room.name}
          </div> ),
        <form onSubmit={(e) => this.handleSubmit(e)}>
           <label>
             New Room Name:
             <input type="text" name="name" value={this.state.value} onChange={(e) => this.handleChange(e)} />
           </label>
             <input type="submit" value="submit" />
        </form>

      )
    }
}
