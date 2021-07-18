import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Client } from '@modules/tables/models/clients-response.model';
import { ClientesService } from '@modules/tables/services/clientes.service';
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
        protected clientsService: ClientesService
    ) {}
    
    ngOnInit() {
        this.clientsService.getClients$().subscribe({
            next: ({ t }) => this.clients = t,
            error: () => Swal.fire('Error', 'Ha ocurrido un error', 'error')
        })
    }
}
