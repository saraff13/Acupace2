import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {WebServiceService} from '../../../../../providers/web-service/web-service.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {MeetingLists} from '../../../../../app-meeting_list'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  name: any;
  profile_pic: any;
  user_email: any;
  mobile: any;
  userId: any;
  Notifications: any;
  Notifications_host:any;
  timerid:any;
  current_time:any;
  constructor(private webservice:WebServiceService, private router:Router,private Meeting_list:MeetingLists,private SpinnerService: NgxSpinnerService) { }
  ngOnInit() {
    if (localStorage.getItem("userDetails") != '' || localStorage.getItem("userDetails") != undefined) {
      this.userId = JSON.parse(localStorage.getItem("userDetails")).result.ID;
      this.name = JSON.parse(localStorage.getItem("userDetails")).result.name;
      this.user_email = JSON.parse(localStorage.getItem("userDetails")).result.user_email;
      this.mobile = JSON.parse(localStorage.getItem("userDetails")).result.mobileno;
      this.profile_pic = JSON.parse(localStorage.getItem("userDetails")).result.profile_pic;
    }
  }
  ngOnDestroy() { 
    clearInterval(this.timerid);
  }
  Logout(){
    this.webservice.Logout_user();
  }
  Join_Meeting_by_Host(Notification:any){
    this.current_time=moment();
    if(moment(Notification.host_meeting_end_time).isSameOrAfter(this.current_time) && moment(Notification.host_meeting_start_time).isSameOrBefore(this.current_time) && Notification.meeting_status!=2){
      this.Meeting_list.Join_Stream(Notification);
      this.router.navigate(['/admin/sample-page']);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Either the Meeting Ended or You tried to enter before the Schedule',
      })
    }
  }
  Join_Meeting_by_attendee(Notification:any){
    this.current_time=moment();
    if(moment(Notification.host_meeting_end_time).isSameOrAfter(this.current_time) && moment(Notification.host_meeting_start_time).isSameOrBefore(this.current_time) && Notification.meeting_status!=2){
      this.Meeting_list.Join_Stream(Notification);
      this.router.navigate(['/admin/sample-page']);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Either the Meeting Ended or You tried to enter before the Schedule',
      })
    }
  }
  GetNotification(){
    this.InvitationList();
    this.InvitationList_host();
  }
  InvitationList(){
    this.SpinnerService.show();
    let bodystring = {
      "attendee_email": JSON.parse(localStorage.getItem("userDetails")).result.user_email
    };
    this.webservice.NotificationList(bodystring)
      .then(response => {
        this.Notifications = response;
        console.log(this.Notifications);
        this.Notifications=this.Notifications.result;
      }, (err) => {
        console.log("Error" + err);
      });
  }
  InvitationList_host(){
    let bodystring = {
      "host_id": JSON.parse(localStorage.getItem("userDetails")).result.ID
    };
    this.webservice.NotificationList_Host(bodystring)
      .then(response => {
        this.Notifications_host = response;
        console.log(this.Notifications_host);
        this.SpinnerService.hide();
        this.Notifications_host=this.Notifications_host.result;
      }, (err) => {
        console.log("Error" + err);
      });
  }
}
