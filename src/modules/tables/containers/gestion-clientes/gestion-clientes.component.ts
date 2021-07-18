import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '@modules/tables/models/clients-response.model';
import { DocumentNode } from '@modules/tables/models/documents-response.model';
import { ClientesService } from '@modules/tables/services/clientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
    selector: 'sb-gestion-clientes',
    templateUrl: './gestion-clientes.component.html',
    styleUrls: ['gestion-clientes.component.scss'],
})
export class GestionClienteComponent implements OnInit {
    
    public clients: Client[] = [];
    public documentTypes: DocumentNode[] = [];
    public modalLabelsList = {
        create: {
            title: "Crear Cliente"
        },
        update: {
            title: "Actualizar Cliente"
        }
    };
    public modalLabels = this.modalLabelsList.create;

    public clientForm = new FormGroup({
        firstName: new FormControl('', [ Validators.required ]),
        secondName: new FormControl('', [ Validators.required ]),
        surname: new FormControl('', [ Validators.required ]),
        secondSurname: new FormControl('', [ Validators.required ]),
        documentTypeId: new FormControl('', [ Validators.required ]),
        document: new FormControl('', [ Validators.required ]),
        dateBirth: new FormControl('', [ Validators.required ]),
        phoneNumber: new FormControl('', [ Validators.required ]),
        address: new FormControl('', [ Validators.required ]),
    });

    constructor(
        protected clientsService: ClientesService,
        private modalService: NgbModal
    ) {}
    
    ngOnInit() {
        this.clientsService.getClients$().subscribe({
            next: ({ t }) => this.clients = t,
            error: () => Swal.fire('Error al obtener clientes', 'Ha ocurrido un error', 'error')
        });
        this.clientsService.getDocumentTypes$().subscribe({
            next: ({ t }) => this.documentTypes = t,
            error: () => Swal.fire('Error al obtener documentos', 'Ha ocurrido un error', 'error')
        });
    }

    public sendForm(){
        if(this.clientForm.invalid){
            Swal.fire('Error', 'Hay campos incorrectos', 'error');
            return;
        }
        const userData = this.clientForm.getRawValue();
        Swal.fire({
            title: '¿ Esta seguro de almacenar los cambios ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Guardar`,
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                this.clientsService.createClient$(userData).subscribe({
                    next: ({ t, exception }) => {
                        if( !t ){
                            Swal.fire('Error', exception, 'error');
                            return;
                        }
                        Swal.fire('Exito', 'El usuario se ha creado satisfactoriamente', 'success');
                        this.clients.push(userData);
                    },
                    error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error')
                })
            }
        })
    }

    public identify(index:number, item: DocumentNode){
        return item.id; 
    }

    public open(content: TemplateRef<any>, data?: any) {
        this.clientForm.controls.documentTypeId.setValue( _.head(this.documentTypes)?.id );
        this.modalLabels = data ? this.modalLabelsList.update : this.modalLabelsList.create;
        this.modalService.open(content, { 
            ariaLabelledBy: 'modal-basic-title', 
            windowClass: 'reparamos-modal' 
        }).result.then(
            (result) => {
                console.warn(`Closed with: ${result}`);
            }, (reason) => {
                console.warn(`dissmised: ${reason}`)
            }
        );
    }
}
