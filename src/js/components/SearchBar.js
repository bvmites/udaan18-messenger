import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Search from 'grommet/components/Search';

import { changeSearchText } from '../actions/participants';

class SearchBar extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    const text = e.target.value;
    const { dispatch } = this.props;
    dispatch(changeSearchText(text));
  }

  render() {
    return (
      <Search inline={true}
        size='small'
        value={this.props.searchText}
        onDOMChange={this._onChange}
      />
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  searchText: ''
};

const mapStateToProps = state => ({
  searchText: state.participants.searchText
});

export default connect(mapStateToProps)(SearchBar);
