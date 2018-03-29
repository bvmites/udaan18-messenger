import React, {Component} from 'react';
import {connect} from 'react-redux';

import Search from 'grommet/components/Search';

class SearchBar extends Component {
  render() {
    return (
      <Search inline={true} size='small'
              value={this.props.searchText}
              onDOMChange={(e) => this.props.onChange(e)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  searchText: state.participants.searchText
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => dispatch(searchChanged({
    text: e.target.value
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
