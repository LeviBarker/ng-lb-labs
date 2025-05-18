export interface HighlightsResponse {
  highlights: Highlight[]
}

export interface Highlight {
  text: string;
  title: string;
  author: string;
  image_url: string;
}
