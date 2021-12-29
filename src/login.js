import { Card, Col, Row } from "react-bootstrap";
import LoginForm from "./forms/loginForm";

function Login() {
  return (
    <Row>
      <Col></Col>
      <Col>
        <Card style={{ width: "24rem" }}>
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>
            <Card.Text>
              <LoginForm />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default Login;
