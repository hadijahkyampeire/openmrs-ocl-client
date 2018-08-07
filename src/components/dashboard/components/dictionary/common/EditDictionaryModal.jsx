import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import language from './Languages';
import { editDictionaryOrg } from '../../../../../redux/actions/dictionaries/dictionaryActionCreators';
import editDictionaryUser from '../../../../../redux/actions/dictionaries/EditDictionaryActions';

export class EditDictionary extends Component {
  static propTypes = {
    editDictionaryUser: propTypes.func.isRequired,
    editDictionaryOrg: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
  };
  state = {
    visibility: '',
    name: '',
    description: '',
  };
  componentDidMount() {
    this.setState({
      visibility: this.props.visibility,
      name: this.props.name,
      description: this.props.description,
    });
  }
  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleEditDictionary = (event) => {
    event.preventDefault();
    const { visibility, name, description } = this.state;
    this.props.editDictionaryUser({
      visibility,
      name,
      description,
    });
  //   this.props.owner === 'Individual'
  //     ? this.props.editDictionaryUser({
  //       visibility,
  //       name,
  //       description,
  //     })
  //     : this.props.editDictionaryOrg({
  //       visibility,
  //       name,
  //       description,
  //     });
  };
  render() {
    const { visibility, name, description } = this.state;
    localStorage.setItem('short_code', this.props.short_code);
    return (
      <div>
        <div
          className="container modal fade"
          id="editDictionaryModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="container modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit {this.props.name} Dictionary
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="editForm" onSubmit={this.handleEditDictionary}>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Preferred Language
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="language"
                    >
                      <option value="" />
                      {language &&
                        language.map(languages => (
                          <option value={languages.value} key={languages.value}>
                            {languages.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Visibility</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name={visibility}
                      onChange={this.handleInput}
                    >
                      <option value="1" />
                      <option value="View">Private </option>
                      <option value="Edit"> Public </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Dictionary Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="name"
                      value={name}
                      onChange={this.handleInput}
                      placeholder="e.g Community Health Dictionary"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="description"
                      onChange={this.handleInput}
                      value={description}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="hidden"
                      id="repository_type"
                      name="repository_type"
                      value="OpenMRSDictionary"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                  Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                  Save changes
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { editDictionaryUser, editDictionaryOrg },
)(EditDictionary);
