import { Component, OnInit } from '@angular/core';
import { Injectable} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import {cilPlus, cilPencil} from '@coreui/icons';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {UsersService} from "../users.service";
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
import {
  IRouterLinkRendererComponentOptions,
  RouterLinkRendererComponent
} from "../../../shared/aggrid/router-link-renderer/router-link-renderer.component";
import {DynamicComponentRendererComponent} from "../../../shared/aggrid/dynamic-component/dynamic-component-renderer/dynamic-component-renderer.component";
import {ActionLinkComponent} from "../../../shared/aggrid/action-link/action-link.component";

@Injectable()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [IconSetService],
})
export class UsersComponent implements OnInit {

  public icons!: [string, string[]][];

  public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Id' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name',headerName: 'Last Name' },
    { field: 'email', headerName: 'Email'},
    { field: 'created_at', headerName: 'Created At'},
    { headerName: 'Actions', field: '',
      cellRenderer: RouterLinkRendererComponent,
      cellRendererParams: {
        routerLinkRendererComponentOptions: (param: any): Array<IRouterLinkRendererComponentOptions> => {
          if (param.data) {
            return [
              {
                routerLinkParams: ['/users', param.data.id, 'edit'],
                icon: 'cilPencil',
              },
              {
                routerLinkParams: ['/users', param.data.id, 'edit'],
                icon: 'cilTrash',
              }
            ];
          } else {
            return [
              {
                textOnly: '-',
              }
            ];
          }
        }
      },
      },
    { headerName: 'Actions Dynamic', field: '',
      cellRenderer: DynamicComponentRendererComponent,
        cellRendererParams: {
          dynamicComponentConfig: (param: any):any => {
              return {
                component: ActionLinkComponent
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
    public iconSet: IconSetService,
  ) {
    iconSet.icons = { cilPlus };
  }

  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent) {

    this.gridApi = params.api;

    const datasource = {
        // called by the grid when more rows are required
        getRows: (params: IGetRowsParams) => {
          // get data for request from server
          this.userService.getUsers(this.gridApi.paginationGetCurrentPage() + 1)
            .subscribe((data:any) => {
              params.successCallback( data.data, data.meta.total );
            });
        }

    }

    params.api!.setDatasource(datasource);
  }

}

