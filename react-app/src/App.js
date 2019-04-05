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

  getActions = e => {
    const id = Number(e.target.id);
    axios.get(`http://localhost:3313/api/projects/${id}/actions`)
      .then(res => {
        let updateIndex = this.state.projects.findIndex(el => el.id  === id);
        let updateProject = this.state.projects[updateIndex];
        updateProject = {
          ...updateProject,
          actions: res.data
        };
        // console.log(updateProject);
        // console.log(this.state.projects[updateIndex]);
        let newList = this.state.projects.slice(updateIndex+1);
        // console.log(newList);
        this.setState({
          projects: [...newList, updateProject],
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
        return (
          <div key={project.id} className="project">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.completed ? (
            <p>COMPLETE</p>
          ) : (
            <p>IN PROGRESS</p>
          )}
          <button id={project.id} onClick={this.getActions}>SHOW ACTIONS</button>

          {project.actions && 
            project.actions.map(action => {
              return (
                <div className="project-action">
                <p>Description: {action.description}</p>
                <p>Notes: {action.notes}</p>
                </div>
              )
            })
          }

          </div>
        )
      })}
      </div>

      </div>
    );
  }
}

export default App;
