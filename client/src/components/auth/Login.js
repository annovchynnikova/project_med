import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import NewsBar from '../layout/NewsBar';
import SelfMedicine from '../layout/SelfMedicine';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]:e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    }

    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

    return (
        <div className="mydiv">
            <NewsBar/>
            <div className="reg">
                <h1 className="large text-primary login-text">Увійти</h1>
                <form className="form" onSubmit={ e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="username"
                            value={username}
                            onChange={e=> onChange(e)}
                            required />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e=> onChange(e)}
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login"/>
                </form>
                <p className="my-1">
                    Не зареєстрований?<Link to="/register">Реєстрація</Link>
                </p>
            </div>
            <SelfMedicine/>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);