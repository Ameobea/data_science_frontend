//! Provides an interface for exporting data from the application in various formats

import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class DataExport extends React.Component {
  constructor(props) {
    super(props);

    this.handleAllDataExport = this.handleAllDataExport.bind(this);
    this.handleValpoJsonExport = this.handleValpoJsonExport.bind(this);
    this.handleValpoCsvExport = this.handleValpoCsvExport.bind(this);
    this.handleGradeschoolJsonExport = this.handleGradeschoolJsonExport.bind(this);
    this.handleGradeschoolCsvExport = this.handleGradeschoolCsvExport.bind(this);

    this.state = {};
  }

  /**
   * Exports a new JSON file in the format that this application accepts.  This file will contain all previously
   * imported data as well as any added observations for both the VU student and gradeschooler data.
   */
  handleAllDataExport() {
    // TODO
  }

  handleValpoJsonExport() {
    // TODO
  }

  handleValpoCsvExport() {
    // TODO
  }

  handleGradeschoolJsonExport() {
    // TODO
  }

  handleGradeschoolCsvExport() {
    // TODO
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <center>
              <h1>Export Data</h1>
              <Button bsSize='large' bsStyle='primary' onClick={this.handleAllDataExport}>Export All Data</Button>
            </center>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={6}>
            <center>
              <h2>Export Valpo Water Quality Data</h2>
              <Row>
                <Col xs={6} sm={6} md={6}>
                  <center>
                    <Button bsStyle='primary' onClick={this.handleValpoJsonExport}>Export JSON</Button>
                  </center>
                </Col>
                <Col xs={6} sm={6} md={6}>
                  <center>
                    <Button bsStyle='primary' onClick={this.handleValpoJsonExport}>Export CSV</Button>
                  </center>
                </Col>
              </Row>
            </center>
          </Col>
          <Col xs={12} sm={6} md={6}>
            <center>
              <h2>Export Gradeschooler-Collected Data</h2>
              <Row>
                <Col xs={6} sm={6} md={6}>
                  <center>
                    <Button bsStyle='primary' disabled onClick={this.handleGradeschoolJsonExport}>Export JSON</Button>
                  </center>
                </Col>
                <Col xs={6} sm={6} md={6}>
                  <center>
                    <Button bsStyle='primary' disabled onClick={this.handleGradeschoolJsonExport}>Export CSV</Button>
                  </center>
                </Col>
              </Row>
            </center>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DataExport;
