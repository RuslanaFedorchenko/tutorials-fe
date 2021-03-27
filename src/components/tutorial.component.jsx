import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import DomainDataService from "../services/domain.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.onChangeDomain = this.onChangeDomain.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
        rating: 1,
        domain: {}
      },
      domains: [],
      domain: {},
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
    this.retrieveDomains();
  }

  retrieveDomains() {
    DomainDataService.getAll()
    .then(response => {
      this.setState({
        domains: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  onChangeLink(e) {
    const link = e.target.value;

    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        link: link
      }
    }));
  }

  onChangeRating(e) {
    const rating = e.target.value;

    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        rating: rating
      }
    }));
  }

  onChangeDomain(e) {
    e.preventDefault();
    var newDomain = this.state.domains.filter(dom => dom.name === e.target.value)[0];
    this.setState(function(prevState) {
      return {
        domain: newDomain,
        currentTutorial: {
          ...prevState.currentTutorial,
          domain: newDomain
        }
      };
    });
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data,
          domain: response.data.domain
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    if (!this.validateUrl(this.state.currentTutorial.link)) {
      alert("Validation for link failed, please check it!");
      return;
    }

    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  getDomainList() {
    return this.state.domains !== undefined ?
        this.state.domains.map(domain => {
          if (this.state.currentTutorial.domain) {
            var selected = this.state.currentTutorial.domain.id === domain.id;
          }
          return <option selected={selected}> {domain.name} </option>
        })
        : null;
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Link">Link</label>
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  value={currentTutorial.link}
                  onChange={this.onChangeLink}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                    type="range"
                    className="form-control"
                    id="rating"
                    required
                    min="1"
                    max="5"
                    value={this.state.currentTutorial.rating}
                    onChange={this.onChangeRating}
                    name="rating"
                    list="tickmarks"
                />

                <datalist id="tickmarks">
                  <option value="1" label="1"/>
                  <option value="2" label="2"/>
                  <option value="3" label="3"/>
                  <option value="4" label="4"/>
                  <option value="5" label="5"/>
                </datalist>
              </div>
              <div className="form-group">
                <label htmlFor="domain">Domain</label>
                <select
                    defaultValue
                    className="form-control"
                    id="domain"
                    required
                    onChange={this.onChangeDomain}
                    name="domain"
                >
                  {this.getDomainList()}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
