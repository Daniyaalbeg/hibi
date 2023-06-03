# Hibi Take home

## Solution

I chose to use Expo vs RN cli for this.
To Install and run do the following:

- Clone the repository
- Install packages with npm install
- Install the expo cli
- Run the app with npx expo start
- Connect using the expo go app

## Tech

- [Zustand] - State manager of choice
- [Zod] - For creating the schema and validation
- [react-hook-form] - To handle the form state.
- [@react-native-community/datetimepicker"] - For the native date picker
-

## Additional Questions

##### Which cloud service would you use and why?

This entirely depends on the enegineering team size and skillset. Given a smaller team a managed solution might be the best option. Something like supabase for example. It would give us a full postgres database along with alot of helpers i.e. data storage, image optimization, realtime, etc. This would allow us to move fast. Supabase being open source would also allow us to self host if needed for regulatory purposes for example, or if the company goes bust.

In the event we have a bigger team or someone with the required expertise and time, then the best solution would be AWS. We could host our backend server in an auto scalable ec2 cluster, and have out DB hosted on RDS allowing us to scale. When we need storage we can use s3, etc.

These would probably be my two options. But their is a middle ground where if you want to avoid the complexities of AWS but retain all its benefits, there are many other companies that host their infra on AWS but make it alot easier to build on top of. e.g. Render or fly.io. Things like globally replicated databases are alot easier on these services vs AWS.

##### How would your database architecture look like?

For this specific app I would have the following tables:

User
id
name

Event
id
title
description
date
createdAt
ModifiedAt

eventsToUsers
userId
eventId

This table structure allows us to have as many users and events. Their is a mapping table to map multiple users to the same event, or multiple events to the same user.
We can add to this by making uniquness constraints to avoid duplicates, etc

##### How would you get around a potential conflict if multiple users edit the same event at the same time?

We can use the concept of optimisitc concurrency. For when we are about to edit the data, we record the current time, and perform our write. At the end of the transation if the lastModified time of the record is the same as what we recorded we save the transation. if it is not a conflict has taken place, and we have a few options. We can either overwrite the current changes, or send an error back to the user with the update data.

In this example it would be best to error out and send an update to the user with the new information of the event asking them to either resubmit it, take the new data into account
