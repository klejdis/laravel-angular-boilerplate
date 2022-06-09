import {Component, EventEmitter, OnInit} from '@angular/core';
import { Injectable} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import {UsersService} from "../users.service";

//ag grid
import {
  ColDef,
  GridReadyEvent,
  ServerSideStoreType,
  IGetRowsParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {GridApi} from "ag-grid-community/dist/lib/gridApi";
import {DynamicComponentRendererComponent} from "../../../services/aggrid/dynamic-component/dynamic-component-renderer/dynamic-component-renderer.component";
import {ActionLinkComponent} from "../../../services/aggrid/action-link/action-link.component";
import {DynamicCmpConfig} from "../../../services/aggrid/dynamic-component/dynamic-component-renderer/dynamic-cmp-config";
import {NotificationService} from "../../../services/toastr/notification.service";
import {AuthService} from "../../../services/auth/auth.service";

@Injectable()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  placeholder:string = "Search Users";

  public columnDefs: ColDef[] = [
    { field: 'id',
      headerName: 'Id',
      filter: 'agNumberColumnFilter',
      filterParams: {
        filterOptions: ['equals', 'lessThan', 'greaterThan'],
        buttons: ['reset', 'apply'],
      }
    },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name',headerName: 'Last Name' },
    { field: 'roles',headerName: 'Roles',
      sortable: false,
      cellRenderer: (params:any) => {
        return params.data?.rolesDetailed.map( (role:any) => {
          return role.name;
        })?.join(', ');
      }
    },
    { field: 'email', headerName: 'Email'},
    { field: 'created_at', headerName: 'Created At',filter: 'agDateColumnFilter',},
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
                      routerLink: ['/users', param.data?.id, 'edit'],
                      icon: 'cilPencil',
                    }
                  },
                  {
                    component: ActionLinkComponent,
                    data: {
                      data:  param.data,
                      icon: 'cilTrash',
                      confirm: true,
                      listeners:{
                        handleClick: (component: DynamicComponentRendererComponent) => {
                          component.clickEvent.subscribe( (event: any) => {
                              this.deleteUser(event);
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

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UsersService,
    private toastr: NotificationService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent) {
    this.auth.can('browse-users').then(r => {
      if (r){
        this.loadGridData(params);
      }
    })
  }

  loadGridData(params: GridReadyEvent){
    this.gridApi = params.api;

    const datasource = {
      // called by the grid when more rows are required
      getRows: (params: IGetRowsParams) => {
        // get data for request from server
        this.userService.getUsers(this.gridApi.paginationGetCurrentPage() + 1,{
          params: params
        })
          .subscribe((data:any) => {
            params.successCallback( data.data, data.meta.total );
          });
      }

    }

    params.api!.setDatasource(datasource);
  }

  deleteUser(data: any){
    this.userService.deleteUser(data.data.id)
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

}

