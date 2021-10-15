import Navigation from './layouts/Navigation'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Posts from './pages/Posts.jsx'
import store from './store'
import { Provider } from 'react-redux'
import checkForToken from './helpers/checkForToken'
import PrivateRoute from './utils/PrivateRoute'
import UserPosts from './pages/UserPosts'
import PostDetails from './pages/PostDetails'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
//moment config
import moment from 'moment'
import 'moment/locale/es'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
moment.locale('es')

checkForToken()

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation></Navigation>
        <Container>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/post/:id" component={PostDetails} />
            <PrivateRoute
              exact
              path="/posts"
              component={UserPosts}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/new/post"
              component={NewPost}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/edit/post/:id"
              component={EditPost}
            ></PrivateRoute>
          </Switch>
        </Container>
      </Router>
    </Provider>
  )
}

export default App
