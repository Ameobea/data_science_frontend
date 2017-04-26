//! Form that allows the input of water quality data

import React from 'react';
import { Button, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
const DatePicker = require("react-bootstrap-date-picker");

import { addWaterQualityObservation } from '../utils/queryDb';

class WaterDataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.FieldGroup = this.FieldGroup.bind(this);
    this.handleTimestampChange = this.handleTimestampChange.bind(this);

    this.state = {
      timestamp: new Date().toISOString(),
    }
  }

  FieldGroup({ id, label, help, ...props }) {
    return (
      <Col xs={12} md={6}>
        <FormGroup controlId={id}>
          <Col md={5}>
            <ControlLabel>{label}</ControlLabel>
          </Col>
          <Col md={7}>
            <FormControl bsSize='small' style={{width: '100%'}} {...props} onChange={this.handleInputChange} />
            {help && <HelpBlock>{help}</HelpBlock>}
          </Col>
        </FormGroup>
      </Col>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  handleTimestampChange(value, formattedValue) {
    this.setState({
      timestamp: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    addWaterQualityObservation(this.props.db, this.state)
      .then(this.props.onInputSuccess)
      .catch(this.props.onError);
  }

  render() {
    return (
      <div style={{width: '80%', textAlign: 'left', margin: '0 auto'}}>
        <Form horizontal>
          <this.FieldGroup
            id='location'
            type='text'
            label='Location'
            placeholder='TODO: Replace with Dropdown'
          />

          <Col xs={12} md={6}>
            <FormGroup controlId={'date-recorded'}>
              <Col md={5}>
                <ControlLabel>{'Date Recorded'}</ControlLabel>
              </Col>
              <Col md={7}>
                <DatePicker
                  onChange={this.handleTimestampChange}
                  value={this.state.timestamp}
                />
              </Col>
            </FormGroup>
          </Col>

          <this.FieldGroup
            id='waterTemp'
            type='number'
            label='Water Temp'
          />

          <this.FieldGroup
            id='mmHg'
            type='number'
            label='Air Pressure'
          />

          <this.FieldGroup
            id='DOPercent'
            type='number'
            label='DO Percentage'
          />

          <this.FieldGroup
            id='DOMgL'
            type='number'
            label='DO Mg/L'
          />

          <this.FieldGroup
            id='CUsCm'
            type='number'
            label='CUsCm'
          />

          <this.FieldGroup
            id='eColi1'
            type='number'
            label='E. Coli #1'
          />

          <this.FieldGroup
            id='turbidity'
            type='number'
            label='turbidity'
          />

          <this.FieldGroup
            id='pH'
            type='number'
            label='pH'
          />

          <this.FieldGroup
            id='ClConc'
            type='number'
            label='Cl Concentration'
          />

          <this.FieldGroup
            id='NO3Conc'
            type='number'
            label='NO3 Concentration'
          />

          <this.FieldGroup
            id='SO4Conc'
            type='number'
            label='SO4 Concentration'
          />

          <this.FieldGroup
            id='TSSSampleMass1'
            type='number'
            label='TSSSampleMass1'
          />

          <this.FieldGroup
            id='TSSSampleMass2'
            type='number'
            label='TSSSampleMass2'
          />

          <Button onClick={this.handleSubmit} type="submit">
            {'Submit'}
          </Button>
        </Form>
      </div>
    );
  }
};

WaterDataInput.PropTypes = {
  db: React.PropTypes.any.isRequired,
  onInputSuccess: React.PropTypes.func.isRequired,
  onError: React.PropTypes.func.isRequired,
};

export default WaterDataInput;
