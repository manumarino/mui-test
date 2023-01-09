import api from "./api";
import {API_COMPANIES} from "../constants/urls"

/**
 * 
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
export function createCompany(company){
    return api.post(API_COMPANIES, company);
}