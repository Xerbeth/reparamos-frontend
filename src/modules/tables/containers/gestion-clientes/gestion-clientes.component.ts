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
        id: new FormControl(''),
        documentTypeCode: new FormControl(''),
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
        this.getAllClients();
        this.getAllDocumentTypes();
    }

    public getAllClients(){
        this.clientsService.getClients$().subscribe({
            next: ({ t }) => this.clients = t,
            error: () => Swal.fire('Error al obtener clientes', 'Ha ocurrido un error', 'error')
        });
    }

    public getAllDocumentTypes(){
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
        const { day, month, year } = userData.dateBirth;
        this.clientForm.controls.dateBirth.setValue(
            `${year}-${ month < 10 ? `0${month}` : month }-${ day < 10 ? `0${day}` : day }T12:00:00.000`
        );
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
                        this.clientForm.reset();
                        this.modalService.dismissAll();
                        this.getAllClients();
                    },
                    error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error')
                })
            }
        });
    }

    public deleteForm(client: Client){
        Swal.fire({
            title: '¿ Esta seguro de eliminar el registro ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                this.clientsService.deleteClient$(client).subscribe({
                    next: ({ t, exception }) => {
                        if( !t ){
                            Swal.fire('Error', exception, 'error');
                            return;
                        }
                        Swal.fire('Exito', 'El usuario se ha eliminado satisfactoriamente', 'success');
                        this.getAllClients();
                    },
                    error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error')
                })
            }
        });
    }

    public identify(index:number, item: DocumentNode){
        return item.id; 
    }

    public open(content: TemplateRef<any>, data?: Client) {
        this.clientForm.controls.documentTypeId.setValue( _.head(this.documentTypes)?.id );
        if( data) {
            debugger;
            data.documentTypeId = this.documentTypes.find( item => item.documentTypeCode === data.documentTypeCode)?.id;
            this.clientForm.setValue( data );
        }
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
