# Social media(with Next.js)

[Demo](https://nomad-next-social-media.vercel.app/)

## How to run in local

1. Clone this repository

```shell
git clone https://github.com/hyesuhong/nomad_next_social_media.git
```

2. Intall dependencies

```shell
pnpm install
# or
npm install
```

3. Set `.env`

   - DATABASE_URL
   - DIRECT_URL
   - BCRYPT_SALT_ROUNDS
   - COOKIE_PASSWORD

4. Run the development server

```shell
pnpm dev
# or
npm run dev
```

<!-- ## User flow -->

<!-- image -->

## Features

- authentication
- post
- comment
- like / dislike

## Next plans

### More features

- authentication with github, google, kakao
- upload image(post, comment, user's profile...)
- edit/delete (post, comment)

### To fix

- like/dislike's optimistic update & caching
- server actions' error handling

## Tech stacks

### Language
![Typescript](https://img.shields.io/badge/Typescript-000000?style=flat-square&logo=Typescript&logoColor=3178C6)

### Frontend
![ReactJS](https://img.shields.io/badge/React.js-000000?style=flat-square&logo=React&logoColor=61DAFB)
![NextJS](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Nextdotjs&logoColor=white)
![TailwindCss](https://img.shields.io/badge/TailwindCss-000000?style=flat-square&logo=tailwindcss&logoColor=06B6D4)
![Zod](https://img.shields.io/badge/Zod-000000?style=flat-square&logo=zod&logoColor=3E67B1)

### Database
![Prisma](https://img.shields.io/badge/Prisma-000000?style=flat-square&logo=prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-000000?style=flat-square&logo=supabase&logoColor=3FCF8E)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
