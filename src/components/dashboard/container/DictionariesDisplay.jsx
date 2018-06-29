import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../styles/index.css';
import { fetchDictionaries } from '../../../redux/actions/dictionaries/dictionaryActionCreators';
import SideBar from '../components/SideNavigation';
import ListDictionaries from '../components/dictionary/ListDictionaries';

export class DictionaryDisplay extends Component {
  static propTypes = {
    fetchDictionaries: propTypes.func.isRequired,
    dictionaries: propTypes.arrayOf(propTypes.shape({
      dictionaryName: propTypes.string,
    })).isRequired,
    isFetching: propTypes.bool.isRequired,
    hasMore: propTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      offset: 1,
    };
    autoBind(this);
  }

  componentDidMount() {
    this.props.fetchDictionaries();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dictionaries.length === 0) {
      this.handleDictionaries();
    }
  }

  handleDictionaries(offset = this.state.offset) {
    this.props.fetchDictionaries('', 25, offset);
    this.setState(prevState => ({
      offset: prevState.offset + 3,
    }));
  }

  renderEndMessage(dictionaries) {
    if (!this.props.isFetching) {
      return (
        <h6 className="pt-5">
          You have seen all the {dictionaries.length} dictionary(ies) your
          search query returned.
        </h6>
      );
    }
    return '';
  }

  render() {
    const { hasMore, dictionaries } = this.props;
    // const allDictionaries = this.props.dictionaries;
    // console.log(allDictionaries);
    // const view = allDictionaries.slice(0, 24);
    // console.log(view, "****************")
    return (
      <div className="dashboard-wrapper">
        <SideBar />
        <div className="row justify-content-center">
          <div className="offset-sm-1 col-10">
            <InfiniteScroll
              dataLength={dictionaries.length}
              next={this.handleDictionaries}
              hasMore={hasMore}
              loader={<h6>Loading more dictionaries...</h6>}
              endMessage={this.renderEndMessage(dictionaries)}
            >
              <ListDictionaries
                dictionaries={this.props.dictionaries}
                fetching={this.props.isFetching}
              />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  dictionaries: state.dictionaries.dictionaries,
  isFetching: state.dictionaries.loading,
  hasMore: state.dictionaries.hasMore,
});
export default connect(
  mapStateToProps,
  { fetchDictionaries },
)(DictionaryDisplay);
