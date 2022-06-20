export const usuarioTienePermisos = (nombrePermiso, permisos) => {
    const permiso = permisos.filter(item => item.name === nombrePermiso);
    return (permiso.length > 0);
}