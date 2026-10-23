import { useEffect, useState, type SyntheticEvent, type ChangeEvent } from 'react';
import axios from 'axios';
import {
  type Visibility,
  type DiaryEntry,
  type NewDiaryEntry,
  type Weather,
  WeatherOptions,
  VisibilityOptions,
} from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 9.17 fetch diaries
  useEffect(() => {
    void getAllDiaries()
      .then((data) => {
        setDiaries(data);
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to fetch diaries');
      });
  }, []);

  // 9.18–9.20 add new diary
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError(null);

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const added = await createDiary(newEntry);
      setDiaries(diaries.concat(added));
      setDate('');
      setComment('');
      setWeather('sunny');
      setVisibility('great');
    } catch (e: unknown) {
      // 9.19 show backend error message
      if (axios.isAxiosError(e)) {
        if (typeof e.response?.data === 'string') {
          setError(e.response.data);
        } else if (e.response?.data && typeof e.response.data.error === 'string') {
          setError(e.response.data.error);
        } else {
          setError(e.message);
        }
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  // 9.20 radio button handlers
  const handleWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  const handleVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Flight diaries</h1>

      {/* 9.19 error message */}
      {error && (
        <div
          style={{
            color: 'red',
            border: '1px solid red',
            padding: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          {error}
        </div>
      )}

      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        {/* 9.20 HTML date input */}
        <div>
          <label>
            date:{' '}
            <input
              type="date"
              value={date}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDate(event.target.value)
              }
            />
          </label>
        </div>

        {/* 9.20 weather radio group */}
        <div>
          <span>weather: </span>
          {WeatherOptions.map((w) => (
            <label key={w} style={{ marginRight: '0.5rem' }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={handleWeatherChange}
              />
              {w}
            </label>
          ))}
        </div>

        {/* 9.20 visibility radio group */}
        <div>
          <span>visibility: </span>
          {VisibilityOptions.map((v) => (
            <label key={v} style={{ marginRight: '0.5rem' }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={handleVisibilityChange}
              />
              {v}
            </label>
          ))}
        </div>

        {/* comment as text input */}
        <div>
          <label>
            comment:{' '}
            <input
              value={comment}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setComment(event.target.value)
              }
            />
          </label>
        </div>

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaries.map((d) => (
          <li key={d.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{d.date}</strong> – weather: {d.weather}, visibility: {d.visibility}
            {d.comment && (
              <>
                <br />
                <em>{d.comment}</em>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;