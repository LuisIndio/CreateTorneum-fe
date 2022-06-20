import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';

const FormParticipante = () => {
    const token = useSelector(state => state.login.token)
    const permisos = useSelector(state => state.login.permisos);

    const history = useHistory();

    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            history.push('/login');
            return;
        }
        if (!usuarioTienePermisos("insertar participante", permisos) ) {
            history.push('/login');
            return;
        }
    }, [permisos])

    const enviarDatos = () => {

        const params = {
            "nombre": nombre,
        };
            insertarParticipante(params);

    }
    const insertarParticipante = (params) => {
        if (!usuarioTienePermisos("insertar participante", permisos)) {
            alert('Ud no tiene permisos para realizar esta función');
            return;
        }
        const url = 'http://127.0.0.1:8000/api/participante';
        axios.post(url, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            console.log('recibido', response.data);
            history.push('/torneo');
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }

    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">

                    <Card.Body>
                        <Card.Title>Formulario de Participante</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
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

export default FormParticipante;