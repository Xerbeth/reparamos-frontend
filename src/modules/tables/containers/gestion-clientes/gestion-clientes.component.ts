import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { Client } from '@modules/tables/models/clients-response.model';
import { ClientesService } from '@modules/tables/services/clientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'sb-gestion-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './gestion-clientes.component.html',
    styleUrls: ['gestion-clientes.component.scss'],
})
export class GestionClienteComponent implements OnInit {
    
    public clients: Client[] = [];

    constructor(
        protected clientsService: ClientesService,
        private changeDetectorRef: ChangeDetectorRef,
        private modalService: NgbModal
    ) {}
    
    ngOnInit() {
        this.clientsService.getClients$().subscribe({
            next: ({ t }) => this.clients = t,
            error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error'),
            complete: () => {
                this.changeDetectorRef.detectChanges();
            }
        })
    }

    public open(content: TemplateRef<any>) {
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
