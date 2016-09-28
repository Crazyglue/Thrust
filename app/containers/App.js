/*jshint esversion: 6 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Root from './Root';
import * as LoginActions from '../actions/login';

function mapStateToProps(state) {
  return {
    username: state.username,
    password: state.password,
    offlineUsernameLoaded: state.offlineUsernameLoaded,
    offlinePasswordLoaded: state.offlinePasswordLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, LoginActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
