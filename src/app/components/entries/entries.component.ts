import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from '../../core.service';
import { EntriesInterface } from '../../entries.interface';

@Component({
  selector: 'ae-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  @Input() entries: EntriesInterface[];

  constructor() { }

  ngOnInit(): void {
  
  }
}
