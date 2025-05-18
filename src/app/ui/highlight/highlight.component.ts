import {Component, input} from '@angular/core';
import {Highlight} from '../../models/highlight';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-highlight',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './highlight.component.html',
  standalone: true,
  styleUrl: './highlight.component.css'
})
export class HighlightComponent {
  highlight = input<Highlight | undefined>();
}
