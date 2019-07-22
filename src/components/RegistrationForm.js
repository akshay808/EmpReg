import React from 'react';
import { Form, FormGroup, Input, Label, Col } from 'reactstrap';
import './EmpLogin.css';
import axios from 'axios';
// import { browserHistory } from 'react-router';

const emlRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const mnoRegx = RegExp(/^[0-9]/);

const adharRegx = RegExp(/^\d{4}\-\d{4}\-\d{4}$/);

const panRegx = RegExp(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      nationality: '',
      mobile_no: null,
      email: null,
      adhar_no: '',
      pan_no: null,
      pwd: null,
      cpwd: null,
      address: null,
      empid: null,

      formErrors: {
        firstName: '',
        lastName: '',
        mobile_no: '',
        email: '',
        adhar_no: '',
        pan_no: '',
        pwd: '',
        cpwd: '',
        address: '',
        empid: ''
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    if (this.state.pwd !== this.state.cpwd) alert("Passwords doesn't match!!");

    const reqdata = {
      empid: this.state.empid,
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email,
      mobno: this.state.mobile_no,
      address: this.state.adr,
      aadhar: this.state.adhar_no,
      pan: this.state.pan_no,
      gender: this.state.gender,
      nationality: this.state.nationality,
      Marital: this.state.Marital,
      password: this.state.pwd
    };
    axios
      .post('http://localhost:3000/employee_registration', reqdata)
      .then(response => {
        console.log(response);
        if (response.data.result === 'success') {
          this.props.history.push({
            pathname: '/'
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length < 3 && value.length > 0 ? 'Enter a valid name' : '';
        break;

      case 'lastName':
        formErrors.lastName =
          value.length < 3 && value.length > 0 ? 'Enter a valid name' : '';
        break;

      case 'email':
        formErrors.email = emlRegex.test(value) ? '' : 'Invalid email address';
        break;

      case 'mobile_no':
        formErrors.mobile_no =
          value.length < 10 ? 'Enter valid mobile number' : '';
        break;

      case 'pwd':
        formErrors.pwd =
          value.length < 6 ? 'minimum 6 characaters required' : '';
        break;

      case 'cpwd':
        formErrors.cpwd =
          value.length < 6 ? 'minimum 6 characaters required' : '';
        break;

      case 'adhar_no':
        formErrors.adhar_no = adharRegx.test(value)
          ? ''
          : 'Invalid aadhar Number';
        break;

      case 'pan_no':
        formErrors.pan_no = panRegx.test(value) ? '' : 'Invalid PAN Number';
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <div className="registerheader">Registration Form</div>
        <Form
          className="container"
          align="center"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <FormGroup row>
            <Label className="registerlabel" htmlFor="firstName" sm={2}>
              First Name
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={this.handleChange.bind(this)}
                noValidate
              />

              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="lastName" sm={2}>
              Last Name
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="gender" sm={2}>
              Gender
            </Label>
            <Col sm={10}>
              <select className="registerselect">
                <option value="female" id="female">
                  Female
                </option>
                <option value="male">Male</option>
              </select>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="dob" sm={2}>
              Date of birth
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="date"
                name="dte"
                id="dob"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="fgender" sm={2}>
              Marital Status
            </Label>
            <Col sm={10}>
              <select className="registerselect">
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="nationality" sm={2}>
              Nationality
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="nation"
                placeholder="Enter your nationality"
                onChange={this.handleChange.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="mobile_no" sm={2}>
              Mobile No.
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="mobile_no"
                placeholder="Enter your mobile number"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.mobile_no.length > 0 && (
                <span className="errorMessage">{formErrors.mobile_no}</span>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="email" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="email"
                name="email"
                placeholder="Enter your email id"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="registerlabel" htmlFor="adhar_no" sm={2}>
              Aadhar_no No.
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="adhar_no"
                placeholder="Enter your aadhar number"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.adhar_no.length > 0 && (
                <span className="errorMessage">{formErrors.adhar_no}</span>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="pan_no" sm={2}>
              PAN No.
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="pan_no"
                placeholder="Enter your pan number"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.pan_no.length > 0 && (
                <span className="errorMessage">{formErrors.pan_no}</span>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="emp" sm={2}>
              Employee ID
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="text"
                name="emp"
                placeholder="Enter your employee id"
                onChange={this.handleChange.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="pwd" sm={2}>
              Password
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="password"
                name="pwd"
                placeholder="Enter your password"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.pwd.length > 0 && (
                <span className="errorMessage">{formErrors.pwd}</span>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="cpwd" sm={2}>
              Confirm Password
            </Label>
            <Col sm={10}>
              <Input
                className="registerinput"
                type="password"
                name="cpwd"
                placeholder="Confirm your password"
                onChange={this.handleChange.bind(this)}
              />

              {formErrors.cpwd.length > 0 && (
                <span className="errorMessage">{formErrors.cpwd}</span>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label className="registerlabel" htmlFor="adr" sm={2}>
              Address
            </Label>
            <Col sm={6}>
              <textarea
                cols={45}
                rows={3}
                placeholder="Enter your address"
                name="adr"
                onChange={this.handleChange.bind(this)}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col>
              <button
                className="registerbtn"
                onClick={() => {
                  this.props.history.push({
                    pathname: '/'
                  });
                }}
              >
                Submit
              </button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default RegistrationForm;
