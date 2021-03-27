import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import DomainDataService from "../services/domain.service";
import AuthorsDataService from "../services/author.service";


export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this.onChangeDomain = this.onChangeDomain.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      link: "",
      rating: 1,
      published: false,
      domain: {},
      domains: [],
      author: {},
      authors: [],
      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveDomains();
    this.retrieveAuthors();
  }

  retrieveDomains() {
    DomainDataService.getAll()
    .then(response => {
      this.setState({
        domains: response.data,
        domain: response.data[0]
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  retrieveAuthors() {
    AuthorsDataService.getAll()
    .then(response => {
      this.setState({
        authors: response.data,
        author: response.data[0]
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeLink(e) {
    var newLink = e.target.value;
    this.setState({
      link: newLink
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDomain(e) {
    e.preventDefault();
    var newDomain = this.state.domains.filter(dom => dom.name === e.target.value)[0];
    this.setState({domain: newDomain});
  }

  onChangeAuthor(e) {
    e.preventDefault();
    var newAuthor = this.state.authors.filter(auth => auth.name === e.target.value)[0];
    this.setState({author: newAuthor});
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value
    });
  }

  saveTutorial() {
    if (!this.validateUrl(this.state.link)) {
      alert("Validation for link failed, please check it!");
      return;
    }

    var data = {
      title: this.state.title,
      description: this.state.description,
      link: this.state.link,
      domain: this.state.domain,
      author: this.state.author,
      rating: this.state.rating
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

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

  validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

  getDomainList() {
    return this.state.domains.map(domain => {
      return <option>{domain.name}</option>
    });
  }

  getAuthorsList() {
    return this.state.authors.map(author => {
      return <option>{author.name}</option>
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
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Link">Link</label>
              <input
                  type="text"
                  className="form-control"
                  id="link"
                  required
                  value={this.state.link}
                  onChange={this.onChangeLink}
                  name="link"
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
                  value={this.state.rating}
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
              <label htmlFor="author">Author</label>
              <select
                className="form-control"
                id="author"
                required
                onChange={this.onChangeAuthor}
                name="author"
              >
                {this.getAuthorsList()}
              </select>
            </div>


            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
