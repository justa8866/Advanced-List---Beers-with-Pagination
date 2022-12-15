import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, map, mergeMap, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import { BeerModel } from '../../models/beer.model';
import { BeerService } from '../../services/beer.service';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-beer',
  styleUrls: ['./beer.component.scss'],
  templateUrl: './beer.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeerComponent {
  beers: BeerModel[] = [];
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize = 5;
  currentPageData$: Observable<any> | undefined;
  destroyed$ = new Subject<void>();

  ngOnInit() {
    this.currentPageData$ = this.currentPage$.pipe(
      switchMap((currentPage) =>
        this._beerService.getPage(currentPage, this.pageSize)
      )
    );

    this.currentPageData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((beers: BeerModel[]) => this.beers = beers);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  constructor(private _beerService: BeerService) {
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  getPaginationData($event: PageEvent) {
    console.log($event);

    console.log(this.currentPage$);

    if($event.pageSize !== this.pageSize) {
      this.pageSize = $event.pageSize;
      this.currentPage$.next(1);
      return;
    }

    if($event.pageIndex === this.currentPage$.value + 1){
      this.nextPage();
    } else {
      this.prevPage();
    }
  }
}
