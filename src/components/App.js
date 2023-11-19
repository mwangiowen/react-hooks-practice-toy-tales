// App.js

import React, { Component } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toys: [],
    };
  }

  componentDidMount() {
    this.fetchToys();
  }

  fetchToys() {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ toys: data });
      })
      .catch((error) => console.error("Error fetching toys:", error));
  }

  handleToyFormSubmit = (newToyData) => {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyData),
    })
      .then((response) => response.json())
      .then((newToy) => {
        this.setState((prevState) => ({
          toys: [...prevState.toys, newToy],
        }));
      })
      .catch((error) => console.error("Error adding new toy:", error));
  };

  handleDonateClick = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState((prevState) => ({
          toys: prevState.toys.filter((toy) => toy.id !== id),
        }));
      })
      .catch((error) => console.error("Error deleting toy:", error));
  };

  handleLikeClick = (id, newLikes) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then(() => {
        this.setState((prevState) => ({
          toys: prevState.toys.map((toy) =>
            toy.id === id ? { ...toy, likes: newLikes } : toy
          ),
        }));
      })
      .catch((error) => console.error("Error updating likes:", error));
  };

  render() {
    return (
      <>
        <Header />
        <ToyForm onToyFormSubmit={this.handleToyFormSubmit} />
        <ToyContainer
          toys={this.state.toys}
          onDonateClick={this.handleDonateClick}
          onLikeClick={this.handleLikeClick}
        />
      </>
    );
  }
}

export default App;
