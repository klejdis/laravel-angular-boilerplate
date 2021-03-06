import { Component, OnInit } from '@angular/core';
import { Injectable} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

//ag grid
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreType,
  IGetRowsParams,
  IServerSideGetRowsParams
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {GridApi} from "ag-grid-community/dist/lib/gridApi";
import {DynamicComponentRendererComponent} from "../../../services/aggrid/dynamic-component/dynamic-component-renderer/dynamic-component-renderer.component";
import {ActionLinkComponent} from "../../../services/aggrid/action-link/action-link.component";
import {DynamicCmpConfig} from "../../../services/aggrid/dynamic-component/dynamic-component-renderer/dynamic-cmp-config";

import {NotificationService} from "../../../services/toastr/notification.service";
import {RolesService} from "../roles.service";

@Injectable()
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Id' },
    { field: 'name', headerName: 'Name' },
    { field: 'slug',headerName: 'Slug' },
    { field: 'created_at', headerName: 'Created At'},
    {
      headerName: 'Actions',
      field: '',
      cellRenderer: DynamicComponentRendererComponent,
      cellRendererParams: {
        dynamicComponentConfig: (param: any): DynamicCmpConfig => {
          return {
            components: [
              {
                component: ActionLinkComponent,
                data: {
                  data:  param.data,
                  routerLink: ['/roles', param.data?.id, 'edit'],
                  icon: 'cil-pencil',
                }
              },
              {
                component: ActionLinkComponent,
                data: {
                  data:  param.data,
                  icon: 'cil-trash',
                  confirm: true,
                  listeners:{
                    handleClick: (component: DynamicComponentRendererComponent) => {
                      component.clickEvent.subscribe( (event: any) => {
                        this.deleteResource(event);
                      });
                    }
                  }
                }
              }
            ],
          }
        }
      },
    },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };

  public rowModelType = 'infinite';
  public serverSideStoreType: ServerSideStoreType = 'partial';
  public paginationPageSize = 10;
  public cacheBlockSize = 10;

  public rowData!: any[];

  private gridApi: GridApi;

  public placeholder:string = "Search Roles";
  private searchTerm: string;


  constructor(
    private roleService: RolesService,
    private toastr: NotificationService,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.loadGridData(params);
  }
  loadGridData(params: GridReadyEvent){
    this.gridApi = params.api;

    const datasource = {
      // called by the grid when more rows are required
      getRows: (params: IGetRowsParams) => {
        // get data for request from server
        this.roleService.getRoles(this.gridApi.paginationGetCurrentPage() + 1, {
          params: params,
          search: this.searchTerm
        })
          .subscribe((data:any) => {
            params.successCallback( data.data, data.meta.total );
          });
      }

    }

    params.api!.setDatasource(datasource);
  }

  deleteResource(data: any){
    this.roleService.delete(data.data.id)
      .subscribe({
        next: (data: any) => {
          if (!data.errors){
            this.gridApi.refreshInfiniteCache();

            this.toastr.showSuccess('User Deleted','');
          }
        },
        error: (data:any) => {
          this.toastr.showError(data?.error.message,'');
        }
      });

  }

  onSearch($event: any) {
    this.gridApi.refreshInfiniteCache();
  }

  onInput(term: string) {
    this.searchTerm = term;
    this.gridApi.refreshInfiniteCache();
  }

}
