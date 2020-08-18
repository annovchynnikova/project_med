import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to="/dashboard">Мій профіль</Link></li>
            <li><a onClick={logout} href="#!">Вийти</a></li>        
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/register">Реєстрація</Link></li>
            <li><Link to="/login">Вхід</Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            <h1>
                <Link to="/"><img alt="logo" src={logo} style={{height: '40px', width: '40px', position: 'absolute'}}/></Link>
            </h1>
                <Link to="/alphabet">Пошук за алфавітом</Link>
                <Link to="/news">Новини</Link>
                <Link to="/contacts">Контакти</Link>
            
                { !loading && (<div>{ isAuthenticated ? authLinks : guestLinks }</div>) }
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);