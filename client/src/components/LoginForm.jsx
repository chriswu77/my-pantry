import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Button, Box, Notification } from 'react-bulma-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../../store/auth';

const LoginFormBox = styled(Box)``;

const ErrorMessage = styled(Notification)`
  width: fit-content;
`;

const SignUpDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SignUpLink = styled(Button)`
  border: none;
  padding: 0;
  text-decoration: underline;
  margin-left: 5px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });
      dispatch(authActions.logIn(response.data._id));
      history.push('/');
    } catch (err) {
      console.log('login error:', err);
      setErrorText('Invalid username or password');
    }
  };

  return (
    <LoginFormBox id="login-form">
      <form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Label>Username</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Button type="submit">Login</Button>
      </form>

      {errorText && (
        <ErrorMessage className="is-danger is-light">{errorText}</ErrorMessage>
      )}

      <SignUpDiv>
        <span>Don&apos;t have an account?</span>
        {/* <SignUpLink to="/signup" renderAs={Link}> */}
        <SignUpLink to="#signup-form" renderAs={Link}>
          Sign up
        </SignUpLink>
      </SignUpDiv>
    </LoginFormBox>
  );
};

export default LoginForm;
