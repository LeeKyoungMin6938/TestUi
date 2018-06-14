import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpHeaders, HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Order } from "../../shared/models/order";
import { LocalDataSource } from 'ng2-smart-table';
import { Buffer } from "buffer";
import { TokenService } from "../../shared/services/token.service";
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  template: `
    <ng2-smart-table
    [settings]="settings"
    [source]="orderList"
    (editConfirm)="updateRecord($event)"
    ></ng2-smart-table>
  `,
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private tokenService: TokenService
  ) { }

  source: LocalDataSource;
  orderList: Order[];
  settings = {
  mode: 'inline',
  add: {
    confirmCreate: 'true'
  },
  actions: {
    add: 'false',
    delete: 'false'
  },
  edit: {
    saveButtonContent: '확인',
    editButtonContent: '수정',
    cancelButtonContent: '취소',
    confirmSave: 'true'
  },
  delete: {
    deleteButtonContent: '삭제',
    confirmDelete: 'true'
  },
  columns: {
    ono: {
      title: '주문번호',
      editable: 'false'
    },
    uid: {
      title: '회원아이디',
      editable: 'false'
    },
    oaddr:{
      title: '주소',
      editable: 'false'
    },
    ototal: {
      title: '결제금액',
      editable: 'false'
    },
    ostatus: {
      title: '주문상태',
      editor: {
        type: 'list',
        config: {
          list: [
            { value: 'Y', title: '처리' },
            { value: 'N', title: '미처리' }
          ] },
      }
    },
    odate: {
      title: '주문날짜',
      editable: 'false'
    }
  }
};

updateRecord(event) {
    var data = {"ono" : event.newData.ono,
                "ostatus" : event.newData.ostatus
                };
  this.http.put<Order>('http://localhost:8080/toma/order/', data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
          alert("주문처리가 변경되었습니다");
          this.getOrderList();
          this.tokenService.updateToken("orderToken",this.orderList);
          this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert("Client-side error occured.");
        } else {
          alert("Server-side error occured.");
        }
      });
  }

getOrderList(){
    this.http.get<Order[]>('http://localhost:8080/toma/order/')
    .subscribe((orderList: Order[]) => {
      this.orderList = orderList;
    },(err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        alert("Client-side error occured.");
      } else {
        alert("Server-side error occured.");
      }
    });
}


  ngOnInit() {
    if(this.tokenService.isToken("orderToken")){
        this.orderList = this.tokenService.getToken("orderToken");
    }else{
        this.getOrderList();
        this.tokenService.saveToken("orderToken",this.orderList);
    }
  }


}
