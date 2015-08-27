/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var MOCKED_MOVIES_DATA = [
  {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

// var movie = MOCKED_MOVIES_DATA[0];

var testproj = React.createClass({
  // render: function() {
  //   return (
  //     <View style={styles.container}>
  //       <Image source={{uri:movie.posters.thumbnail}}
  //         style={styles.thumbnail} />
  //       <View style={styles.rightContainer}>
  //         <Text style={styles.title}>{movie.title}</Text>
  //         <Text style={styles.year}>{movie.year}</Text>
  //       </View>
  //     </View>
  //   );
  // }
  getInitialState: function() {
    return {
      movie: null,
    }
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    var _this = this;
    // _this.setState({
    //   movies: MOCKED_MOVIES_DATA
    // });
    setTimeout(function() {
      _this.setState({
        movies: MOCKED_MOVIES_DATA
      });
    }, 2000);
  },

  render: function() {
    var movie;
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    movie = this.state.movies[0];
    return this.renderMovie(movie);
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}> 
        <Text> 
          Loading movies... 
        </Text>
      </View> 
    ); 
  },
  renderMovie: function(movie) {
    return ( 
      <View style={styles.container}> 
      <Image
        source={{uri: movie.posters.thumbnail}} 
        style={styles.thumbnail} /> 
        <View style={styles.rightContainer}> 
          <Text style={styles.title}>{movie.title}</Text> 
          <Text style={styles.year}>{movie.year}</Text> 
        </View>     
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    // flex: 1,
    backgroundColor: "#f7f7f7"
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 83,
    backgroundColor: '#fff'
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});

AppRegistry.registerComponent('testproj', () => testproj);
