import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

export default class MainView extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>Simple text compiled?!</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}
