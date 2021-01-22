import React, {Component} from 'react';
import {Container, Row, Table} from 'react-bootstrap';

import classes from './About.module.css';
import * as axios from "axios";
import {BASE_URL} from "../../api/Api";
import Cookies from "universal-cookie";

class Score extends Component {
    state = {
        modal: false,
        resultList: []
    };

    componentDidMount() {

        const cookies = new Cookies();

        console.log("localStorage", JSON.parse(localStorage.getItem("user")))
        let userId = JSON.parse(localStorage.getItem("user")).userId
        axios.get(BASE_URL + '/Results/getByUserId/' + userId,
            {
                headers: {
                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {
                const data = response.data

                this.setState({
                    resultList: data,
                })

            })
    }

    render() {
        return (
            <Container>
                <section id="about">
                    <h2 className={classes.Header}>Score</h2>
                    <Row>
                        {/*<Col xs={12} lg={7} className={classes.AboutContainer}>*/}
                        {/*    <h3>Score Details</h3>*/}
                        {/*    <ul>*/}
                        {/*        <li>Simple</li>*/}
                        {/*        <li>Modern</li>*/}
                        {/*        <li>Dynamic</li>*/}
                        {/*        <li>Intutitive</li>*/}
                        {/*    </ul>*/}
                        {/*</Col>*/}

                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>SN</th>
                                <th>Level</th>
                                <th>Total Question Attempt</th>
                                <th>Total Right</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.resultList.map((result, index) => {
                                return(
                                <tr key={result._id}>
                                    <td>{index + 1}</td>
                                    <td>{result.level}</td>
                                    <td>{result.totalQuestionAttempt}</td>
                                    <td>{result.totalright}</td>
                                    <td>{result.status}</td>
                                </tr>
                            )
                            })}
                            </tbody>
                        </Table>
                    </Row>
                </section>
            </Container>
        );
    }
}

export default Score;
