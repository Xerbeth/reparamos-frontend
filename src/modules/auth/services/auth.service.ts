import { Injectable } from '@angular/core';
import { GeneralService } from '@modules/utility/services/general.service';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable()
export class AuthService {
    
    constructor(private general: GeneralService) {}

    getAuth$(dataForm: LoginRequest): Observable<LoginResponse> {
        if(environment.mockData){
            return of({
                t: {
                    access: true,
                    roleCode: "CLCTR"
                },
                message: "OK",
                exception: "OK",
                status: false
            });
        }
        return this.general.post('api/v1/users/validateLogin', {
            ...dataForm
        });
    }

}
