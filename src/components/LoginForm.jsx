import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose, setLoggedIn }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent page reload on form submission
        setLoading(true);
        setError("");  // Clear any previous error message

        try {
            const res = await axios.post("https://fakestoreapi.com/auth/login", {
                username: userName,
                password: password
            });

            console.log(res.data);  // Handle the response (you can store token/user data here)
            const token = res.data.token;
            localStorage.setItem("token", token); // Store token in localstorage
            onClose();  // Close the modal after successful login
            setLoggedIn(true);  // Update the parent component's logged-in state
            setUserName("");  // Clear the username field
            setPassword("");  // Clear the password field
            navigate('/');  // Optionally redirect to the home page after login
        } catch (err) {
            console.log(err);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);  // Stop loading state
        }
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <Top>
                    <Title>Login Form</Title>
                    <CloseButton onClick={onClose}>
                        <Icon src={require("../assets/icons/close-button.svg").default} />
                    </CloseButton>
                </Top>
                <FormContainer onSubmit={handleLogin}>
                    <Email
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Password
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Error>{error}</Error>}
                    <Submit type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Submit>
                </FormContainer>
            </ModalContainer>
        </ModalBackground>
    );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: red;
`;

const Icon = styled.img`
    background-color: white;
    width: 17px;
    height: 17px;
`;

const Title = styled.h2`
    color:purple;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Email = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Password = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Submit = styled.button`
    background-color: purple;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    &:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
`;

const Error = styled.p`
    color: red;
    font-size: 12px;
    margin: 0;
`;

export default LoginForm;