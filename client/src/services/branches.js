import api from "./api";
import {API_BRANCHES} from "../constants/urls"

/**
 * Servicio para buscar, crear, modificar y eliminar sucursales
 * Definición del objecto de sucursales 
 * @param {object} branch Branch object
 * @param {string} branch.name nombre de la sucursal
 * @param {string} branch.direccion Dirección de la sucursal
 * @param {string} branch.estado Estado donde reside la sucursal
 * @param {string} branch.pais País donde reside la sucursal
 * @param {string} branch.latitude latitud geográfica de la sucursal
 * @param {string} branch.longitude Longitud geográfica de la sucursal
 * @param {Object} branch.company Compañía a la cual pertenece la sucursal.
 * @param {number} branch.company.id Id de la compañía a la cual pertenece la sucursal.
 * @param {string} branch.timeZone Zona Horaria
 * @returns 
 */

export const branch = {
    getAll: async () => (await api.get(API_BRANCHES)).data,
    getById: async (id) => (await api.get(`${API_BRANCHES}/${id}`)).data,
    create: async (branch) => (await api.post(API_BRANCHES, branch)).data,
    update: async (branch) => (await api.put(`${API_BRANCHES}/${branch.id}`, branch)).data,
    delete: async (id) => (await api.delete(`${API_BRANCHES}/${id}`)).data,
}
