import React, { Component } from "react";
import AuthorDataService from "../services/author.service";

export default class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDegree = this.onChangeDegree.bind(this);
    this.onChangeAbout = this.onChangeAbout.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      name: "",
      degree: "",
      about: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDegree(e) {
    this.setState({
      degree: e.target.value
    });
  }

  onChangeAbout(e) {
    this.setState({
      about: e.target.value
    });
  }


  saveAuthor() {
    var data = {
      name: this.state.name,
      degree: this.state.degree,
      about: this.state.about
    };

    AuthorDataService.create(data)
      .then(response => {
        this.setState({
          name: response.data.name,
          degree: response.data.degree,
          about: response.data.about,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                className="form-control"
                id="degree"
                required
                value={this.state.degree}
                onChange={this.onChangeDegree}
                name="degree"
              />
            </div>

            <div className="form-group">
              <label htmlFor="about">About</label>
              <input
                  type="text"
                  className="form-control"
                  id="about"
                  required
                  value={this.state.about}
                  onChange={this.onChangeAbout}
                  name="about"
              />
            </div>

            <button onClick={this.saveAuthor} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
