import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '@modules/tables/models/clients-response.model';
import { DocumentNode } from '@modules/tables/models/documents-response.model';
import { ClientesService } from '@modules/tables/services/clientes.service';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
            title: "Crear Cliente",
            success: 'El usuario se ha creado satisfactoriamente'
        },
        update: {
            title: "Actualizar Cliente",
            success: 'El usuario se ha creado satisfactoriamente'
        }
    };
    public modalLabels = this.modalLabelsList.create;

    public clientForm = new FormGroup({
        id: new FormControl(''),
        documentTypeCode: new FormControl(''),
        firstName: new FormControl('', [ Validators.required, Validators.maxLength(15) ]),
        secondName: new FormControl('', [ Validators.maxLength(15) ]),
        surname: new FormControl('', [ Validators.required ]),
        secondSurname: new FormControl('', [ Validators.maxLength(15) ] ),
        documentTypeId: new FormControl('', [ Validators.required ]),
        document: new FormControl('', [ Validators.required ]),
        dateBirth: new FormControl('', [ Validators.required ]),
        phoneNumber: new FormControl('', [ Validators.required, Validators.maxLength(15) ]),
        address: new FormControl('', [ Validators.required, Validators.maxLength(50) ]),
    });

    constructor(
        protected clientsService: ClientesService,
        private modalService: NgbModal
    ) {}
    
    ngOnInit() {
        this.getAllClients();
        this.getAllDocumentTypes();
    }

    /**
     * Obtiene todos los clientes
     * @memberof GestionClienteComponent
     */
    public getAllClients(): void {
        this.clientsService.getClients$().subscribe({
            next: ({ t }) => this.clients = t,
            error: () => Swal.fire('Error al obtener clientes', 'Ha ocurrido un error', 'error')
        });
    }

    /**
     * Obtiene todos los tipos de documento
     * @memberof GestionClienteComponent
     */
    public getAllDocumentTypes(): void{
        this.clientsService.getDocumentTypes$().subscribe({
            next: ({ t }) => this.documentTypes = t,
            error: () => Swal.fire('Error al obtener documentos', 'Ha ocurrido un error', 'error')
        });      
    }

    /**
     * Envia el formulario de creacion / Actualizacion de un cliente
     * @returns
     * @memberof GestionClienteComponent
     */
    public sendForm(){
        if(this.clientForm.invalid){
            Swal.fire('Error', 'Hay campos incorrectos', 'error');
            return;
        }
        Swal.fire({
            title: '¿ Esta seguro de almacenar los cambios ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Guardar`,
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                const userData = this.clientForm.getRawValue();
                const { day, month, year } = userData.dateBirth;
                this.clientForm.controls.dateBirth.setValue(
                    `${year}-${ month < 10 ? `0${month}` : month }-${ day < 10 ? `0${day}` : day }T12:00:00.000`
                );
                const clientTransaction = _.isEmpty(this.clientForm.controls.id.value) ? 
                                          this.clientsService.createClient$(this.clientForm.getRawValue()) :
                                          this.clientsService.updateClient$(this.clientForm.getRawValue());

                clientTransaction.subscribe({
                    next: ({ t, exception }) => {
                        if( !t ){
                            Swal.fire('Error', exception, 'error');
                            return;
                        }
                        Swal.fire('Exito', this.modalLabels.success, 'success');
                        this.clientForm.reset();
                        this.modalService.dismissAll();
                        this.getAllClients();
                    },
                    error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error')
                })
            }
        });
    }

    /**
     * Despliega el modal para eliminacion de cliente
     * @param {Client} client
     * @memberof GestionClienteComponent
     */
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

    /**
     * Organiza los datos para iterar los clientes en el ngFor
     * @param {number} index
     * @param {DocumentNode} item
     * @returns
     * @memberof GestionClienteComponent
     */
    public identify(index:number, item: DocumentNode){
        return item.id; 
    }

    /**
     * Despliega el modal para creacion / actualizacion de cliente
     * @param {Client} client
     * @memberof GestionClienteComponent
     */
    public open(content: TemplateRef<any>, data?: Client) {
        const clientData = _.cloneDeep(data);
        this.clientForm.controls.documentTypeId.setValue( _.head(this.documentTypes)?.id );
        if( clientData ) {
            clientData.documentTypeId = this.documentTypes.find( item => item.documentTypeCode === clientData.documentTypeCode)?.id;
            const birth = new Date(`${clientData.dateBirth}`);
            clientData.dateBirth = new NgbDate( birth.getFullYear(), birth.getMonth(), birth.getDate() );
            this.clientForm.setValue( clientData );
        }
        this.modalLabels = clientData ? this.modalLabelsList.update : this.modalLabelsList.create;
        this.modalService.open(content, { 
            ariaLabelledBy: 'modal-basic-title', 
            windowClass: 'reparamos-modal' 
        }).result.then(
            (result) => this.clientForm.reset(), 
            (reason) => this.clientForm.reset()
        );
    }
}
