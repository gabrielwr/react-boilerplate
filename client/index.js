
//React Imports
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './store.js';
import './public/scss/index.scss' //imports scss into browser files

ReactDOM.render(
  <Provider store={ store }>
    <Router path="/" component={ Root } >
      <Router path="/calculator" component={ calculator } />
      <Router path="/about" component={ about } />
      <IndexRoute component={ Home } />
    </Router>
    <Route path='*' component={ NotFound } />
  </Provider>,
  document.getElementById('app')
);

