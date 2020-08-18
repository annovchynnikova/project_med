import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import NewsBar from '../layout/NewsBar';
import SelfMedicine from '../layout/SelfMedicine';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { username, email, password, passwordConfirm } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]:e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== passwordConfirm){
            // msg & alertType -> actions/setAlert
            setAlert('Паролі не співпадають', 'danger');
        }
        else{
            register({ username, email, password });
        }
    }

    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

    return (
        <div className="mydiv">
            <NewsBar/>
            <div className="reg">
                <h1 className="large text-primary">Реєстрація</h1>
                <p className="lead">Створити акаунт</p>
                <form className="form" onSubmit={ e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="username"
                            value={username}
                            onChange={e=> onChange(e)}
                            required
                            />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e=> onChange(e)}
                            />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e=> onChange(e)}
                        required
                        minLength='6'
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={e=> onChange(e)}
                        required
                        minLength='6'
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Уже зареєстровані?<Link to="/login">Увійти</Link>
                </p>
            </div>
            <SelfMedicine/>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);