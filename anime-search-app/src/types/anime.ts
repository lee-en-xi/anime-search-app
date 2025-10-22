export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  episodes: number;
  score: number;
  rank: number;
  popularity: number;
  status: string;
  rating: string;
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
  year?: number;
}

export interface AnimeState {
  items: Anime[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  hasNextPage: boolean;
}