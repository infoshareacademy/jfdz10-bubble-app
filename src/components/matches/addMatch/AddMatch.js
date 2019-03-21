import React, { Component, Fragment } from 'react'

import { Button, Form, Input, Select, TextArea } from 'semantic-ui-react'

import './AddMatch.css'



const fetchSports = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/sports.json");
    let sports = await response.json();
    return sports;
}

class AddMatch extends Component {

    state = {
        sports: [],
        value: '',
    }

    // sportOptions = [
    //     this.state.sports.map(sport => (
    //         sport.name
    //             `{ key: ${sport.id}, text: ${sport.name}, value: ${sport.name}, }`
    //     ))

    // ]

    componentDidMount() {
        fetchSports()
            .then((sports) => this.setState({
                sports: sports,
            }))

    }



    render() {

        console.log(this.sportOptions)
        console.log(this.state.sports)

        return (
            <Fragment className="add-a-match">
                <div>
                    <h1 className="add-a-match-header">If you would like to set up a match just fill out the below form!</h1>
                </div>

                <Form className="add-a-match-form">
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} label='City' placeholder='City' />
                        <Form.Field control={Input} label='Street' placeholder='Street' />
                        <Form.Field
                            control={Select}
                            label='Sport'
                            options={this.state.sports.map(sport => ({ key: sport.id, text: sport.name, value: sport.name, }))}
                            placeholder='Sport' />
                    </Form.Group>
                    
                    <Form.Field control={TextArea} label='Comments' placeholder='Any comments...?' />

                    <Form.Field control={Button}>Add!</Form.Field>
                </Form>

            </Fragment>
        )

    }
}

export default AddMatch;
