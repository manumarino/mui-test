import api from "./api";
import {API_BRANCHES} from "../constants/urls"

/**
 * 
 * @param {object} branch Branch object
 * @param {string} branch.name nombre de la sucursal
 * @param {string} branch.direccion Direccion de la sucursal
 * @param {string} branch.estado Estado donde reside la sucursal
 * @param {string} branch.país Pais donde reside la sucursas
 * @param {string} branch.latitude latitud geografica de la sucursal
 * @param {string} branch.longitude Longitud geografica de la sucursal
 * @param {number} branch.company.id Id de la compania a la cual pertenece la sucursal.
 * @param {number} branch.timeZone Zona Horaria
 * @returns 
 */
export function createBranch(branch){
    return api.post(API_BRANCHES, branch);
}

