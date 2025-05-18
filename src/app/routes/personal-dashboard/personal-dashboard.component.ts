import {Component, inject} from '@angular/core';
import {HighlightsService} from '../../api/highlights.service';
import {MatCard} from '@angular/material/card';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {HighlightComponent} from '../../ui/highlight/highlight.component';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  standalone: true,
  imports: [
    MatCard,
    AsyncPipe,
    JsonPipe,
    HighlightComponent
  ],
  styleUrl: './personal-dashboard.component.css'
})
export class PersonalDashboardComponent {
  highlightsService = inject(HighlightsService)
}
