import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HighlightsResponse} from '../models/highlight';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  http = inject(HttpClient)

  highlights$ = this.http.get<HighlightsResponse>('https://us-central1-levi-barker-product.cloudfunctions.net/getHighlights')
}
