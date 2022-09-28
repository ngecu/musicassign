import * as React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import HomepageScreen  from './screens/HomepageScreen/HomepageScreen.jsx'
import SharePageScreen from './screens/ShareSampleScreen/ShareSampleScreen.jsx'
import EditScreenPage from './screens/EditScreenPage/EditScreenPage.jsx'
import CreateSamplePage from './screens/CreateSamplePage/CreateSamplePage.jsx'

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

