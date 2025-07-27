import {Component, computed, input} from '@angular/core';
import {getDownloadURL, getStorage, ref} from '@angular/fire/storage';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-firebase-image',
  imports: [
    AsyncPipe
  ],
  templateUrl: './firebase-image.component.html',
  standalone: true,
  styleUrl: './firebase-image.component.css'
})
export class FirebaseImageComponent {
  // storage = getStorage();
  url = input<string | null | undefined>();

  // downloadUrl = computed(async () => {
  //   const url = this.url();
  //   return url ? await getDownloadURL(ref(this.storage, url)) : Promise.resolve('')
  // })

}
