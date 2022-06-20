import React, { useState } from 'react'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { guardarPermisos, sesionIniciada } from '../redux/loginSlice';
const Login = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const enviarLogin = () => {

        const url = 'http://127.0.0.1:8000/api/login';
        const params = {
            email,
            password
        }
        axios.post(url, params)
            .then(response => {
                console.log('recibido', response.data);
                const token = response.data.access_token;
                dispatch(sesionIniciada(token))
                obtenerPermisos(token);
            }).catch(error => {
                console.log(error);
            });
    }
    const obtenerPermisos = (token) => {
        const url = 'http://127.0.0.1:8000/api/user';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                const roles = response.data.roles;
                console.log(roles);
                let permisos = [];
                roles.forEach(rol => {
                    const permissions = rol.permissions.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    });
                    permissions.forEach(permiso => {
                        if(!permisos.includes(permiso)){
                            permisos.push(permiso);
                        }
                    });
                });
                dispatch(guardarPermisos(permisos))

                history.push('/torneo');
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Iniciar Sesión</Card.Title>

                        <div><label>Email:</label></div>
                        <div><input className="form-control" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>
                        <div><label>Contraseña:</label></div>
                        <div><input className="form-control" type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={enviarLogin}>
                            Iniciar Sesión
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;