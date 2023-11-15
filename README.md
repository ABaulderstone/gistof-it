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
