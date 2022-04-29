import { Component, OnInit } from '@angular/core';
import { Injectable} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
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


@Injectable()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'first_name' },
    { field: 'last_name' },
    { field: 'fullname'},
    { field: 'email'},
    { field: 'created_at'},
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
    private userService: UsersService
  ) {

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
              console.dir(data.data);
              params.successCallback( data.data, data.meta.total );
            });
        }

    }

    params.api!.setDatasource(datasource);
  }

}

