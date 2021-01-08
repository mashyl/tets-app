import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Users from './components/Users/Users';
import Spinner from 'react-bootstrap/Spinner';
import classes from './App.css'

const PostsList = React.lazy(() => {
  return import('./components/Posts/PostsList/PostsList')
})

const FullPost = React.lazy(() => {
  return import('./components/Posts/FullPost/FullPost')
})

function App() {
  return (
    <div className="App">
      <Switch>
        <Suspense fallback={<Spinner 
                        animation="grow" 
                        variant="primary"
                        className={classes.Status} />}>
        <Route path='/users' component={Users} />
        <Route path='/posts' render={props => <PostsList {...props} />} />
        <Route path='/comments' render={props => <FullPost {...props} />} />
        <Redirect exact from='/' to='/users' />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;