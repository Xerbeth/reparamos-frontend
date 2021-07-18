import { Injectable } from '@angular/core';
import { GeneralService } from '@modules/utility/services/general.service';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { Client, ClientsResponse } from '../models/clients-response.model';
import { CreateClientResponse } from '../models/create-client-response.model';
import { DocumentsResponse } from '../models/documents-response.model';

@Injectable({
    providedIn: 'root'
  })
export class ClientesService {
    
    constructor(private general: GeneralService) {}

    /**
     * Servicio para obtener todos los clientes
     * @returns {Observable<ClientsResponse>}
     * @memberof ClientesService
     */
    getClients$(): Observable<ClientsResponse> {
        if(environment.mockData){
            return of({
                t: [{
                    id: 2,
                    address: "CRA 12 #14-78",
                    documentTypeCode: "CC",
                    surname: "torres",
                    firstName: "faiber",
                    document: "1121882187",
                    secondName: "",
                    dateBirth: "1991-07-18T14:29:44.000+00:00",
                    phoneNumber: "3136944166",
                    secondSurname: "OLAYA"
                }],
                message: "OK",
                exception: "OK",
                status: false
            });
        }
        return this.general.get('api/v1/Persons/GetAllPersons', true);
    }

    /**
     * Servicio para obtener todos los tipos de documento
     * @returns {Observable<ClientsResponse>}
     * @memberof ClientesService
     */
    public getDocumentTypes$() : Observable<DocumentsResponse> {
        if(environment.mockData){
            return of({
                t: [
                  {
                    id: 1,
                    documentType: "Cédula de ciudadanía",
                    documentTypeCode: "CC"
                  },
                  {
                    id: 2,
                    documentType: "Tarjeta de extranjería",
                    documentTypeCode: "CE"
                  }
                ],
                message: "Transacción realizada correctamente.",
                exception: "",
                status: true
            });
        }
        return this.general.get('api/v1/documentTypes/findAllDocumentType', true);
    }

    /**
     * Servicio para crear un cliente a partir de la carga util
     * @returns {Observable<ClientsResponse>}
     * @memberof ClientesService
     */
    public createClient$( dataForm: Client ) : Observable<CreateClientResponse> {
        if(environment.mockData){
            return of({
                t: true,
                message: "OK",
                exception: "OK",
                status: false
            });
        }
        return this.general.post('api/v1/Transactions/CreatePerson', {
            ...dataForm
        });
    }

    /**
     * Servicio para actualizar el cliente a partir de una carga util
     * @returns {Observable<ClientsResponse>}
     * @memberof ClientesService
     */
    public updateClient$( dataForm: Client ) : Observable<CreateClientResponse> {
        if(environment.mockData){
            return of({
                t: true,
                message: "OK",
                exception: "OK",
                status: false
            });
        }
        return this.general.put('api/v1/Persons/UpdatePerson', {
            ...dataForm
        });
    }

    /**
     * Servicio para eliminar el cliente a partir de una carga util
     * @returns {Observable<ClientsResponse>}
     * @memberof ClientesService
     */
    public deleteClient$( client: Client ) : Observable<CreateClientResponse> {
        if(environment.mockData){
            return of({
                t: true,
                message: "OK",
                exception: "OK",
                status: false
            });
        }
        return this.general.delete(`api/v1/Persons/DeletePerson/${ client.id }`);
    }
}
