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
      const roomName = this.state.value;
      this.createRoom(roomName);
    }

    render() {
      return (
        <div className="room-list">
        {
        this.state.rooms.map( (room, index) =>
          <div key={index}>
           {room.name}
          </div>)
        }
        <form onSubmit={(e) => this.handleSubmit(e)}>
           <label>
             New Room Name:
             <input type="text" name="name" value={this.state.value} onChange={(e) => this.handleChange(e)} />
           </label>
             <input type="submit" value="submit" />
        </form>
        </div>

      )
    }
}
