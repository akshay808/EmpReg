import React from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import './EmpLogin.css';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

class EmployeeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  changeName(event) {
    this.setState({ username: event.target.value });
  }

  changePass(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="bcontainer">
        <Form className="form">
          <div className="content">
            <FormGroup>
              <Label className="label" for="eml" sm={2}>
                Email
              </Label>
              <Col sm={20}>
                <Input
                  className="txt"
                  type="email"
                  name="email"
                  id="eml"
                  placeholder="Enter your email"
                  value={this.state.username}
                  onChange={this.changeName.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Label className="label" for="pwd" sm={2}>
                Password
              </Label>
              <Col sm={20}>
                <Input
                  className="txt"
                  type="password"
                  name="pwd"
                  id="pwd"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.changePass.bind(this)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col>
                <button
                  className="btn"
                  onClick={() => {
                    browserHistory.push({
                      pathname: './Adminaccess'
                    });
                  }}
                >
                  Login
                </button>
              </Col>
            </FormGroup>

            <FormGroup>
              <Link to="/RegistrationForm" className="link">
                <u> New User? Register here</u>
              </Link>
            </FormGroup>
          </div>
        </Form>
      </div>
    );
  }
}

export default EmployeeLogin;
