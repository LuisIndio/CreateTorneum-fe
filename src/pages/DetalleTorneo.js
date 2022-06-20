import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const DetalleTorneo = (props) => {
    console.log(useParams())
    const { id } = useParams()
    //  const { id } = props.match ? props.match.params : { id: 0 };

    const [detalle, setDetalle] = useState('');
    const [participantes, setParticipantes] = useState([]);


    useEffect(() => {
        obtenerListaTorneo();
    }, [id]);

    const obtenerListaTorneo = () => {
        axios.get(`http://localhost:8000/api/torneo/${id}`
        ).then(response => {
            console.log('response', response.data);
            const objTorneo = response.data[0];

            setDetalle(objTorneo);
            setParticipantes(objTorneo.participantes);
        }).catch(error => {
            // console.log('error', error);
            if (error.response.status === 401) {
            }
        });
    }
    return (
        <div>
            <h1>ID</h1>
            <h3>{detalle.id}</h3>
            <h1>Nombre</h1>
            <h3>{detalle.nombre}</h3>
            <h1>Juego</h1>
            <h3>{detalle.juego}</h3>
            <h1>Juego</h1>
            <h3>{detalle.estado}</h3>
            <h1>FechaInicio</h1>
            <h3>{detalle.fechainicio}</h3>

            <h1>Participantes</h1>
            {participantes.map((item) => (
                <h3 key={item.id}>{item.nombre}</h3>
            )
            )}
            <td>
                <Link className="btn btn-primary" to={"/participante/create"}>Agregar Participantes</Link>
            </td>
            <td>
                <Link className="btn btn-primary" to={"/torneoparticipante/create"}>Agregar Participantes Torneo</Link>
            </td>
        </div>
    );
}

export default DetalleTorneo;