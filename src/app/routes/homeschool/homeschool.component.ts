import {Component, computed, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {AsyncPipe, DatePipe, JsonPipe, KeyValuePipe} from '@angular/common';
import {SubjectService} from '../../slices/subject/subject.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {SubjectStore} from '../../slices/subject/subject.store';
import {HomeschoolStandardsRepository} from '../../slices/homeschool-standards/homeschool-standards.repository';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HomeschoolStandard} from '../../slices/homeschool-standards/homeschool-standard';
import {MatSelectModule} from '@angular/material/select';
import {getStorage, ref, uploadBytes} from '@angular/fire/storage';
import {Auth} from '@angular/fire/auth';
import {LoginStore} from '../../slices/login/login.store';
import {nanoid} from 'nanoid'
import {HomeschoolRecordsService} from '../../slices/homeschool-records/homeschool-records.service';

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
  private readonly loginStore = inject(LoginStore);
  homeschoolStandardsRepository = inject(HomeschoolStandardsRepository);
  homeschoolRecordsService = inject(HomeschoolRecordsService);

  storage = getStorage();

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  })

  strandGroups = computed(() => {
    return this.homeschoolStandardsRepository
      .entities()
      ?.reduce((accumulator, currentValue) => {

        if (!accumulator[currentValue.strandDescription]) {
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

  attachment: File | null = null;
  attachmentDataUrl: string | ArrayBuffer | null | undefined = '';

  onFileSelected(event: any) {
    this.attachment = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.attachment as Blob);

    fileReader.onload = (fileReaderEvent) => {
      this.attachmentDataUrl = fileReaderEvent.target?.result;
    }
  }

  isSubmitting = signal(false);

  async submit() {
    this.isSubmitting.set(true);
    const uid = this.loginStore.user()?.uid;
    let attachmentUrl: string | null = null;

    if (this.attachment) {
      const extension = this.attachment.name.split('.')[1];
      attachmentUrl = `users/${uid}/${nanoid()}.${extension}`;
      const attachmentRef = ref(this.storage, attachmentUrl);

      await uploadBytes(attachmentRef, this.attachment);
    }

    await this.homeschoolRecordsService.create({
      name: this.form.controls.title.value ?? '',
      date: this.form.controls.date.value ?? '',
      attachmentUrl
    });

    this.isSubmitting.set(false);
    this.form.reset();
    this.attachment = null;
    this.attachmentDataUrl = null;
  }
}
