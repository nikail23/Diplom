import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public isContentOpen: boolean = false;
  public message: string = '';

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

  public toggleContent() {
    this.isContentOpen = !this.isContentOpen;
  }

  public closeContent() {
    this.isContentOpen = false;
  }

  public sendMessage() {
    if (this.message && this.message.length > 0) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
