import api from "./api";
import {API_MOBILE_CONNECTION} from "../constants/urls"

/**
 * Servicio para buscar, crear, modificar y eliminar conexiones móbiles
 * Definición del objecto de sucursales 
 * @param {object} mobileConnection Mobile-connection object
 * @param {string} mobileConnection.urlMobile 
 * @param {object} mobileConnection.surveyCompany
 * @param {number} mobileConnection.surveyCompany.id
 * @param {string} mobileConnection.userMobile  
 * @param {string} mobileConnection.passwordMobile
 * @param {string} mobileConnection.tokenMobile
 * @returns 
 */
/*
export const mobileConnection = {
    getAll: async () => (await api.get(API_MOBILE_CONNECTION)).data,
    getById: async (id) => (await api.get(`${API_MOBILE_CONNECTION}/${id}`)).data,
    create: async (mobileConnection) => (await api.post(API_MOBILE_CONNECTION, mobileConnection)).data,
    update: async (mobileConnection) => (await api.put(`${API_MOBILE_CONNECTION}/${mobileConnection.id}`, mobileConnection)).data,
    delete: async (id) => (await api.delete(`${API_MOBILE_CONNECTION}/${id}`)).data,
}
*/

export const mobileConnection ={
    getAll: async () => {
        return Promise.resolve([
            {
                id: 1,
                urlMobile: "mobile.io",
                surveyCompany:  {
                    id: 1,
                    name: "Algo",
                    logo: "/src/Mariano/Tupacamaru",
                    dominio: "tupacamaru.com",
                    extension: "tupacamaru",
                    debqUrl: "http://localhost:8974",
                    debqUser: "lucas",
                    debqPassword: "TUPACAMARU",
                    timeZone: "+1"
                },
                userMobile: "Pirulo",
                passwordMobile: "$2akjfrkuWFKUHcualquieraFERHerflwirefkwuhebmGR421qT5nLz1NJfUK",
                tokenMobile: "$394cualquiera85f8ojferwlewdl",
            },
            
        ])
    },
    create: async (mobileConnection) => {
        console.log(mobileConnection)
        return Promise.resolve(mobileConnection);
    }
}
