import * as React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import classes from "../../Profile/Profile.module.css";
import * as axios from "axios";
import {BASE_URL} from "../../../api/Api";
import Cookies from 'universal-cookie';

class Signup extends React.Component {

    state = {

        fullname: "",
        age: null,
        gender: "",
        username: "",
        email: "",
        password: "",
        usertypes: ""

    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const cookies = new Cookies();

        let requestDTO = {
            fullname: this.state.fullname,
            age: this.state.age,
            gender: this.state.gender,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            usertypes: "parents",
        }

        axios.post(BASE_URL + '/users/signup', requestDTO,
            {
                headers: {

                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {
                if (response.data.status === 'Signup success!') {

                    window.location.replace('/')

                } else {
                    alert("Sign Up Failed");
                }

            })


    }

    handleInputChange = (e) => {

        const {name, value} = e.target

        this.setState({
            [name]: value
        })

    };


    render() {
        return (
            <Container>
                    <section id="about">
                        <h2 className={classes.Header}>Sign up</h2>

                        <Card className="rounded-card shadow py-4">
                            <Card.Body>

                            <form onSubmit={this.handleFormSubmit}>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Full Name*</label>
                                            <input type="text" className="form-control" placeholder="Enter Full Name"
                                                   required="required"
                                                   name="fullname" value={this.state.fullname}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Age*</label>
                                            <input type="text" className="form-control" placeholder="Enter Age"
                                                   required="required"
                                                   name="age" value={this.state.age}
                                                   onChange={this.handleInputChange}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Gender*</label>
                                            <input type="text" className="form-control" placeholder="Enter Gender"
                                                   required="required"
                                                   name="gender" value={this.state.gender}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>Username*</label>
                                            <input type="text" className="form-control" placeholder="Enter Username"
                                                   required="required"
                                                   minLength={"5"}
                                                   name="username" value={this.state.username}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Email*</label>
                                            <input type="email" className="form-control" placeholder="Enter email"
                                                   required="required"
                                                   name="email" value={this.state.email}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password*</label>
                                            <input type="password" className="form-control" placeholder="Enter password"
                                                   required="required"
                                                   name="password" value={this.state.password}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </Col>
                                </Row>

                                <button type="submit" className="btn btn-primary" style={{marginLeft: "auto"}}
                                        onClick={() => this.handleFormSubmit}>Sign up
                                </button>

                            </form>
                            <br></br>

                            </Card.Body>
                        </Card>

                    </section>
            </Container>
        )
    }
}

export default Signup