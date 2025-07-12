import {createStore} from '@ngneat/elf'
import {selectAllEntities, setEntities, withEntities} from '@ngneat/elf-entities'
import {tap} from 'rxjs'
import {inject, Injectable} from '@angular/core'
import {HomeschoolStandardsService} from './homeschool-standards.service'
import {trackRequestResult} from '@ngneat/elf-requests'
import {HomeschoolStandard} from './homeschool-standard'
import {toSignal} from '@angular/core/rxjs-interop'

const store = createStore({ name: 'homeschoolStandards' }, withEntities<HomeschoolStandard>({
  initialValue: []
}))

@Injectable({ providedIn: 'root' })
export class HomeschoolStandardsRepository {

  private readonly service = inject(HomeschoolStandardsService)

  entities = toSignal(store.pipe(selectAllEntities()))

  private setStandards(entities: HomeschoolStandard[] = []) {

    entities.sort((a, b) => {
      return a.coding > b.coding ? 1 : -1;
    });

    store.update(setEntities(entities))
  }

  public loadEntities() {
    this.service.getAll().pipe(
      tap(this.setStandards),
      trackRequestResult(['homeschoolstandards'])
    ).subscribe();
  }
}
