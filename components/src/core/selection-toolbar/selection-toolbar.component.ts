import { Component, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { isEmptyView } from '../../utils/utils';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'pxb-selection-toolbar',
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-toolbar fxLayout="row" class="pxb-selection-toolbar">
            <div
                #icon
                class="pxb-selection-toolbar-icon-wrapper"
                [class.pxb-selection-toolbar-no-icon]="isIconEmpty(iconEl)"
            >
                <ng-content select="[pxb-nav-icon]"></ng-content>
            </div>
            <div *ngIf="title" class="pxb-selection-toolbar-text-content-container">
                <div class="pxb-selection-toolbar-title mat-title">{{ title }}</div>
                <div
                    *ngIf="subtitle"
                    class="pxb-selection-toolbar-subtitle-container mat-subheading-2"
                    [matMenuTriggerFor]="selectionToolbarMenu"
                    #menuTrigger="matMenuTrigger"
                >
                    <span class="pxb-selection-toolbar-subtitle mat-subheading-2">{{ subtitle }}</span>
                    <mat-icon class="dropdown-arrow" [class.rotated-dropdown-arrow]="menuTrigger.menuOpen"
                        >arrow_drop_down</mat-icon
                    >
                </div>
            </div>
            <pxb-spacer></pxb-spacer>
            <ng-content></ng-content>
            <mat-menu
                #selectionToolbarMenu="matMenu"
                [overlapTrigger]="false"
                class="pxb-selection-toolbar-menu-wrapper"
            >
                <ng-content select="[pxb-toolbar-menu]"></ng-content>
            </mat-menu>
        </mat-toolbar>
    `,
    styleUrls: ['./selection-toolbar.component.scss'],
})
export class SelectionToolbarComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @ViewChild('icon', { static: true }) iconEl: ElementRef;
    @ViewChild('menuTrigger', { static: true }) menuTrigger: MatMenuTrigger;

    isIconEmpty = (el: ElementRef): boolean => isEmptyView(el);
}
