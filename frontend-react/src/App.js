import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./layouts/Navigation";
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import { Container } from "react-bootstrap";
import SignIn from "./pages/SignIn";
import Posts from "./pages/Posts.jsx";
import store from "./store";
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store} >
    <Router>
      <Navigation></Navigation>
      <Container>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Container>
    </Router>
    </Provider>
  );
}

export default App;
