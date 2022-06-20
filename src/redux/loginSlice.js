import { createSlice } from "@reduxjs/toolkit"

const initialData = {
    token: localStorage.getItem('token'),
    permisos: []
}
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialData,
    reducers: {
        sesionIniciada: (state, action) => {
            const token = action.payload;
            state.token = token
            localStorage.setItem('token', token);
        },
        guardarPermisos: (state, action) => {
            const permisos = action.payload;
            state.permisos = permisos;
        },
        sesionCerrada: (state) => {
            state.token = null
            localStorage.removeItem('token');
        }
    }
});
export const { sesionIniciada, sesionCerrada, guardarPermisos } = loginSlice.actions;

export default loginSlice.reducer;