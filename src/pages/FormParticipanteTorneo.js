import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';

const FormParticipanteTorneo = () => {
    const token = useSelector(state => state.login.token)
    const permisos = useSelector(state => state.login.permisos);

    const history = useHistory();

    const [torneo_id, setTorneo_id] = useState(0);
    const [participantes_id, setParticipantes_id] = useState(0);
    const [lista, setLista] = useState([]);


    useEffect(() => {
        obtenerListaParticipantes();
    }, []);
    useEffect(() => {
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            history.push('/login');
            return;
        }
        if (!usuarioTienePermisos("agregar participantes torneos", permisos) ) {
            history.push('/login');
            return;
        }
    }, [permisos])

    const obtenerListaParticipantes = () => {
        axios.get('http://127.0.0.1:8000/api/participante'
        ).then(response => {
            console.log('response', response.data);
            setLista(response.data);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }

    const enviarDatos = () => {
        const params = {
            "torneo_id": torneo_id,
            "participantes_id": participantes_id,
        };
            insertarParticipanteTorneo(params);

    }
    
    const insertarParticipanteTorneo = (params) => {
        if (!usuarioTienePermisos("agregar participantes torneos", permisos)) {
            alert('Ud no tiene permisos para realizar esta función');
            return;
        }
        const url = 'http://127.0.0.1:8000/api/torneoparticipante';
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
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(item =>
                                <tr key={"item-" + item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                        <Card.Title>Formulario de Participante</Card.Title>

                        <div><label>torneo_id:</label></div>
                        <div><input className="form-control" type="text" value={torneo_id} onChange={(e) => {
                            setTorneo_id(e.target.value);
                        }} /></div>
                        <div><label>participantes_id:</label></div>
                        <div><input className="form-control" type="text" value={participantes_id} onChange={(e) => {
                            setParticipantes_id(e.target.value);
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

export default FormParticipanteTorneo;