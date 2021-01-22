import React, {Component} from 'react';
import {Button, Card, Col, Container, ListGroup, ProgressBar, Row,} from 'react-bootstrap';
import classes from './Practice.module.css';
import Cookies from "universal-cookie";
import * as axios from "axios";
import {BASE_URL} from "../../api/Api";
import Sketch from "react-p5";

class Practice extends Component {


    state = {
        questionsList: [],
        selectedQuestion: null,
        correctAnswer: null,
        questions: null,
        correct: 0,
        incorrect: 0,
        level: ''
    }

    x = 50
    y = 50

    setup = (p5, parent) => {
        p5.createCanvas(350, 400).parent(parent)
    }

    draw = (p5) => {

        let correctAnswer = this.state?.questionsList[this.state.selectedQuestion]?.correctANswer
        let level = this.state?.questionsList[this.state.selectedQuestion]?.level
        let type = this.state?.questionsList[this.state.selectedQuestion]?.type

        p5.background(220);

        if ((level === "Easy") || (level === "EASY")) {

            if (type === 'Line') {
                console.log(correctAnswer)
                p5.strokeWeight(6);
                p5.line(100, 31, 100, 300);
            }

            if (type === 'Circle') {
                p5.circle(200, 100, 150);
            }
            if (type === 'Triangle') {
                p5.triangle(30, 75, 58, 20, 86, 75);
            }
            if (type === 'Rectangle') {
                p5.rect(50, 50, 200, 100);
            }
            if (type === 'Square') {
                p5.square(50, 50, 200);
            }
            if (type === 'Curve') {
                p5.curve(50, 50, 400, 50, 50, 250, 50, 50);
            }
            if (type === 'Point') {
                p5.point(50, 50);
            }

        }

        if (level === "Hard") {

            if (type === 'Line') {
                console.log(type)
                p5.strokeWeight(6);
                console.log("correctAnswer", correctAnswer)

                if (correctAnswer === '1') {
                    p5.line(100, 31, 100, 300);
                }

                if (correctAnswer === '2') {
                    p5.line(120, 31, 120, 300);
                    p5.line(150, 31, 150, 300);
                }

                if (correctAnswer === '3') {
                    p5.line(100, 31, 100, 300);
                    p5.line(120, 31, 120, 300);
                    p5.line(150, 31, 150, 300);

                }


            }

            if (type === 'Circle') {

                if (correctAnswer === '1') {
                    p5.circle(200, 100, 150);
                }

                if (correctAnswer === '2') {
                    p5.circle(200, 100, 150);
                    p5.circle(500, 100, 150);
                }

                if (correctAnswer === '3') {
                    p5.circle(200, 100, 150);
                    p5.circle(500, 100, 150);
                    p5.circle(700, 100, 150);

                }
            }

            if (type === 'Triangle') {
                if (correctAnswer === '1') {
                    p5.triangle(30, 75, 58, 20, 86, 75);
                }

                if (correctAnswer === '2') {
                    p5.triangle(30, 75, 58, 20, 86, 75);
                    p5.triangle(100, 75, 130, 20, 160, 75);
                }

                if (correctAnswer === '3') {
                    p5.triangle(30, 75, 58, 20, 86, 75);
                    p5.triangle(100, 75, 130, 20, 160, 75);
                    p5.triangle(180, 75, 200, 20, 250, 75);

                }
            }

            if (type === 'Rectangle') {
                if (correctAnswer === '1') {
                    p5.rect(50, 50, 100, 50);
                }

                if (correctAnswer === '2') {
                    p5.rect(50, 50, 100, 50);
                    p5.rect(50, 200, 100, 50);
                }

                if (correctAnswer === '3') {
                    p5.rect(50, 50, 100, 50);
                    p5.rect(50, 200, 100, 50);
                    p5.rect(50, 400, 100, 50);


                }
            }

            if (type === 'Square') {

                if (correctAnswer === '1') {
                    p5.square(50, 50, 80);
                }
                if (correctAnswer === '2') {
                    p5.square(50, 50, 80);
                    p5.square(50, 150, 80);
                }
                if (correctAnswer === '3') {
                    p5.square(50, 50, 80);
                    p5.square(50, 150, 80);
                    p5.square(50, 250, 80);
                }
            }

            if (type === 'Curve') {

                if (correctAnswer === '1') {
                    p5.curve(50, 50, 400, 50, 50, 250, 50, 50);
                }
                if (correctAnswer === '2') {
                    p5.curve(50, 50, 400, 50, 50, 250, 50, 50);
                    p5.curve(20, 100, 100, 50, 100, 250, 50, 100);
                }
                if (correctAnswer === '3') {
                    p5.curve(50, 50, 400, 50, 50, 250, 50, 50);
                    p5.curve(20, 100, 100, 50, 100, 250, 50, 100);
                    p5.curve(80, 100, 100, 50, 100, 250, 50, 100);
                }
            }

            if (type === 'Point') {
                p5.point(50, 50);
            }
        }

    }

    componentDidMount() {

        const cookies = new Cookies();
        const {level} = this.props.match.params

        let api
        if (level === 'level1') {
            api = 'Easy'

        } else {
            api = 'Hard'
        }
        this.setState({
            level: api
        })

        axios.get(BASE_URL + '/Questions/getByLevel/' + api,
            {
                headers: {

                    Authorization: cookies.get('token')
                }
            }
        )
            .then(response => {
                const data = response.data

                this.setState({
                    questionsList: data,
                    selectedQuestion: 0
                })

            })

    }

    componentDidUpdate(prevProps) {
        if (this.props.questionsList && prevProps.questionsList !== this.props.questionsList) {
            this.setState(
                {questionsList: this.props.questionsList?.sort(() => Math.random() - 0.5)},
                () => this.setSelectedQuestion(0)
            );
        }
    }

    setSelectedQuestion = (id) => {
        this.clearAnswer();
        this.setState({
            selectedQuestion: id,
            correctAnswer: this.state.questionsList[id]?.correctANswer,
        });
    };

    selectAnswer = (event) => {
        console.log("selectAnswer,")
        const el = event.target;
        // Remove focus from the button
        el.blur();
        const options = document.getElementsByClassName(classes.ListItem);

        // const {correctAnswer} = this.state;
        // const {correctAnswer} = this.state;
        let correctAnswer = this.state?.questionsList[this.state.selectedQuestion]?.correctANswer
        console.log("correctAnswer", correctAnswer)
        if (correctAnswer && correctAnswer !== '') {
            for (let opt of options) {
                opt.disabled = true;
                const {id} = opt.children[0]
                console.log("id", id)
                console.log("correctAnswer", correctAnswer)
                if (id === correctAnswer) {
                    opt.classList.add(classes.Correct);
                    if (opt !== el) {
                        el.classList.add(classes.Incorrect);
                        this.setState({incorrect: this.state.incorrect + 1});
                    } else {
                        this.setState({correct: this.state.correct + 1});
                    }
                }
            }
        } else {
            for (let opt of options) {
                opt.classList.remove(classes.Selected);
            }
            el.classList.add(classes.Selected);
        }
    };

    clearAnswer = () => {
        const options = document.getElementsByClassName(classes.ListItem);
        for (let opt of options) {
            opt.classList.remove(classes.Selected);
            opt.classList.remove(classes.Correct);
            opt.classList.remove(classes.Incorrect);
            opt.disabled = false;
        }
    };

    evaluate = () => {
        this.setState({showScore: true});

    };

    render() {

        if (!this.state.questionsList || this.state.selectedQuestion === null) {
            return null;
        } else if (this.state.showScore) {
            const {correct, incorrect, questionsList} = this.state;
            const total = correct + incorrect;
            const unknown = questionsList.length - total;
            const score = correct * 1;
            const totalScore = total * 1;
            const percentage = ((score * 100) / totalScore).toFixed(2);

            console.log("localStorage", JSON.parse(localStorage.getItem("user")))
            let userId = JSON.parse(localStorage.getItem("user")).userId

            let resultRequest = {
                userId: userId,
                totalQuestionAttempt: totalScore,
                totalright: score,
                level: this.state.level
            }

            const cookies = new Cookies();

            axios.post(BASE_URL + '/Results/', resultRequest,
                {
                    headers: {

                        Authorization: cookies.get('token')
                    }
                }
            )


            return (
                <Container>
                    <Card className={classes.ContainerCard}>
                        <Card.Body className="d-flex flex-column">
                            <Row>
                                <Col xs={12} className="pb-3 text-center">
                                    <h1>Score</h1>
                                    <h2 className="display-4 my-4">
                                        <span className="text-primary">{`${score} / ${totalScore}`}</span>
                                        <br/>
                                        <span
                                            className={
                                                percentage >= 40 ? 'text-success' : 'text-danger'
                                            }
                                        >{`${percentage}%`}</span>
                                    </h2>
                                    <h3>
                                        Correct: <span className="text-success">{correct}</span>
                                    </h3>
                                    <h3>
                                        Incorrect: <span className="text-danger">{incorrect}</span>
                                    </h3>
                                    <h3>
                                        Unknown: <span className="text-primary">{unknown}</span>
                                    </h3>
                                </Col>
                            </Row>
                            <Row className="mt-auto">
                                <Col xs={12} className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        onClick={() => this.props.history.push('/')}
                                    >
                                        Go to Home
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            );
        }

        const {selectedQuestion, questionsList} = this.state;
        const data = questionsList[selectedQuestion];
        return (
            (this.state.questionsList ?
                <>
                    <Container>
                        <Card className={classes.ContainerCard}>

                            <Card.Body className="d-flex flex-column">
                                <Row>
                                    <Col xs={12} className="pb-3 text-center">
                                        <h5 className="font-weight-bold">
                                            {`${selectedQuestion + 1} / ${questionsList.length}`}
                                        </h5>
                                        <ProgressBar
                                            min={0}
                                            max={questionsList.length}
                                            now={selectedQuestion + 1}
                                            id="progress-bar"
                                            style={{height: '0.5em'}}
                                            animated
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={8}>
                                        <Row>
                                            <Col xs={12} md={2} lg={1}>
                <span className="font-weight-bold">{`Q.${
                    selectedQuestion + 1
                }`}</span>
                                            </Col>
                                            <Col xs={12} md={10} lg={11}>
                                                <h5>{data?.questions}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col
                                                xs={12}
                                                md={{span: 10, offset: 2}}
                                                lg={{span: 11, offset: 1}}
                                                className="mt-3"
                                            >
                                                <ListGroup className={classes.ListGroup}>
                                                    <ListGroup.Item
                                                        action
                                                        onClick={this.selectAnswer}
                                                        className={classes.ListItem}
                                                    >
                    <span id={data?.options[0]} value={data?.options[0]} className="font-weight-bold mr-4">
                      A
                    </span>
                                                        <strong>{data?.options[0]}</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item
                                                        action
                                                        onClick={this.selectAnswer}
                                                        className={classes.ListItem}
                                                    >
                    <span id={data?.options[1]} value={data?.options[1]} className="font-weight-bold mr-4">
                      B
                    </span>
                                                        <strong>{data?.options[1]}</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item
                                                        action
                                                        onClick={this.selectAnswer}
                                                        className={classes.ListItem}
                                                    >
                    <span id={data?.options[2]} value={data?.options[2]} className="font-weight-bold mr-4">
                      C
                    </span>
                                                        <strong>  {data?.options[2]}</strong>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item
                                                        action
                                                        onClick={this.selectAnswer}
                                                        className={classes.ListItem}
                                                    >
                    <span id={data?.options[3]} value={data?.options[3]} className="font-weight-bold mr-4">
                      D
                    </span>
                                                        <strong> {data?.options[3]}</strong>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={4}>
                                        <Sketch setup={this.setup} draw={this.draw}/>
                                    </Col>
                                </Row>

                                <Row className="mt-auto">
                                    <Col xs={12} className="d-flex justify-content-between">
                                        <Button
                                            variant="outline-primary"
                                            size="lg"
                                            onClick={() => this.evaluate()}
                                            disabled={selectedQuestion <= 0}
                                            className="px-4 rounded-pill"
                                        >
                                            Submit{' '}
                                            {/*<i className="material-icons align-text-bottom">publish</i>*/}
                                        </Button>
                                        <Button
                                            variant="outline-success"
                                            size="lg"
                                            onClick={() => this.setSelectedQuestion(selectedQuestion + 1)}
                                            disabled={selectedQuestion === questionsList.length - 1}
                                            className="px-4 rounded-pill"
                                        >
                                            Next{' '}
                                            {/*<i className="material-icons align-text-bottom">*/}
                                            {/*    arrow_right_alt*/}
                                            {/*</i>*/}
                                        </Button>
                                    </Col>
                                </Row>

                            </Card.Body>

                        </Card>
                    </Container>
                </> : null)
        );


    }
}


export default Practice;
