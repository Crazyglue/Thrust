/*jshint esversion: 6 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBox: {
    height: 40,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 4
  },
  inlineSearch: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#584FAE",
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 9,
    marginBottom: 9,
    fontSize: 22,
    color: "#FBF2DC"
  },
  labelText: {
    fontSize: 12
  }
});

export default styles;