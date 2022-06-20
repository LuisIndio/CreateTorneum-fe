import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sesionCerrada } from '../redux/loginSlice';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const permisos = useSelector(state => state.login.permisos);
    const token = useSelector(state => state.login.token);
    const [permisoMostrarPersona, setPermisoMostrarPersona] = useState(false);
    const [permisoInsertarPersona, setPermisoInsertarPersona] = useState(false);
    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
    }, [token])
    useEffect(() => {
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            return;
        }
        setPermisoMostrarPersona(usuarioTienePermisos("mostrar torneos", permisos));
        setPermisoInsertarPersona(usuarioTienePermisos("insertar torneo", permisos));

    }, [permisos])
    const cerrarSesion = () => {
        dispatch(sesionCerrada());
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Proyecto Final</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Link className="nav-link" to="/torneo">Torneo</Link>

                    {token &&
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/">Home</Link>

                            {(permisoInsertarPersona || permisoMostrarPersona) ? <NavDropdown title="Torneos" id="basic-nav-dropdown">
                                {permisoMostrarPersona && <Link className="dropdown-item" to="/torneo">Lista de Torneo</Link>}
                                {permisoInsertarPersona && <Link className="dropdown-item" to="/torneo/create">Crear Torneo</Link>}
                            </NavDropdown> : ""}
                            <button className="btn btn-link" onClick={cerrarSesion}>Cerrar sesión</button>
                        </Nav>}
                    {!token && <Nav className="me-auto">
                        <Link className="nav-link" to="/login">Iniciar sesión</Link>
                        <Link className="nav-link" to="/registrarse">Registrarse</Link>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}

export default Header;