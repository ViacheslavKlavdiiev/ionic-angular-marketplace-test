import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/core/models';
import { ProductsService, StorageService } from 'src/app/core/services';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsPage implements OnInit, OnDestroy {
  public errorObject: HttpErrorResponse | null = null;
  private destroy$ = new Subject<void>();
  private productsArray: Subject<Product[]> = new Subject<Product[]>();
  public products$: Observable<Product[]> = this.productsArray.asObservable();

  public search = '';

  constructor(
    private cd: ChangeDetectorRef,
    private productsService: ProductsService,
    private storageService: StorageService
  ) {
    this.initSearch();
  }

  ngOnInit(): void {
    this.errorObject = null;
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => this.productsArray.next(res));
    this.products$.pipe(
      catchError((err) => {
        this.errorObject = err;
        this.cd.detectChanges();
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  refresh(event) {
    setTimeout(() => {
      this.productsService
        .getProducts()
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.productsArray.next(res);
          event.target.complete();
        });
    }, 300);
  }

  async initSearch() {
    this.search = (await this.storageService.get('search')) || '';
    this.cd.detectChanges();
  }

  public changeSearch(e: any) {
    this.search = e.target.value;
    this.storageService.set('search', this.search);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
