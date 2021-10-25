import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import Transaction from './Component/Transaction';
import Vender from './Component/Vender';
import Home from './Home';
import TransactionList from './Component/TransactionList';
import Print_Bill from './Component/Print_Bill';
import Nav_bar from './Component/Navbar';

function App() {
  return (
    <Router>
    <ToastContainer/>
    <Nav_bar/>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/Home" component={Home}/>
      <Route path="/tran" component={Transaction}/>
      <Route path="/vender" component={Vender}/>
      <Route path="/list" component={TransactionList}/>
      <Route path="/print" component={Print_Bill}/>

    </Switch>
  </Router>
  );
}

export default App;
