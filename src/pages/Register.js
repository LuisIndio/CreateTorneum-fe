import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Register = () => {

    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');


    const enviarDatos = () => {

        const params = {
            "name": nombre,
            "email": email,
            "password": contraseña,
        };

        insertarUsuario(params);

    }
    const insertarUsuario = (params) => {
        const url = 'http://127.0.0.1:8000/api/register';
        axios.post(url, params
        ).then(response => {
            console.log('recibido', response.data);
            history.push('/login');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
            }
        });
    }
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Formulario de Registro</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>
                        <div><label>email:</label></div>
                        <div><input className="form-control" type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} /></div>
                        <div><label>Contraseña:</label></div>
                        <div><input className="form-control" type="password" value={contraseña} onChange={(e) => {
                            setContraseña(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}


export default Register;
