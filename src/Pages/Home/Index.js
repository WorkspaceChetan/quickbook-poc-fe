import React, { useState, useEffect } from "react";
import MainMenu from "../../Navbar/MainMenu";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import TokenServices from "../../ApiServises/TokenService";

export default function MainHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [searchParams] = useSearchParams();

  const refreshToken = async () => {
    const tokenid = localStorage.getItem("tokenid");
    if (tokenid && tokenid.length > 0) {
      const resp = await TokenServices.RefreshToken(tokenid);
      const token = resp.data.token;
      localStorage.setItem("tokenid", token);
    }
  };

  const handleLogin = () => {
    window.location.replace("http://localhost:5000/qb/authUri");
  };

  const handleLogout = () => {
    localStorage.removeItem("tokenid");
    window.location.replace("http://localhost:3000");
  };

  useEffect(() => {
    const tokenid = searchParams.get("tokenid");
    if (tokenid) {
      localStorage.setItem("tokenid", tokenid);
      window.location.replace("http://localhost:3000");
    } else {
      const tokenid = localStorage.getItem("tokenid");
      if (tokenid && tokenid.length > 0) setIsLoggedIn(true);
    }
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
                    <Button
                      onClick={refreshToken}
                      variant="primary"
                      className="mb-2"
                    >
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
