import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-reportes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './reportes.component.html',
    styleUrls: ['reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
