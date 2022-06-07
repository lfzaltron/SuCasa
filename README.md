# SuCasa - Fullstack Challenge 

https://sucasa-two.vercel.app/

## Backend
Developed with Node.js, Typescript and PostgreSQL.

Hosted on [railway](https://railway.app/) with CI/CD.

### Endpoints
* GET https://sucasa-production.up.railway.app/presentations -> Return the list of presentations with the format bellow

```
[
  {
    id: number;
    presentation: string;
    details: string;
    room: number;
    speaker: {
      name: string;
      company: string;
      email: string;
      bio: string;
    };
  },
]
```
* POST https://sucasa-production.up.railway.app/presentations -> Create a presentation

Body data:
```
{
  presentation: string;
  details: string;
  room: number;
  speaker: {
    name: string;
    company: string;
    email: string;
    bio: string;
  };
}
```
* POST https://sucasa-production.up.railway.app/attendees -> Create an attendee

Body data:
```
{
  name: string;
  company: string;
  email: string;
}
```
* POST https://sucasa-production.up.railway.app/presentations/presentation_id/attendees -> Add the attendee with the email provided to the list of the presentation with the ID informed on presentation_id (route param)

Body data:
```
{
  email: string;
}
```

### HTTP Status codes:
* 201 -> Created. No body data
* 400 -> Bad requests with body
```
{
  "status": "error",
  "message": errorMessage
}
```
* 500 -> Other errors with body
```
{
  "status": "error",
  "message": "Internal server error"
}
```

### Dev Environment
Example of database connection env variable
```
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/sucasa"
```

Apply database migrations
```
npx prisma migrate dev
```
Read more about [Prisma ORM](https://www.prisma.io/docs/)

Run tests
```
npm run test
```
See coverage report on ./backend/coverage/lcov-report/index.html

Run project
```
npm run dev
```

## Frontend
Depeloped with React.js, Typescript and Tailwildcss.

Hosted on [vercel](https://vercel.com/) with CI/CD.

### Dev Environment
Example of backend url env variable
```
VITE_API_URL=http://localhost:3333
```

Run project
```
npm run dev
```
