import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { AsyncPipe, DatePipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { SubjectService } from '../../slices/subject/subject.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { SubjectStore } from '../../slices/subject/subject.store';
import { HomeschoolStandardsRepository } from '../../slices/homeschool-standards/homeschool-standards.repository';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HomeschoolStandard } from '../../slices/homeschool-standards/homeschool-standard';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-homeschool',
  imports: [
    MatButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    AsyncPipe,
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatFormField,
    MatInput,
    MatFormField,
    MatLabel,
    JsonPipe,
    KeyValuePipe,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  standalone: true,
  templateUrl: './homeschool.component.html',
  styleUrl: './homeschool.component.css',
  providers: [provideNativeDateAdapter()],
})
export class HomeschoolComponent {
  private readonly router = inject(Router);

  homeschoolStandardsRepository = inject(HomeschoolStandardsRepository);

  strandGroups = computed(() => {
    const strands = this.homeschoolStandardsRepository.entities();

    return strands?.reduce((accumulator, currentValue) => {
     
      if(!accumulator[currentValue.strandDescription]) {
        accumulator[currentValue.strandDescription] = [];
      }

      accumulator[currentValue.strandDescription].push(currentValue);

      return accumulator;
    }, {} as Record<string, HomeschoolStandard[]>);
  });

  standardsFormControl = new FormControl('');
  date = new FormControl(new Date())

  async goBack() {
    await this.router.navigate(['./']);
  }
}
