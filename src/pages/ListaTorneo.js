import axios from 'axios';
/* import moment from 'moment';
 */import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';

const ListaTorneo = () => {
    const token = useSelector(state => state.login.token)
    const permisos = useSelector(state => state.login.permisos);
    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        obtenerListaTorneos();
    }, []);
    useEffect(() => {
        /* if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            history.push('/login');
            return;
        }
        if (!usuarioTienePermisos("mostrar torneos", permisos)) {
            history.push('/login');
            return;
        } */
    }, [permisos])

    const obtenerListaTorneos = () => {
        setCargando(true);
        axios.get('http://127.0.0.1:8000/api/torneo/'
        ).then(response => {
            console.log('response', response.data);
            setLista(response.data);
            setCargando(false);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
                history.push('/login');
            }
        });
    }
    const eliminarTorneo = (id) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://localhost:8000/api/torneo/' + id + '/';
        axios.delete(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            obtenerListaTorneos();
        }).catch(error => {
            console.log(error);
        });
    }
    return <div>
        {cargando === true && <h1>Cargando...</h1>}
        {cargando === false &&
            <Card className="mt-3">

                <Card.Body>
                    <Card.Title>Torneos</Card.Title>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>juego</th>
                                <th>estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map(item =>
                                <tr key={"item-" + item.id}>
                                    <td>{item.id}</td>
                                    <td><Link to={"detallepelicula/"+item.id}>{item.nombre}</Link></td>
                                    <td>{item.juego}</td>
                                    <td>{item.estado}</td>
                                    
                                    {usuarioTienePermisos("actualizar torneo", permisos) &&
                                        <td>
                                            <Link className="btn btn-primary" to={"/torneo/edit/" + item.id}>Editar</Link>
                                        </td>
                                    }
                                    {usuarioTienePermisos("eliminar torneo", permisos) && <td>
                                        <button className="btn btn-danger" onClick={() => { eliminarTorneo(item.id) }}>Eliminar</button>
                                    </td>}
                                </tr>
                            )}

                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        }
    </div >;
}

export default ListaTorneo;