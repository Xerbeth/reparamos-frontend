import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '@modules/utility/services/session-storage.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppCommonGuard implements CanActivate {
    
    constructor(
        protected session: LocalStorageService,
        private router: Router
    ) { }

    canActivate(): boolean {
        const sessionData = this.session.loadInfo('authData');
        if(!sessionData){
           this.router.navigate(['/auth/login']); 
        }
        return !!sessionData;
    }
}
