import { useState } from "react";
import API from "../utilities/API";
import useForm from "../utilities/formValidation/useForm"
import { useAuth } from "../contexts/AuthContext";
import validate from "../utilities/formValidation/loginValidation";
import { useNavigate } from "react-router-dom";

import {
    Form,
    InputGroup,
    InputGroupText,
    Input,
    Button,
    Toast,
    ToastHeader,
    ToastBody
  } from "reactstrap";

import { Link } from "react-router-dom"


export default function Login() {
    const { setAuth, setRole, setUsername } = useAuth();
    const [toastOpen, setToastOpen] = useState(true);
    const hideToast = () => {setToastOpen(false)}
    const navigate = useNavigate();

    const initialLoginValues = {
        email: "",
        password: "",
        };

    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        initialLoginValues,
        validate
        );

        
    async function submit() {
        try {
            const response = await API.login(values);
            const { token, role, username } = response.data;
        
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", username);
        
            setRole(role);
            setAuth(true);
            setUsername(username);
        
            if (role === "admin") {
            navigate("/admin/index");
            } else if (role === "developer" || role === "project manager") {
            navigate("/general/index");
            }
        
            values.email = "";
            values.password = "";
        } catch (error) {
            console.error(error);
            alert("Invalid login");
        }
        }
          
    
    return(
        <>
        <div className="auth-card p-5">
            {/* Welcome Toast Message */}
            <Toast isOpen={toastOpen} id="welcome-toast">
                <ToastHeader toggle={hideToast} style={{color: "var(--dark-text)"}}>
                    Demo User Login!
                </ToastHeader>
                <ToastBody>
                    <p>
                        Hello Visitor! You can log into a demo account using these credentials:
                    </p>
                    <div>
                        Email: demouser@example.com
                        <br/>
                        Password: password
                    </div>
                </ToastBody>
            </Toast>
            {/* Login Form */}
            <Form onSubmit={handleSubmit} className="d-flex align-items-center flex-column">
                <p className="auth-card-title fs-5 mb-4">Log in</p>
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-envelope"></i>
                    </InputGroupText>
                    <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.email && (
                    <span className="text-danger w-100 text-start">
                        {errors.email}
                    </span>
                )}
                <br />
                <InputGroup>
                    <InputGroupText className="bg-white">
                        <i className="fa-solid fa-unlock"></i>
                    </InputGroupText>
                    <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </InputGroup>
                {errors.password && (
                    <span className="text-danger w-100 text-start">
                        {errors.password}
                    </span>
                )}
                <br />
                <div className="align-self-start">
                    <input
                    id="rememberMeLogin"
                    type="checkbox"
                    />
                    <label
                    className="custom-control-label ms-1"
                    htmlFor="rememberMeLogin"
                    >
                        <span className="text-muted">Remember me</span>
                    </label>
                </div>
                <Button className="mt-4" type="submit">Sign in</Button>
            </Form>
        </div>
        <div className="login-links d-flex mt-2">
            <Link
                className="me-auto"
                onClick={(e) => e.preventDefault()}
            >
                Forgot Password
            </Link>
            <Link className="ms-auto" to="/auth/register">Create New Account</Link>
        </div>
        </>
    )
}