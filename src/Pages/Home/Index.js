import React, { useState, useEffect } from "react";
import MainMenu from "../../Navbar/MainMenu";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function MainHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    navigate("/account");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);
  return (
    <div>
      <MainMenu />

      <Container className="d-flex justify-content-center my-4">
        <Row>
          <Col xs={12} md={6} className="mb-4">
            <Card style={{ width: "18rem" }}>
              <Card.Header>
                {isLoggedIn ? "Logged In" : "Not Logged In"}
              </Card.Header>
              <Card.Body
                style={{
                  height: "200px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                {isLoggedIn ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: " center",
                      justifyContent: " center",
                    }}
                  >
                    <Button variant="primary" className="mb-2">
                      <Link style={{ color: "white", textDecoration: " none" }}>
                        Refresh
                      </Link>
                    </Button>
                    <Button
                      variant="primary"
                      className="mb-2"
                      onClick={handleLogout}
                    >
                      <Link style={{ color: "white", textDecoration: " none" }}>
                        Logout
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button variant="primary" onClick={handleLogin}>
                    <Link style={{ color: "white", textDecoration: " none" }}>
                      Login
                    </Link>
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
