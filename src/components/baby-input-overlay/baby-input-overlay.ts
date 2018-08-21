import { Component, Input } from '@angular/core';

@Component({
  selector: 'baby-input-overlay',
  templateUrl: 'baby-input-overlay.html'
})
export class BabyInputOverlayComponent {

  constructor() {}

  inputClicked:boolean = false;

  @Input("content-title") contentTitle:string = "";
  @Input("content-description") contentDescription:string = "";
  @Input("input-label") inputLabel:string = "";
  @Input("button-name") buttonName:string = "";

  private clickMethod(){
    this.inputClicked = true;
  }

  private blurMethod(){
    this.inputClicked = false;
  }

}
