import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export function PlaygroundPage() {
  let { id } = useParams();
  const [programCode, setProgramCode] = useState();
  const [languageCode, setLanguageCode] = useState(1);
  const [availableCodingLanguages, setAvailableCodingLanguages] = useState([]);
  const [compilerArgs, setCompilerArgs] = useState();
  const [input, setInput] = useState();
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAvailableCodingLanguages = async () => {
      const response = await fetch(
        `https://localhost:5001/api/snippets/available-coding-languages`
      );
      const data = await response.json();
      setAvailableCodingLanguages(data);
    };
    getAvailableCodingLanguages();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    sendSnippetData();
  };

  const sendSnippetData = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        program: programCode,
        code: languageCode,
        input: input
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    setIsLoading(true);

    await fetch(`https://localhost:5001/api/snippets`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (!response.status){
          setResult(response);
        }
      })
      .catch(() => {})
      .finally(() => {setIsLoading(false)});
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={9}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select language</Form.Label>
                <Form.Control
                  as="select"
                  value={languageCode}
                  onChange={(e) => setLanguageCode(parseFloat(e.target.value))}
                >
                  {availableCodingLanguages.map((cl) => (
                    <option key={cl.snippetLanguageCode} value={cl.snippetLanguageCode}>{cl.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="code">
                <Form.Label>Put your code here</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={17}
                  value={programCode}
                  onChange={(e) => setProgramCode(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Compiler args</Form.Label>
                <Form.Control
                  type="text"
                  value={compilerArgs}
                  onChange={(e) => setCompilerArgs(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="code">
                <Form.Label>Input</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isLoading}>
                Submit
                {isLoading ? (
                  <Spinner
                    style={{ marginLeft: "5px" }}
                    animation="border"
                    size="sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : null}
              </Button>
            </Form>
          </Col>
          <Col sm={3}>
            <h3>Response</h3>
            <p>Result: {result?.result}</p>
            <p style={{ color: 'red' }}>Errors: {result?.errors }</p>
            <p style={{ color: 'orange' }}>Warnings: {result?.warnings }</p>
            <p>Stats: {result?.stats }</p>
            <p>Files: {result?.files }</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
