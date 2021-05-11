import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { act } from 'react-dom/test-utils';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const cxt = useContext(AuthContext);

    const emailReducer = (state, action) => {
        if (action.type === "USER_INPUT") {
            return { value: action.val, isValid: action.val.includes("@") }
        }
        if (action.type === "INPUT_BLUR") {
            return { value: state.value, isValid: state.value.includes("@") }
        }
        return { value: '', isValid: false }
    }

    const passwordReducer = (state, action) => {
        if (action.type === "USER_PASSWORD") {
            return { value: action.val, isValid: action.val.trim().length > 6 }
        }
        if (action.type === "PASSWORD_BLUR") {
            return { value: state.value, isValid: state.value.trim().length > 6 }
        }
        return { value: '', isValid: false }
    }

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    })

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailIsValid && passwordIsValid
            )
            console.log("stop")
        }, 500)
        return () => {
            clearTimeout(identifier)
            console.log("check")
        }
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value })
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_PASSWORD", val: event.target.value })
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "PASSWORD_BLUR" })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            cxt.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus()
        } else {
            passwordInputRef.current.focus()
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    label="E-Mail"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    type="password"
                    label="Password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
          </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
