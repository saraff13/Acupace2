import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {WebServiceService} from './providers/web-service/web-service.service';
import {MeetingLists} from './app-meeting_list';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  deviceDetails: any;
  Notifications:any;
  Notifications_host:any;
  constructor(private router: Router ,private device: DeviceDetectorService, private webservice:WebServiceService,public meetingList:MeetingLists) { }
  ngOnInit() {
    this.Initialize();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.InvitationList();
    this.InvitationList_host();
  }
  Initialize(){
    this.deviceDetails =  this.device.getDeviceInfo();
    localStorage.setItem("devicedetails", this.deviceDetails);
  }
  InvitationList(){
    let bodystring = {
      "attendee_email": JSON.parse(localStorage.getItem("userDetails")).result.user_email
    };
    this.webservice.NotificationList(bodystring)
      .then(response => {
        this.Notifications = response;
        console.log(this.Notifications);
        this.Notifications=this.Notifications.result;
        this.meetingList.Add(this.Notifications);
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
        this.Notifications_host=this.Notifications_host.result;
        this.meetingList.Add_host(this.Notifications_host);
      }, (err) => {
        console.log("Error" + err);
      });
  }
}
