import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { LocalStorageService } from '@modules/utility/services/session-storage.service';
import { User } from '@testing/mocks';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(
        public navigationService: NavigationService, 
        public userService: UserService,
        protected session: LocalStorageService,
    ) {}

    ngOnInit() {}
    
    isRoleContains(roleCodes: string[] | undefined){
        const userData = this.session.loadInfo('authData') as User;
        return roleCodes?.includes(userData.roleCode);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
