import { Injectable } from '@angular/core';
import { GeneralService } from '@modules/utility/services/general.service';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable()
export class AuthService {
    
    constructor(private general: GeneralService) {}

    getAuth$(dataForm: LoginRequest): Observable<LoginResponse> {
        return this.general.post('/api/v1/users/validateLogin', {
            ...dataForm
        });
    }

}
