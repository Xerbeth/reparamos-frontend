import { Injectable } from '@angular/core';
import { LocalStorageService } from '@modules/utility/services/session-storage.service';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {

    constructor(
        protected session: LocalStorageService) {
        const data = this.session.loadInfo('authData') as User;
        this.user = {
            user: data.user,
            roleCode: data.roleCode
        };
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
