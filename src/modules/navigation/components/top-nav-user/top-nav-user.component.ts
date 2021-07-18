import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@modules/auth/services';
import { LocalStorageService } from '@modules/utility/services/session-storage.service';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    
    constructor(
        public userService: UserService,
        protected session: LocalStorageService,
        private router: Router
    ) {}
    
    ngOnInit() {}

    public closeSession(){
        this.session.clearInfo('authData');
        this.router.navigate(['/auth/login']);
    }
}
