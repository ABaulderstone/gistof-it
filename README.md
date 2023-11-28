# Gistof.it

## MVP

A blogging website that can also email blogposts to users on a mailing list

## Future Goals

- Search and filter by tag
- Markdown editor
- Drag and drop image upload
- Maintain image location in text

## Stack

This is really an opportunity for me to learn as much as possible

### Frontend

- Next Js with SSR

### Backend

- Nest Js
- Postgres
- Redis (for mail job queue)

### Integrations

- Sendgrid
- S3 Image Upload

### CI/CD

- Docker
- Github Workflows
- Elastic Beanstalk

## Dev Log

#### 2023-11-13

- Scaffolded backend and frontend
- Put together docker compose
- Tested environment variables can actually be passed to the apps (they can, also node 20+ with no dotenv is a win)
- Docker compose works. Bed time

#### 2023-11-14

Got a covid booster last night so feeling pretty brain foggy

- Added mikro-orm.config.ts
- Created base entity so all entities should have id, createdAt, and updatedAt properties
- Scaffolded Post domain
- Set up networking between database and backend service, succesfully connects
- Next step will be connecting front end to backend and configuring CORS. I think a tomorrow job.

#### 2023-11-15

- Configured the docker-compose.yml to pass in env variables for the front end
- React server components feel **weird** I feel like I need to be doing something else with the loading state, I'll play around a bit more with the Loading component and artifically increasing delays to see if I need to do anything else
- One annoying complication, server components need to request to `http://backend:8080` but client components run in the **browser** and they need to connect to `http://localhost:8080`. At this stage I think I can get away with everything being SSR but I might need to make another axios instance
- I'll get into data seeding and making sure my backend is solid tomorrow

#### 2023-11-16

- Set up migrations and seeding, good to see that my BaseEntity idea worked.
- Running migrations and seed commands is a little bit annoying because I need to do it from **inside** the docker container. It makes sense because otherwise I won't have access to environment vars but it is inherently slower. I can foresee this being a problem in testing as well, but I'm hoping I can set up some docker files specficially for testing as well.
- Set up a generate slug function, note to self to write some unit tests for it tomorrow. But it seems sound.
- Still haven't touched the front end or thought about redis yet, but I have quite a way to go with the API before that's a concern

#### 2023-11-25

After a very hectic week at work I'm ready to get back into this.

- I've been trying to wrap my head around functional programming patterns, particularly monads for a while.
  - So I basically created the [Either type](./backend/src//shared/either.ts) based pretty heavily on the Rust Result.
  - This in combination with [unwrapResult](./backend/src/shared/unwrap-result.ts) should give me very lite controllers with good error handling
  - It's a bit crunchy and maybe there's too much indirection/abstraction but it's something I wanted to do in a work project but didn't sit right with the rest of the team. Worst case I end up kicking myself for doing it this way, best case I have some cool stuff to show off. Right now I'm happy with the abstraction
  - It's also really improved my understanding of typescript generics which is a bonus
- Backend is still in basic CRUD stages but it's nice to be programming again

#### 2023-11-26

- Improved create post method to run in a single transaction. A neat little discovery with mikro-orm, I actually really like the API for this
- Logic in update working with slug generation neat.

#### 2023-11-27

- Realised we should probably have a soft delete option for posts.
  - Everything archives for now. I'm thinking a chron job at some point to delete posts that have an update date +30 days ago or something

#### 2023-11-27

- Set up pagination for getting all posts, I quite like the way mikro-orm handles it with `findAllAndCount`
- Probably a little overkill with indrection again with the `generatePagination` helper function but I like the idea of it being multi-purpose and I've got that 'skinny controller' Rails mindset pretty embedded.
- Link generation was fun, not quite HATEOS but getting a little bit closer. I wanna really narrow down on some of those REST best practices
