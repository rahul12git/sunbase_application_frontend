
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import AuthLogin from './pages/AuthLogin';
import AddCustomer from './customers/AddCustomer';
import EditCustomer from './customers/EditCustomer';


function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
          <Route exact path='/' element={<AuthLogin/>}></Route>
          <Route exact path="/home" element={<Home/>} />
          <Route exact path = "/addCustomer" element={<AddCustomer />}/>
          <Route exact path = "/editCustomer/:custId" element={<EditCustomer/>}/> 
        </Routes>
    </Router>
    </div>
  );
}

export default App;