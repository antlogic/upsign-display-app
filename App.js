import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from "./store/reducer";
import thunk from 'redux-thunk';
import Manager from "./Components/Manager/Manager";
import { watchAuth } from './store/saga'

export default function App() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, composeEnhancers(
      applyMiddleware(thunk, sagaMiddleware)
  ));
  sagaMiddleware.run(watchAuth);

  return (
    <Provider store={store} >
      <View style={styles.container}>
        <Manager />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

