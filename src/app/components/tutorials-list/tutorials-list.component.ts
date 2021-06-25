import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [5, 10, 15];

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    
    this.tutorialService.getAll(params)
      .subscribe(
        response => {
          console.log("tutorials : ::: "+JSON.stringify(response['bulkData']))
          this.tutorials = response['bulkData'];
          this.count = response['totalItems'];
          console.log("Params ::::: " + this.title+ " ::: "+ this.page + " ::: "+ this.pageSize+ " ::: "+ this.count);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }
}
