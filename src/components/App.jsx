import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// eslint-disable-next-line
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line
import Button from 'react-bootstrap/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    renderReminders() {
        const { reminders } = this.props;
        return (
            <ListGroup as="ul"> {
                reminders.map(reminder => {
                    return (
                        <ListGroup.Item as="li" key={reminder.id} >
                            <div className="list-item">
                                <div>{reminder.text}</div>
                                <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                            </div>
                            <div className="list-item delete-button" onClick={() => this.deleteReminder(reminder.id)} >
                                &#x2715;
                            </div>
                        </ListGroup.Item>
                    )
                })
            }
            </ListGroup>
        )
    }

    render() {
        return (
            <Container>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand>
                        Reminder Pro
                    </Navbar.Brand>
                </Navbar>

                <Form.Row className="row1 justify-content-md-center">
                    <Form.Group as={Col} lg={7}>
                        <Form.Control placeholder="I have to..." onChange={event => this.setState({ text: event.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} lg={3}>
                        <Form.Control className="datetime" type="datetime-local" onChange={event => this.setState({ dueDate: event.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} lg={2}>
                        <button type="button" className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button>
                    </Form.Group>
                </Form.Row>

                <Form.Row className="row2">
                    <Form.Group as={Col}>
                        {this.renderReminders()}
                    </Form.Group>
                </Form.Row>

                <Form.Row className="row3 justify-content-md-center">
                    <Form.Group as={Col} md={12}>
                        <button className="btn btn-danger" onClick={() => this.props.clearReminders()}>Clear Reminders</button>
                    </Form.Group>
                </Form.Row>

            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);