import React, {Component} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import iotImg from '../../assets/images/iot.jpg';

class Home extends Component {
  state = {
    mode: 'Practice',
  };

  toggleMode = () => {
    const { mode } = this.state;
    this.setState({ mode: mode === 'Practice' ? 'Review' : 'Practice' });
  };

  render() {
    let redirect = 'practice';
    if (this.state.mode === 'Review') redirect = 'review';

    let subjectCards = [
      {
        title: 'Level 1',
        image: iotImg,
        link: `/${redirect}/level1`,
      },
      {
        title: 'Level 2',
        image: iotImg,
        link: `/${redirect}/level2`,
      },
    ];

    return (
      <Container>
        {this.props.admin ? (
          <Row>
            <Col xs={12} className="text-center">
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={this.toggleMode}
                className="rounded-pill my-2 px-4"
              >
                {this.state.mode + ' Mode'}
              </Button>
            </Col>
          </Row>
        ) : null}
        <Row className="align-center">
          {subjectCards.map((subject) => (
            <Col xs={12} md={6} lg={3} className="my-3" key={subject.title}>
              <Card
                className="shadow text-center font-weight-bold rounded-card hoverable"
                onClick={() => this.props.history.push(subject.link)}
              >
                <Card.Img src={subject.image} />
                <Card.Body>
                  <Card.Text>{subject.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Home
