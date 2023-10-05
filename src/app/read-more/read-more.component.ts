import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import '@angular/localize/init'

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {

  @Input() content: any;
  @Input() limit?: number;
  @Input() completeWords?: boolean;

  isContentToggled?: boolean;
  nonEditedContent?: string;

  constructor() {

  }

  ngOnInit() {
    console.log(this.content);
    this.nonEditedContent = this.content;
    this.content = this.formatContent(this.content);
  }

  toggleContent() {
    this.isContentToggled = !this.isContentToggled;
    this.content = this.isContentToggled ? this.nonEditedContent : this.formatContent(this.content);
  }

  formatContent(content: string) {
    if (this.completeWords) {
      this.limit = content.substring(0, this.limit).lastIndexOf(' ');
    }
    return `${content.substring(0, this.limit)}...`;
  }

}
