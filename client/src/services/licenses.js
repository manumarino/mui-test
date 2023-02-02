import api from "./api";
import {API_LICENSES} from "../constants/urls"

/**
 * Servicio para buscar, crear, modificar y eliminar licencias
 * Definición del objecto de licencias 
 * @param {object} license License object
 * @param {string} license.system Nombre de la licencia
 * @param {Date} license.expired_date Fecha de expiracipon de la licencia
 * @param {string} license.details Detalles de la licencia
 * @returns 
 */

// export const license = {
//     getAll: async () => (await api.get(API_LICENSES)).data,
//     getById: async (id) => (await api.get(`${API_LICENSES}/${id}`)).data,
//     create: async (license) => (await api.post(API_LICENSES, license)).data,
//     update: async (license) => (await api.put(`${API_LICENSES}/${license.id}`, license)).data,
//     delete: async (id) => (await api.delete(`${API_LICENSES}/${id}`)).data,
// }


export const license = {
    getAll: async () => {
        return Promise.resolve([
            {
                id: 1,
                name: "licencia"
            }
    ])
    },
    create: async (license) => {
        console.log(license)
        return Promise.resolve(license);
    }
   
}