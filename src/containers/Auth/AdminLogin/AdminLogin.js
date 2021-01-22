import React, {Component} from 'react';
import {Alert, Card, Col, Container, Row} from 'react-bootstrap';
import {Redirect} from 'react-router';
import Cookies from 'universal-cookie';

import classes from './AdminLogin.module.css';
import Form from '../../../components/Form/Form';
import {BASE_URL} from "../../../api/Api";
import * as axios from "axios";

class AdminLogin extends Component {
  state = {
    loginForm: {
      formInputs: {
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Username',
          },
          label: 'Username',
          value: '',
          validation: {
            required: true,
            isUsername: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          label: 'Password',
          // helpText: 'The password must be at least 8 characters',
          value: '',
          validation: {
            required: true,
            // minlength: 8,
          },
          valid: false,
          touched: false,
        },
      },
      submitButton: {
        variant: 'primary',
        value: 'Login',
      },
    },
  };

  loginHandler = (formData) => {

    let user={
      username:formData.username,
      password:formData.password
    }

    axios.post(BASE_URL + '/users/login', user)
        .then(function (response) {
          console.log(response);

          if (response.data.code === 200) {
            const cookies = new Cookies();
            console.log(response.data)
            cookies.set('token', 'Bearer ' + response.data.token, {path: '/',});

            localStorage.setItem("user", JSON.stringify(response.data))
            window.location.replace('/')

          } else {
            alert("Authentication Failed");
          }
        }).catch(function (error) {
      alert("Authentication Failed");

      console.log(error);
    });


    // this.props.onAuth(formData.username, formData.password);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isAuth ? <Redirect to="/" /> : null}
        <Container>
          <Row className="mx-0">
            <Col lg={6} className={classes.LoginHero}></Col>
            <Col xs={12} lg={6} className={classes.LoginContainer}>
              <Card className="rounded-card shadow py-4">
                <Card.Body>
                  <Row className="justify-content-center">
                    {this.props.errorMsg ? (
                      <Col xs={12}>
                        <Alert variant="danger">{this.props.errorMsg}</Alert>
                      </Col>
                    ) : null}
                    <Col xs={12} md={8}>
                      <Form
                        formData={this.state.loginForm.formInputs}
                        submitButton={this.state.loginForm.submitButton}
                        loading={this.props.loading}
                        submitted={this.loginHandler}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default AdminLogin;
