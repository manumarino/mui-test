import api from "./api";
import {API_COMPANIES} from "../constants/urls"

/**
 * Servicio para buscar, crear, modificar y eliminar compañías
 * Definición del objeto de compañía
 * @param {object} company Company object
 * @param {string} company.name Nombre de la compañía
 * @param {string} company.logo Url del logo de la compañía
 * @param {string} company.dominio Domino de la compañía
 * @param {string} company.extension Extension de la compañía
 * @param {string} company.debqUrl URL para la conexión con debQ de la compañía
 * @param {string} company.debqUser Usuario para la conexión con debQ de la compañía
 * @param {string} company.debqPassword Contraseña para la conexión con debQ de la compañía
 * @param {number} company.timeZone Zona Horaria
 * @param {array} company.branchList Lista de Sucursales
 * @returns 
 */

export const company = {
    getAll: async () => (await api.get(API_COMPANIES)).data,
    getById: async (id) => (await api.get(`${API_COMPANIES}/${id}`)).data,
    create: async (company) => (await api.post(API_COMPANIES, company)).data,
    update: async (company) => (await api.put(API_COMPANIES, company)).data,
    delete: async (id) => (await api.delete(`${API_COMPANIES}/${id}`)).data,
}