import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-gestion-clientes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './gestion-clientes.component.html',
    styleUrls: ['gestion-clientes.component.scss'],
})
export class GestionClienteComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
