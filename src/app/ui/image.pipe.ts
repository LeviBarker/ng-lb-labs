import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {

  transform(url: string | ArrayBuffer | null | undefined): unknown {
    return `url('${url}')`;
  }

}
