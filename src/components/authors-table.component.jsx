import React, { Component } from "react";
import AuthorsDataService from "../services/author.service";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default class AuthorsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: []
    };
  }

  componentDidMount() {
    this.retrieveAuthors();
  }

  retrieveAuthors() {
    AuthorsDataService.getAll()
    .then(response => {
      this.setState({
        authors: response.data,
        author: response.data[0]
      });
    })
    .catch(e => {
      console.log(e);
    });
  }


  updateAuthor(author) {
    AuthorsDataService.update(
        author.id,
        author
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

  buildColumns() {
    return [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'degree',
      text: 'Degree'
    }, {
      dataField: 'about',
      text: 'About'
    }];
  }

  render() {
    var {authors} = this.state;
    console.log(authors)
    return <div>
      {authors.length > 0 &&
      <BootstrapTable
          keyField="id"
          data={this.state.authors}
          columns={this.buildColumns()}
          bordered={true}
          cellEdit={ cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => { this.updateAuthor(row); }
          }) }
      />}
    </div>;
  }
}
