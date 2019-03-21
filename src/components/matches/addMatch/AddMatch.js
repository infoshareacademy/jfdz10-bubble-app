import React, { Component, Fragment } from 'react'

import moment from 'moment'

import { Button, Form, Input, Select, TextArea, Message } from 'semantic-ui-react'

import {
    DateInput,
    TimeInput,
} from 'semantic-ui-calendar-react';

import './AddMatch.css'



const fetchSports = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/sports.json");
    let sports = await response.json();
    return sports;
}

class AddMatch extends Component {

    state = {
        sports: [],
        city: '',
        street: '',
        sport: '',
        date: '',
        time: '',
        cityError: false,
        streetError: false,
        sportError: false,
        dateError: false,
        timeError: false,
        formError: false,
        formSuccess: false,
    }


    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (e) => {
        let error = false;

        if (this.state.city === '') {
            this.setState({ cityError: true });
            error = true;
        } else {
            this.setState({ cityError: false });
        }

        if (this.state.street === '') {
            this.setState({ streetError: true });
            error = true;
        } else {
            this.setState({ streetError: false });
        }

        if (this.state.sport === '') {
            this.setState({ sportError: true });
            error = true;
        } else {
            this.setState({ sportError: false });
        }

        if (this.state.date < moment((new Date()).toString()).format("DD-MM-YYYY")) {
            this.setState({ dateError: true });
            error = true;
        } else {
            this.setState({ dateError: false });
        }

        if (error) {
            this.setState({ formError: true });
            return
        } else {
            this.setState({ formSuccess: true });
        }

        this.setState({ formError: false });

    }


    componentDidMount() {
        fetchSports()
            .then((sports) => this.setState({
                sports: sports,
            }))

    }

    "12-03-2019"

    render() {

        return (
            <Fragment >
                <div>
                    <h1 className="add-a-match-header">If you would like to set up a match just fill out the below form!</h1>
                </div>

                <Form
                    className="add-a-match-form"
                    onSubmit={(event) => { this.handleSubmit(event) }}
                    error={this.state.formError}
                >
                    {this.state.formError
                        ?
                        <Message
                            error
                            header="You cannot select a past date!"
                            content="Select a date in the future - remember that players will need some time to join your match"
                        />
                        :
                        null
                    }

                    {/* {this.state.formSuccess
                        ?
                        <Message
                            success
                            header="Match registered!"
                            content="Great! You have successfully registered a match! Sit down, relax, and wait for others to join your game."
                        />
                        :
                        null
                    } */}


                    <Form.Group widths='equal'>
                        <Form.Field
                            name='city'
                            control={Input}
                            label='City'
                            placeholder='City'
                            error={this.state.cityError}
                            onChange={this.handleChange} />
                        <Form.Field
                            name='street'
                            control={Input}
                            label='Street'
                            placeholder='Street'
                            error={this.state.streetError}
                            onChange={this.handleChange} />
                        <Form.Field
                            name='sport'
                            control={Select}
                            label='Sport'
                            options={this.state.sports.map(sport => ({ key: sport.id, text: sport.name, value: sport.name, }))}
                            placeholder='Sport'
                            error={this.state.sportError}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <DateInput
                        label='Date'
                        name="date"
                        placeholder="Date"
                        value={this.state.date}
                        iconPosition="left"
                        error={this.state.dateError}
                        onChange={this.handleChange}
                    />
                    <TimeInput
                        name="time"
                        placeholder="Time"
                        value={this.state.time}
                        iconPosition="left"
                        error={this.state.timeError}
                        onChange={this.handleChange}
                    />


                    <Form.Field control={TextArea} label='Comments' placeholder='Any comments...?' />

                    <Form.Field
                        disabled={
                            !this.state.city
                            || !this.state.street
                            || !this.state.sport
                            || !this.state.date
                            || !this.state.time
                        }
                        control={Button}>Add!</Form.Field>

                    
                </Form>

            </Fragment>
        )

    }
}

export default AddMatch;
