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

#### 2023-11-28

- Set up pagination for getting all posts, I quite like the way mikro-orm handles it with `findAllAndCount`
- Probably a little overkill with indrection again with the `generatePagination` helper function but I like the idea of it being multi-purpose and I've got that 'skinny controller' Rails mindset pretty embedded.
- Link generation was fun, not quite HATEOS but getting a little bit closer. I wanna really narrow down on some of those REST best practices

#### 2023-11-29

- Added pagination and post fetching to the front end
- The query params syntax in next server components feels a little odd and overly verbose, I don't like that it's not a hook but it's not too messy to use. I do wish it had a prebuilt interface for the props though.
- Sever components in general feel wild like I'm still not 100% on what is being sent over the network, but it's smooth, fast, and reactive so that's cool
- I also love that the url is the source of truth/state for the pagination. I've seen this done wrong/done this wrong in so many React apps.

#### 2023-12-10

I'm not sure exactly which days which things were done, a week offline did me some good but I worked on this a bit at airports along the way.

- Added `Bull` to handle queues
- Set up a queue for sending emails
- Using sendgrid for emails
  - Right now it works but the verified email thing is a little annoying
  - Also adding emails on blog create just to my personal email for testing right now, not ideal but it works as POC
- The persisted redis data means that even if a job is created and the server is reset the job will complete later, this might have implications for cost of hosting later but it's not a huge deal
- My goal for the rest of today is to set up a user model, and have registration emails sending out

#### 2023-12-14

Of course I **would** get covid

- Mapped out a rough user model. I'm sure it will grow over time but the idea is that:
  - Users belong to a UserRole
  - Users have a single UserProfile
  - User.status is an enum: Pending, Active, Suspended, Archived. I don't really see any other status possible yet but I'm sure I'll run into them as they're built
- A weird thing is that the idea of `owner` (as to where the foreign key sits) in mikro-orm is opposite to how I _feel_ it should be.

#### 2023-12-17

- Set up user seeding, in doing so realised that there needed to be a relationship between Users and Posts.
  - Posts belong to an Author
  - A user can have many posts.
- Realised that there's a bit of annoying stuff to do to ensure that this data is seeding correctly but there's some tricks you can use with the `Entity Manager` to make it work
- Next step is to try and load only some attributes (User profile name) with a Post

#### 2023-12-18

- Loading author info in the findAll wasn't too bad
- Mikro-orm has the `populate` method you can call on a Record or collection of records,
  then a little wrangling of the data in the service layer to strip out stuff I didn't want to show (password and email)
- Looks fine to do login now
