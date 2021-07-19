import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Reparamos',
        items: ['dashboard','reparaciones','reportes','clientes'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Inicio',
        link: '/dashboard',
        roleCode: [ 'CLCTR', 'EMPLD' ],
    },
    reparaciones: {
        icon: 'tachometer-alt',
        text: 'Reparaciones',
        link: '/app/reparaciones',
        roleCode: [ 'EMPLD' ],
    },
    reportes: {
        icon: 'tachometer-alt',
        text: 'Reportes',
        link: '/app/reportes',
        roleCode: [ 'EMPLD' ],
    },
    clientes: {
        icon: 'tachometer-alt',
        text: 'Gestion Clientes',
        link: '/app/gestion-clientes',
        roleCode: [ 'CLCTR', 'EMPLD' ],
    },
};
