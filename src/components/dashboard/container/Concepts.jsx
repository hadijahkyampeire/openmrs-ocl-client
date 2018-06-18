import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchConceptsAction from '../../../redux/actions/concepts/index';
import { clearConcepts } from '../../../redux/actions/concepts/ConceptActionCreators';
import '../styles/index.css';

import SideBar from '../components/SideNavigation';
import SearchConcept from '../components/concepts/Search';
import ConceptList from '../components/concepts/ConceptList';

export class ConceptSearch extends Component {
  static propTypes = {
    fetchConceptsAction: PropTypes.func.isRequired,
    concepts: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    isFetching: PropTypes.bool.isRequired,
    clearConcepts: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      displayName: [],
      offset: 2,
    };
    autoBind(this);
  }

  componentDidMount() {
    this.props.fetchConceptsAction();
  }

  onSearch(event) {
    const { value, name, checked } = event.target;
    const { displayName } = this.state;
    const trueValue = event.target.type === 'checkbox' ? checked : value;
    this.setState({ [name]: trueValue }, () => {
      if (this.state.searchInput === '') {
        this.props.clearConcepts();
        this.props.fetchConceptsAction(value, displayName, 25, 1);
        this.setState({ offset: 2 });
      }
    });
  }

  onSubmit(event) {
    const displayName = [];
    event.preventDefault();
    this.props.clearConcepts();
    this.setState({ displayName, offset: 2 });
    this.props.fetchConceptsAction(this.state.searchInput, displayName, 25, 1);
  }

  handleNextConcepts(
    searchInput = this.state.searchInput,
    displayName = this.state.displayName,
    offset = this.state.offset,
  ) {
    this.props.fetchConceptsAction(searchInput, displayName, 25, offset);
    this.setState(prevState => ({
      offset: prevState.offset + 1,
    }));
  }

  renderEndMessage(concepts) {
    if (!this.props.isFetching) {
      return (
        <h6 className="pt-5">
          You have seen all the {concepts.length} concept(s) your search query returned.
        </h6>
      );
    }
    return '';
  }

  render() {
    const {
      searchInput,
    } = this.state;
    const { hasMore, concepts, isFetching } = this.props;
    return (
      <div className="dashboard-wrapper">
        <SideBar />
        <SearchConcept
          onSearch={this.onSearch}
          onSubmit={this.onSubmit}
          searchValue={searchInput}
        />
        <div className="container-fluid pt-3 concept-container">
          <div className="row justify-content-center">
            <div className="col-10 offset-sm-1">
              <InfiniteScroll
                dataLength={concepts.length}
                next={this.handleNextConcepts}
                hasMore={hasMore}
                loader={<span>Loading...</span>}
                endMessage={this.renderEndMessage(concepts)}
              >
                <ConceptList concepts={concepts} fetching={isFetching} />
              </InfiniteScroll>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export const mapStateToProps = state => ({
  concepts: state.concepts.concepts,
  isFetching: state.concepts.loading,
  hasMore: state.concepts.hasMore,
});

export default connect(mapStateToProps, { fetchConceptsAction, clearConcepts })(ConceptSearch);
