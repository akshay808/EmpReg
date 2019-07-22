import React from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './EmpLogin.css';

class Allocateproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeename: '',
      projecttname: '',
      projectlead: '',
      projectmanager: ''
    };
  }

  changeEmployeeName(event) {
    this.setState({ employeename: event.target.value });
  }

  changeProjectName(event) {
    this.setState({ projecttname: event.target.value });
  }

  changeProjectLead(event) {
    this.setState({ projectlead: event.target.value });
  }

  changeProjecManager(event) {
    this.setState({ projectmanager: event.target.value });
  }

  render() {
    return (
      <div>
        <Form className="container" align="center">
          <FormGroup row>
            <Label className="registerlabel" htmlFor="employeename" sm={2}>
              Employee Name
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="firstName"
                onChange={this.changeEmployeeName.bind(this)}
                noValidate
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="projecttname" sm={2}>
              Project Name
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="projecttname"
                onChange={this.changeProjectName.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="projectlead" sm={2}>
              Project Lead
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="projectlead"
                onChange={this.changeProjectLead.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="projectmanager" sm={2}>
              Project Manager
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="projectmanager"
                onChange={this.changeProjecManager.bind(this)}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Allocateproject;
