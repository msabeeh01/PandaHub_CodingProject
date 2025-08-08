export class TMDBClient {
  private static instance: TMDBClient;
  private baseURL = "https://api.themoviedb.org/3";
  private imageBaseURL = "https://image.tmdb.org/t/p/w500";
  private apiKey = process.env.EXPO_PUBLIC_API_KEY;

  private constructor() {}

  static getInstance(): TMDBClient {
    if (!TMDBClient.instance) {
      TMDBClient.instance = new TMDBClient();
    }
    return TMDBClient.instance;
  }

  private getHeaders() {
    return {
      accept: "application/json",
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  getImageURL(path: string): string {
    return `${this.imageBaseURL}${path}`;
  }
}