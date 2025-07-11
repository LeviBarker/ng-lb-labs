import {HomeschoolStandard} from '../slices/homeschool-standards/homeschool-standard';

export interface HomeschoolRecord {
  uid?: string;
  name?: string;
  date: string;
  standardsCoding: string[];
  attachmentUrl?: string | null;
}
