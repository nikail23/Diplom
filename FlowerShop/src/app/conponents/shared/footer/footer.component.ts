import { ElinextService } from './../../../services/elinext.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private elinext: ElinextService) {}

  public logoClick() {
    this.elinext.redirectToElinext();
  }

  public socialMediaClick() {
    this.elinext.redirectToElinext();
  }
}
