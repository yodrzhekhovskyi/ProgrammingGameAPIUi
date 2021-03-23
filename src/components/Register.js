import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function Register(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const goToHome = () => history.push("/");

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRegisterData();
  };

  const sendRegisterData = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        password: password,
        confirmPassword: confirmPassword,
        email: email
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    await fetch(
      "https://localhost:5001/api/authentication/register",
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (!response.status){
          props.onLoggedIn(true, { userName: response.userName });
          goToHome();
        }
      })
      .catch(() => {
        props.onLoggedIn(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button block variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
