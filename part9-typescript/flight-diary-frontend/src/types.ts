export type Weather =
  | 'sunny'
  | 'rainy'
  | 'cloudy'
  | 'windy'
  | 'stormy';

export const WeatherOptions: Weather[] = [
  'sunny',
  'rainy',
  'cloudy',
  'windy',
  'stormy'
];

export type Visibility =
  | 'great'
  | 'good'
  | 'ok'
  | 'poor';

export const VisibilityOptions: Visibility[] = [
  'great',
  'good',
  'ok',
  'poor'
];

// What backend returns for each diary
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;