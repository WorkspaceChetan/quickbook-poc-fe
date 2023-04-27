import React from "react";
import MainMenu from "../Navbar/MainMenu";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableData from "./Account/AccountTableData";

export default function AccountType() {
  return (
    <div>
      <MainMenu />
      <Container fluid="md">
        <Row>
          <Col>
            <TableData />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
