import { Injectable } from '@angular/core';
import { GeneralService } from '@modules/utility/services/general.service';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { ClientsResponse } from '../models/clients-response.model';

@Injectable({
    providedIn: 'root'
  })
export class ClientesService {
    
    constructor(private general: GeneralService) {}

    getClients$(): Observable<ClientsResponse> {
        if(environment.mockData){
            return of({
                t: [{
                    id: 1,
                    address: "Carrera 123",
                    fullName: "Herman Andres",
                    documentTypeCode: "123456",
                    document: "123456",
                    dateBirth: "2021-07-18T04:53:15.917Z",
                    phoneNumber: "3137071964"
                }],
                message: "OK",
                exception: "OK",
                status: false
            });
        }
        return this.general.get('api/v1/Persons/GetAllPersons', true);
    }

}
