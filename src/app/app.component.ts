import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';
import { EntriesInterface, EntryInterface } from './entries.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    this.getAllEntries();
    this.getCategories(); 
  }

  categories:string[] = [];
  categoriesSub:any;
  getCategories() {
    this.categoriesSub = this.coreService.getCatergories().subscribe((data: string[]) => {
      this.categories = ['All', ...data];
    });
  }

  entriesSub: any;
  getAllEntries() {
    if(this.entriesByTitleSub) { this.entriesByTitleSub.unsubscribe() };
    this.entriesSub = this.coreService.getEntries()
    .subscribe((dataFromServer: EntriesInterface) => this.setData(dataFromServer.entries));
  }

  entriesByTitleSub: any;
  getEntriesByTitle(title: string) {
    this.entriesSub.unsubscribe();
    this.entriesByTitleSub = this.coreService.getEntryByTitle(title)
    .subscribe((dataFromServer: EntriesInterface) => this.setData(dataFromServer.entries));
  }

  entries: EntryInterface[] = [];
  entriesBuckup: EntryInterface[] = [];
  entriesByCategories: EntryInterface[] = [];
  setData(entriesDataFromServer) {
    this.entriesBuckup = entriesDataFromServer;
    this.entries = entriesDataFromServer;
  }

  filterFunc(filterType, userSelection) {
    if (filterType === 'protocol') {
      if (this.entriesByCategories.length > 0) {
        this.entries = this.entriesByCategories.filter((entry: EntryInterface) => {
          return userSelection === 'HTTPS' ? entry.HTTPS : userSelection === 'HTTP' ? !entry.HTTPS : true; 
        })    
      } else {
        this.entries = this.entriesBuckup.filter((entry: EntryInterface) => {
          return userSelection === 'HTTPS' ? entry.HTTPS : userSelection === 'HTTP' ? !entry.HTTPS : true; 
        })
      } 
    } 

    if(filterType === 'category') {
      if (userSelection !== 'All') {
        this.entriesByCategories = this.entriesBuckup.filter((entry: EntryInterface) => {
          return userSelection !== 'All' ? entry.Category === userSelection : true;
        });
      }
      this.entries = this.entriesBuckup.filter((entry: EntryInterface) => {
        return userSelection !== 'All' ? entry.Category === userSelection : true;
      });
    } 
  }
}
