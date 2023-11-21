import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageRequestModel, PageableMetaModel } from 'app/models/pageable-meta-model';
import { isEmpty } from '../utils/utils';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{

  @Input() pageRequest: PageRequestModel;

  @Input() pageableMeta: PageableMetaModel;

  @Output() onPaginationEvent: EventEmitter<PageRequestModel> = new EventEmitter<PageRequestModel>();

  /** The number of records to display */
  @Input() pageSize = 5;

  @Input() sortBy: string = "";

  /** Current page */
  // @Input() currentPage = 1;

  /** The number of buttons to show either side of the current page */
  @Input() maxSize = 2;

  /** Display the First/Last buttons */
  @Input() firstLastButtons = false;

  /** Display the Next/Previous buttons */
  @Input() nextPreviousButtons = true;

  /** Display small pagination buttons */
  // @Input() small = false;

  private pagesSize: Array<number> = [5, 10, 25, 50, 100];
  private defaultPageSize: number = 10;

  totalPagesArrayForLoop: any[] = [];

  constructor() {}
  ngOnInit(): void {
    this.pageRequest.pageSize = this.defaultPageSize;
    this.totalPagesArrayForLoop = new Array(this.pageableMeta?.totalPages);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPagesArrayForLoop = new Array(this.pageableMeta?.totalPages);
  }

  private selectPageSize(pageSize) {
    if(!isEmpty(pageSize)) {
      this.pageRequest.pageSize = pageSize;
    } else {
      this.pageRequest.pageSize = this.defaultPageSize;
    }
    
    this.emitEvent();
  }

   /** Set page number */
   selectPageNumber(pageNumber: number) {
    console.log(this.pageRequest.pageSize);
    
    this.pageRequest.offset = pageNumber;
    this.emitEvent();
  }

   /** Set next page number */
  next() {
    // const nextPage = this.currentPage + 1;
    // nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
    const currentPage = this.pageableMeta.pageNumber + 1;
    if(currentPage < this.pageableMeta.totalPages) {
      this.selectPageNumber(this.pageableMeta.pageNumber + 1);
    } else {
      throw new Error("Ultima pagina")    
    }
    
  }

  /** Set previous page number */
  previous() {
    // const previousPage = this.currentPage - 1;
    // previousPage >= 1 && this.selectPageNumber(previousPage);
    const currentPage = this.pageableMeta.pageNumber - 1;
    if(currentPage >= 0) {
      this.selectPageNumber(this.pageableMeta.pageNumber + 1);
    } else {
      throw new Error("Primeira pagina")    
    }
    this.selectPageNumber(this.pageableMeta.pageNumber -1);
  }

  emitEvent() {
    this.onPaginationEvent.emit(this.pageRequest);
  }

}
