import api from "./api";
import {API_USERS} from "../constants/urls"

/**
 * Servicio para buscar, crear, modificar y eliminar usuarios
 * Definición del objeto de usuario
 * @param {object} user Objeto Usuario
 * @param {string} user.nombre Nombre del usuario
 * @param {string} user.email Email del usuario
 * @param {string} user.password Contraseña 
 * @returns 
 */

export const user = {
    getAll: async () => (await api.get(API_USERS)).data,
    getById: async (id) => (await api.get(`${API_USERS}/${id}`)).data,
    create: async (user) => (await api.post(API_USERS, user)).data,
    update: async (user) => (await api.put(`${API_USERS}/${user.id}`, user)).data,
    delete: async (id) => (await api.delete(`${API_USERS}/${id}`)).data,
}
