import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

class App extends Component {
  state = {
    actions:[],
    error:'',
    projects:[],
  };
  componentDidMount() {
    axios.get("http://localhost:3313/api/projects/")
      .then(res => {
        console.log(res);
        this.setState({
          projects: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err,
        });
      });
  }

  render() {
    return (
      <div className="App">
      <h1>Sprint Challenge Node Express</h1>

      <div className="project-list">
      {this.state.projects.map(project => {
        console.log(project);
        return (
          <div key={project.id} className="project">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.completed ? (
            <p>COMPLETE</p>
          ) : (
            <p>IN PROGRESS</p>
          )}
          <p></p>
          </div>
        )
      })}
      </div>

      </div>
    );
  }
}

export default App;
