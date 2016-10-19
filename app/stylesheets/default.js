

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listView: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBox: {
    height: 40,
    width: 300,
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