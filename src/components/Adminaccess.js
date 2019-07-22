import React from 'react';
//import { Route, BrowserRouter as Router ,Link} from 'react-router-dom';
import Allocateproject from './Allocateproject';
import RegistrationForm from './RegistrationForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class Adminaccess extends React.Component {
  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Employee Details</Tab>
            <Tab>Allocate Project</Tab>
            <button
              className="btn"
              onClick={() => {
                this.props.history.push({
                  pathname: '/'
                });
              }}
            >
              Logout
            </button>
          </TabList>

          <TabPanel>
            <RegistrationForm />
          </TabPanel>
          <TabPanel>
            <Allocateproject />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
