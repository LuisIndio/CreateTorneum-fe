import React from 'react'
import { Route, Switch } from 'react-router';
import DetallePelicula from '../pages/DetalleTorneo';
import FormParticipanteTorneo from '../pages/FormParticipanteTorneo';
import FormParticipante from '../pages/FormParticipante';
import FormPersona from '../pages/FormTorneo';
import ListaPersonas from '../pages/ListaTorneo';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DetalleTorneo from '../pages/DetalleTorneo';
import FormTorneo from '../pages/FormTorneo';
const RouterConfig = () => {
    return (
        <Switch>
            <Route path="/registrarse" exact>
                <Register />
            </Route>
            <Route path="/torneoparticipante/create">
                <FormParticipanteTorneo />
            </Route>
            <Route path="/detallepelicula/:id">
                <DetalleTorneo/>
            </Route>
            <Route path="/torneo/create">
                <FormTorneo />
            </Route>
            <Route path="/participante/create">
                <FormParticipante />
            </Route>
            <Route path="/torneo/edit/:id" component={FormPersona}>
            </Route>
            <Route path="/torneo" exact>
                <ListaPersonas />
            </Route>
            <Route path="/login" exact>
                <Login />
            </Route>
            
            <Route path="/">
                <ListaPersonas />
            </Route>
        </Switch>
    );
}

export default RouterConfig;