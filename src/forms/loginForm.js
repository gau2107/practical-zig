import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Users from "../assets/json/users.json";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const users = Users.users;
  const navigate = useNavigate();

  // check login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("../invites", { replace: true });
  }, []);

  const initFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState({ ...initFormData });
  const [showAlert, setShowAlert] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const handleChange = (event) => {
    event.persist();
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let loggedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (loggedUser) {
      loggedUser.password = window.btoa(formData.password);
      // localStorage.setItem("password", window.btoa(formData.password));
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("../invites", { replace: true });
    }

    setShowAlert(true);
    setLoggedUser(loggedUser);

    setFormData({ ...initFormData });
    return;
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant={loggedUser ? "success" : "danger"}>
          {loggedUser ? "Logged in successfully." : "Wrong credentials!"}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;
