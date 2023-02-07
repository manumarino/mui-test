import api from "./api";
import {API_LICENSES} from "../constants/urls"

/**
 * Servicio para buscar, crear, modificar y eliminar licencias
 * Definición del objecto de licencias 
 * @param {object} license License object
 * @param {string} license.system Nombre de la licencia
 * @param {Date} license.expired_date Fecha de expiracipon de la licencia
 * @param {string} license.details Detalles de la licencia
 * @param {Object} license.company Compañía a la cual pertenece la sucursal.
 * @param {number} license.company.id Id de la compañía a la cual pertenece la sucursal.
 * @param {Object[]} license.branchesList Array de objetos sucursales
 * @returns 
 */
/*
export const license = {
    getAll: async () => (await api.get(API_LICENSES)).data,
    getById: async (id) => (await api.get(`${API_LICENSES}/${id}`)).data,
    create: async (license) => (await api.post(API_LICENSES, license)).data,
    update: async (license) => (await api.put(`${API_LICENSES}/${license.id}`, license)).data,
    delete: async (id) => (await api.delete(`${API_LICENSES}/${id}`)).data,
}
*/

export const license ={
    getAll: async () => {
        return Promise.resolve([
            {
                id: 2,
                system: "MOBILE",
                expired_date: "1900-01-01T04:16:48.000+00:00",
                details: "oflsienhj",
                company: {
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
                branchesList: [
                    {
                        id: 8,
                        name: "Colegiales",
                        company: {
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
                        direccion: "Virre Loreto 3154687",
                        estado: "Buenos Aires",
                        pais: "Argentina",
                        latitude: "-34.5",
                        longitude: "-55.8",
                        timeZone: "-3"
                    },
                    {
                        id: 10003,
                        name: "gdf",
                        company: {
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
                        direccion: "gds",
                        estado: "gs",
                        pais: "gas",
                        latitude: "fgf",
                        longitude: "kj",
                        timeZone: "-2"
                    }
                ]
            },
            {
                id: 3,
                system: "SURVEY",
                expired_date: "1900-01-05T04:16:48.000+00:00",
                details: "ksjk",
                company: {
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
                branchesList: [
                    {
                        id: 8,
                        name: "Colegiales",
                        company: {
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
                        direccion: "Virre Loreto 3154687",
                        estado: "Buenos Aires",
                        pais: "Argentina",
                        latitude: "-34.5",
                        longitude: "-55.8",
                        timeZone: "-3"
                    },
                    {
                        id: 10003,
                        name: "gdf",
                        company: {
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
                        direccion: "gds",
                        estado: "gs",
                        pais: "gas",
                        latitude: "fgf",
                        longitude: "kj",
                        timeZone: "-2"
                    }, ],
            },
            
        ])
    },
    create: async (license) => {
        console.log(license)
        return Promise.resolve(license);
    }
}