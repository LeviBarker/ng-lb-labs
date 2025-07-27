export interface HomeschoolRecord {
  id?: string;
  uid?: string;
  name?: string;
  date: string;
  standardsCoding: string[];
  attachmentUrl?: string | null;
  description?: string | null;
}
