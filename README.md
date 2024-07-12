
# Wallet App

A simple wallet app made using NextJS. Initialized using Turborepo.
  

## Local Setup

Run the following commands:
  

```sh

npm  install

turbo  dev

```

  

or to only run the user app (which is working)

```sh

cd  apps/user-app

npm  install

npm  run  dev

```

To run the bank webhook (need to authorize transactions manually for now.)

```sh

cd  apps/bank-webhook

npm  run  dev

```

## What's inside?  

This Turborepo includes the following packages/apps:

### Apps and Packages

#### Apps

-  `user-app`: user app of the wallet application
-  `merchant-app`: merchant app of the application (not completed)
-  `bank-webhook`: backend server used to authorize transactions, acts as a bank
 
#### Packages

-  `@repo/ui`: React component library shared by different apps in the `apps` folder
-  `@repo/db`: database configuration shared by different apps in the `apps` folder
-  `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Languages and Technologies
NextJS, Turborepo, Typescript, Prisma with PostgreSQL, Tailwind.
