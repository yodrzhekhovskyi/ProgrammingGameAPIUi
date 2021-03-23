import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";

export function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const goToHome = () => history.push("/");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    sendLoginData();
  };

  const sendLoginData = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        password: password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    
    await fetch("https://localhost:5001/api/authentication/login", requestOptions)
      .then(response => response.json())
      .then((response) => { 
        console.log(response);
        props.onLoggedIn(true, { userName: response.userName });
        goToHome();
      })
      .catch(() => {
        props.onLoggedIn(false);
      });
  }

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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              block
              variant="primary"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
