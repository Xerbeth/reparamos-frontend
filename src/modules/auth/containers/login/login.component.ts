import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import Swal from 'sweetalert2';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    
    public userForm = new FormGroup({
        user: new FormControl('', [ Validators.required ]),
        pwd: new FormControl('', [ Validators.required ]),
    });

    constructor(
        protected auth: AuthService,
        private router: Router
    ) {}
    
    ngOnInit() {}

    public authUser(){
        const loginData = this.userForm.getRawValue();
        this.auth.getAuth$(loginData).subscribe({
            next: ({ t }) => {
                if( !t.access ){
                    Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error');
                }
                this.router.navigate(['/dashboard']);
            },
            error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error')
        })
    }
}
