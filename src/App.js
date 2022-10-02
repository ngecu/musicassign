import * as React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header.js'
import HomepageScreen  from './pages/HomepageScreen.js'
import SharePageScreen from './pages/ShareSampleScreen.js'
import EditScreenPage from './pages/EditScreenPage.js'
import CreateSamplePage from './pages/CreateSamplePage.js'
import Sequencer from "./components/Seq";

import './App.css'
export default function App() {
  return (
    <Router>

<Header/>
    <div className="body-content">


    <Route path="/create" component={CreateSamplePage} />
      <Route path="/share/:id" component={SharePageScreen} />
      <Route path='/edit/:id' component={EditScreenPage} />
        
      <Route path="/"  component={HomepageScreen} exact />

</div>
     
</Router>
  );
}

