import {Component, computed, inject, signal, viewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
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
import {ImagePipe} from '../../ui/image.pipe';
import {MatProgressBar} from '@angular/material/progress-bar';

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
    MatSelectModule,
    MatFabButton,
    ImagePipe,
    MatProgressBar
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
    date: new FormControl(new Date().toISOString(), [Validators.required]),
    standards: new FormControl<string[]>([])
  })

  strandGroups = computed(() => {
    return (this.homeschoolStandardsRepository
      .entities() ?? [])
      .reduce((accumulator, currentValue) => {

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

  attachment = signal<File | null>(null);
  attachmentDataUrl = signal<string | ArrayBuffer | null | undefined>(null);
  attachmentType = computed(() => this.attachment()?.type)
  attachmentSize = computed(() => this.attachment()?.size ?? 0)
  humanAttachmentSize = computed(() => this.humanFileSize(this.attachmentSize()))
  isVideoType = computed(() => this.attachmentType()?.indexOf('video') != -1);

  videoType: string | null | undefined = '';

  onFileSelected(event: any) {
    this.attachment.set(event.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.attachment() as Blob);

    fileReader.onload = (fileReaderEvent) => {
      this.attachmentDataUrl.set(fileReaderEvent.target?.result);
    }
  }

  isSubmitting = signal(false);
  shouldShowCheckmark = signal(false);

  async submit() {
    this.isSubmitting.set(true);
    const uid = this.loginStore.user()?.uid;
    let attachmentUrl: string | null = null;

    const attachment = this.attachment()
    if (attachment) {
      const extension = this.attachment.name.split('.')[1];
      attachmentUrl = `users/${uid}/${nanoid()}.${extension}`;
      const attachmentRef = ref(this.storage, attachmentUrl);

      await uploadBytes(attachmentRef, attachment);
    }

    await this.homeschoolRecordsService.create({
      name: this.form.controls.title.value ?? '',
      date: this.form.controls.date.value ?? '',
      standardsCoding: this.form.controls.standards.value ?? [],
      attachmentUrl
    });

    this.isSubmitting.set(false);
    this.removeAttachment();
    this.form.reset();
    this.shouldShowCheckmark.set(true);
    setTimeout(() => {
      this.shouldShowCheckmark.set(false);
    }, 2000);
  }

  removeAttachment() {
    this.attachment.set(null);
    this.attachmentDataUrl.set(null);
  }

  humanFileSize(size: number) {
    let _size = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, _size)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][_size];
  }
}
