# Full Stack Open

My exercise solutions for [Full Stack Open](https://fullstackopen.com/en/), the University of Helsinki's online course on modern web development.

I completed the TypeScript part (Part 9, 1 ECTS): [certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fs-typescript/en/e9bd3494fe2786b2448171943d00ad7a). Part 10 (React Native) is started, not finished.

Each folder is a separate project with its own `package.json`. The flight diary backend and the Patientor frontend started from the course's starter code; their history includes the course authors' commits.

## Part 9: TypeScript

| Folder | What it is | Stack |
|---|---|---|
| [calculators](part9-typescript/calculators) | BMI and exercise calculators, run from the command line; the BMI calculator also through an Express endpoint (`/bmi`) | TypeScript, Express |
| [courseinfo](part9-typescript/courseinfo) | Course parts rendered with discriminated union types and exhaustive type checking | React, TypeScript, Vite |
| [flight-diary-backend](part9-typescript/flight-diary-backend) | REST API for flight diary entries | TypeScript, Express |
| [flight-diary-frontend](part9-typescript/flight-diary-frontend) | Lists diary entries and adds new ones, showing the backend's validation errors | React, TypeScript, Axios |
| [patientor-backend](part9-typescript/patientor-backend) | Patient and diagnosis API with typed request validation | TypeScript, Express, Zod |
| [patientor-frontend](part9-typescript/patientor-frontend) | Patient list and detail pages; adds hospital, occupational and health-check entries | React, TypeScript, Material UI |

## Part 10: React Native (unfinished)

| Folder | What it is | Stack |
|---|---|---|
| [rate-repository-app](part10-react-native/rate-repository-app) | Repository list, app bar with tabs, routing and a sign-in form built with Formik | React Native, Expo, Formik |

## Running a project

```sh
cd part9-typescript/patientor-backend
npm install
npm run dev
```

The scripts differ a little between projects; check each `package.json`.
