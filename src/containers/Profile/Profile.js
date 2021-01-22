import {Component} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import Modal from '../../components/Modal/Modal';
import classes from './Profile.module.css';
import * as axios from "axios";
import {BASE_URL} from "../../api/Api";
import Cookies from "universal-cookie";

class Profile extends Component {
    state = {
        user: {
            fullname: '',
            gender: '',
            age: '',
            email: ''
        },
        disabled: true
    };
    handleEdit = () => {
        this.setState({
            disabled: false
        })
    }

    componentDidMount() {

        this.loadUserData()
    }

    loadUserData = () => {
        const cookies = new Cookies();

        console.log("localStorage", JSON.parse(localStorage.getItem("user")))
        axios.get(BASE_URL + '/users/me',
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {
                const data = response.data
                this.setState({
                    user: {
                        fullname: data.fullname,
                        gender: data.gender,
                        age: data.age,
                        email: data.email,
                    },
                    disabled:true
                })

            })
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const cookies = new Cookies();

        let requestDTO = {
            fullname: this.state.user.fullname,
            age: this.state.user.age,
            gender: this.state.user.gender,
            email: this.state.user.email
        }

        axios.put(BASE_URL + '/admindet/', requestDTO,
            {
                headers: {

                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {
                if(response!==null){
                    this.loadUserData()
                }

            })


    }

    handleInputChange = (e) => {

        const {name, value} = e.target

        this.setState({
            ...this.state,
            user:{
                [name]: value
            }
        })

    };


    render() {
        return (
            <Container>
                <Modal
                    show={this.state.modal}
                    onHide={() => this.setState({modal: false})}
                    title="Donate"
                >
                </Modal>
                <section id="about">
                    <h2 className={classes.Header}>Profile</h2>

                    <Card className="rounded-card shadow py-4">
                        <Card.Body>

                            <Row>
                                {this.state.disabled === true ?
                                    <button className="btn btn-primary" style={{marginLeft: "auto"}}
                                            onClick={this.handleEdit}>Edit
                                    </button> : null}
                            </Row>
                            <form onSubmit={this.handleFormSubmit}>
                                <Row>
                                    <Col>
                                        <div className="form-group">
                                            <label>Full Name*</label>
                                            <input type="text" className="form-control" placeholder="Enter Full Name"
                                                   required="required"
                                                   name="fullname" value={this.state.user.fullname}
                                                   onChange={this.handleInputChange}
                                                   disabled={this.state.disabled}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Age*</label>
                                            <input type="text" className="form-control" placeholder="Enter Age"
                                                   required="required"
                                                   name="age" value={this.state.user.age}
                                                   onChange={this.handleInputChange}
                                                   disabled={this.state.disabled}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Gender*</label>
                                            <input type="text" className="form-control" placeholder="Enter Gender"
                                                   required="required"
                                                   name="gender" value={this.state.user.gender}
                                                   onChange={this.handleInputChange}
                                                   disabled={this.state.disabled}/>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="form-group">
                                            <label>Email*</label>
                                            <input type="email" className="form-control" placeholder="Enter email"
                                                   required="required"
                                                   name="email" value={this.state.user.email}
                                                   onChange={this.handleInputChange}
                                                   disabled={this.state.disabled}/>
                                        </div>
                                    </Col>
                                </Row>
                                {this.state.disabled === false ?
                                    <button type="submit" className="btn btn-primary" style={{marginLeft: "auto"}}
                                            onClick={() => this.handleFormSubmit}>Update
                                    </button> : null}

                            </form>
                            <br></br>

                        </Card.Body>
                    </Card>
                </section>
            </Container>
        );
    }
}

export default Profile;
