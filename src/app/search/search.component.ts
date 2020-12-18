import {AfterViewInit, ApplicationRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import * as Mark from 'mark.js/dist/mark.js';
import {debounceTime, tap} from "rxjs/operators";
import { SearchService } from '../search.service';


export interface SearchElement {
  element: HTMLElement,
  terms: string[],
}

@Component({
  selector: 'search-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  constructor(private elRef: ElementRef, private appRef : ApplicationRef, public searchService : SearchService) {
  }

  @Input() search$: BehaviorSubject<string>;

  minSearchLen = 3;
  loadSearchAbleElement = false;
  searchElements: SearchElement[] = null;


  ngOnInit() {

  }

  index() {
    /* Loading elements is expansive,  we need to index */
    this.loadSearchAbleElement = true;
    this.searchElements = [];
    this.appRef.tick();

    /* hide all seperation-box  not searchable */
    this.elRef.nativeElement.querySelectorAll('.search-box:not(.searchable)').forEach(e => e.style.display = 'none');

    const searchElements = this.elRef.nativeElement.querySelectorAll('.searchable');
    for (const element of searchElements) {
      const terms = this.elementTerms(element)
      this.searchElements.push({terms, element})
    }
  }

  ngAfterViewInit(): void {


    this.search$.pipe(
      debounceTime(300),
      tap(s => {
        if (this.searchService.resetSearchOnNextInput && this.loadSearchAbleElement) {
          this.searchElements.forEach(e => e.element.style.display = 'none');
          this.searchElements = null;
          this.searchService.resetSearchOnNextInput = false;
          this.loadSearchAbleElement = false;
          this.appRef.tick();
        }
      })
    ).subscribe(v => {

      /* only index when sufficient chars is typed */
      if (this.searchElements == null && v && v.length >= this.minSearchLen) {
        this.index();
      }

      if (!this.searchElements)  {
        return;
      }

      if (!v) {
        this.searchElements.forEach(e => e.element.style.display = 'none');
        return;
      }

      const search = this.sanitize(v);

      for (let e of this.searchElements) {
        const instance = new Mark(e.element);
        instance.unmark();

        const matches = e.terms.some(t => t.indexOf(search) > -1);
        if (matches) {
          e.element.style.display = 'block';
        } else {
          e.element.style.display = 'none';
        }

        instance.mark(v, {
          element: "span",
          separateWordSearch: false,
          className: 'highlight'
        });

      }
    })
  }

  highlight(element: Element, text: string) {
    let innerHTML = element.innerHTML;
    let index = innerHTML.indexOf(text);
    if (index >= 0) {
      innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
      element.innerHTML = innerHTML;
    }
  }


  sanitize(term : string) : string {
    return term.trim().toLocaleLowerCase().replace(/[^a-z0-9]/, '');
  }

  elementTerms(element: Element): string[] {
    const terms = element.textContent.split("\n").map(this.sanitize).filter(s => s.length > 0);
    return terms
  }
}
