import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';

const FormTorneo = (props) => {
    const token = useSelector(state => state.login.token)
    const permisos = useSelector(state => state.login.permisos);

    const { id } = props.match ? props.match.params : { id: 0 };
    const history = useHistory();

    const [nombre, setNombre] = useState('');
    const [juego, setJuego] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [estado, setEstado] = useState('');
    const [victoria, setVictoria] = useState(0);
    const [empate, setEmpate] = useState(0);
    const [derrota, setDerrota] = useState(0);
    const [idCreador, setIdCreador] = useState(0);

    useEffect(() => {
        if (id === 0) {
            return;
        }
        fetchDatosTorneo(id);
    }, [id]);
    useEffect(() => {
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            history.push('/login');
            return;
        }
        if (!usuarioTienePermisos("insertar torneo", permisos) && !usuarioTienePermisos("actualizar torneo", permisos)) {
            history.push('/login');
            return;
        }
    }, [permisos])
    const fetchDatosTorneo = (id) => {

        const url = 'http://127.0.0.1:8000/api/torneo/' + id + '/';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => {
                console.log('fetchDatosPersona', response.data);
                const objTorneo = response.data[0];
                console.log('objTorneo', objTorneo[0]);

                setNombre(objTorneo.nombre);
                setJuego(objTorneo.juego);
                setModalidad(objTorneo.modalidad);
                setInicio(objTorneo.fechainicio);
                setFin(objTorneo.fechafin);
                setEstado(objTorneo.estado);
                setVictoria(objTorneo.victoria);
                setDerrota(objTorneo.derrota);
                setEmpate(objTorneo.empate);
                setIdCreador(objTorneo.idcreador);
            }).catch(error => {
                // console.log('error', error);
                if (error.response.status === 401) {
                    history.push('/login');
                }
            });
    }

    const enviarDatos = () => {

        const params = {
            "nombre": nombre,
            "juego": juego,
            "modalidad": modalidad,
            "fechainicio": inicio,
            "fechafin": fin,
            "estado": estado,
            "victoria": victoria,
            "derrota": derrota,
            "empate": empate,
            "idcreador": idCreador,
        };
        if (id === 0) {
            insertarTorneo(params);
        } else {
            actualizarTorneo(params);
        }
    }
    const insertarTorneo = (params) => {
        if (!usuarioTienePermisos("insertar torneo", permisos)) {
            alert('Ud no tiene permisos para realizar esta función');
            return;
        }
        const url = 'http://localhost:8000/api/torneo/';
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
    const actualizarTorneo = (params) => {
        if (!usuarioTienePermisos("actualizar torneo", permisos)) {
            alert('Ud no tiene permisos para realizar esta función');
            return;
        }
        const url = 'http://localhost:8000/api/torneo/' + id + '/';
        axios.put(url, params, {
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
                        <Card.Title>Formulario de Torneo</Card.Title>

                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>
                        <div><label>Juego:</label></div>
                        <div><input className="form-control" type="text" value={juego} onChange={(e) => {
                            setJuego(e.target.value);
                        }} /></div>
                        <div><label>Modalidad:</label></div>
                        <div><input className="form-control" type="text" value={modalidad} onChange={(e) => {
                            setModalidad(e.target.value);
                        }} /></div>
                        <div><label>Inicio:</label></div>
                        <div><input className="form-control" type="text" value={inicio} onChange={(e) => {
                            setInicio(e.target.value);
                        }} /></div>
                        <div><label>Fin:</label></div>
                        <div><input className="form-control" type="text" value={fin} onChange={(e) => {
                            setFin(e.target.value);
                        }} /></div>
                        <div><label>Estado:</label></div>
                        <div><input className="form-control" type="text" value={estado} onChange={(e) => {
                            setEstado(e.target.value);
                        }} /></div>
                        {/* <div>
                            <select className="form-select" value={estado} onChange={(e) => {
                                setEstado(e.currentTarget.value);
                            }}>
                                <option value="Abierto">Abierto</option>
                                <option value="Iniciado">Iniciado</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div> */}
                        <div><label>Victoria:</label></div>
                        <div><input className="form-control" type="number" value={victoria} onChange={(e) => {
                            setVictoria(e.target.value);
                        }} /></div>
                        <div><label>Empate:</label></div>
                        <div><input className="form-control" type="number" value={empate} onChange={(e) => {
                            setEmpate(e.target.value);
                        }} /></div>
                        <div><label>Derrota:</label></div>
                        <div><input className="form-control" type="number" value={derrota} onChange={(e) => {
                            setDerrota(e.target.value);
                        }} /></div>
                        <div><label>IdCreador:</label></div>
                        <div><input className="form-control" type="number" value={idCreador} onChange={(e) => {
                            setIdCreador(e.target.value);
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

export default FormTorneo;