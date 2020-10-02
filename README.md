# Firebase function sample app

## Overview

I used Express.js with Firebase Cloud Functions and Firebase Hosting to build REST APIs.

Here are some things that I applied in this project:

- Authentication/Authorization: Firebase Authentication
- Database: Cloud Firestore
- Web framework: Express.js
- Deploy and hosting: Firebase Hosting and Cloud Functions

For more information about to write and deploy function, you can reference this link: https://firebase.google.com/docs/hosting/serverless-overview

## Getting Started

### Create a Firebase project on the [Firebase Console](https://console.firebase.google.com)

### Enable the authentication method
In this project, I used email and password authentication. You can enable the method that you want to use by going to the **Authentication** section in the **SIGN-IN METHOD** tab.

### Add the Firebase Admin SDK to your server
To add the Firebase Admin SDK to project please follow the instructions in this link: https://firebase.google.com/docs/admin/setup

**Note**: In this project, to authorize via service account, I explicitly passed the path to the service account key in code. You can find that config in firebase.admin.js.

## API list
Here is the list of APIs

### User APIs
| Method | URL | Role | Description |
| --- | --- | --- | --- |
| GET | /api​/users/uid/:uid | Admin | Get user by uid |
| GET | /api​/users/email/:email | Admin | Get user by email |
| POST | /api​/users/create-sysadmin |  | Create sysadmin for this app |
| POST | /api​/users | Admin | Create a new user |
| PUT | /api​/users | Admin | Update user |
| DELETE | /api​/users/:uid | Admin | Delete user |
| POST | /api​/users/change-password |  | Change user password |
| POST | /api​/users/assign-roles | Admin | Assign roles to user |

### Restaurant APIs
| Method | URL | Role | Description |
| --- | --- | --- | --- |
| GET | /api​/restaurants | Admin | Get all restaurans |
| GET | /api​/restaurants/id/:id | Admin | Get restaurant by id |
| GET | /api​/restaurants/code/:code |  | Get restaurant by code |
| POST | /api​/restaurants | Admin | Create a new restaurant |
| PUT | /api​/restaurants | Admin | Update restaurant |
| DELETE | /api​/restaurants/:uid | Admin | Delete restaurant |

## Debugging in VS Code #1

Please follow some steps below to setup debugging in VS Code

### Install the firebase-tools package

We need to install the firebase-tools package:

	npm install -g firebase-tools

### Running Firebase emulator

To run Firebase emulator, we use command below:

	firebase emulators:start

### Debugging configuration

Click on the run/debug icon in VS Code on the left side. Then click the gear to edit the launch.json file.

	{
		"version": "0.2.0",
		"configurations": [
			{
				"type": "node",
				"request": "attach",
				"name": "Attach Program",
				"processId": "${command:PickProcess}"
			}
		]
	}

### Starting debugging

When we start debugging, a new command panel will be displayed. We need to pick functionEmulatorRuntime process.

## Debugging in VS Code #2

If you have followed those steps above but it does not work. Don't be supprise, I also encountered the same problem.

How to fix it? We will run the app directly without Firebase function emulator. Just update the launch.json file as shown below:

	{
		"version": "0.2.0",
		"configurations": [
			{
				"type": "node",
				"request": "launch",
				"name": "Launch Program",
				"skipFiles": [
					"<node_internals>/**"
				],
				"program": "${workspaceFolder}\\functions\\src\\bin\\www"
			}
		]
	}

## Deployment

### Login to Firebase account

Log into Firebase using your Google account by running the following command:

	firebase login

### Use project aliases

As you can see in `.firebaserc`, I currently have two project aliases (one for development and the other for production).

View a list of currently defined aliases for your project directory

	firebase use

The CLI uses this project as the currently "active project"

	firebase use PROJECT_ID|ALIAS

#### Apply production configuration

Before you deploy to production, don't forget to apply the production configuration.

1. firebase-adminsdk.json
2. config.json

**Note**: If your Firebase account is in Free - Spark Plan. To deploy the cloud function, you should change node version to 8

        "engines": {
        	"node": "8"
        }

Reference link: https://firebase.google.com/pricing

#### Deploy to a Firebase project

When things are looking good, run `firebase deploy` to upload the latest snapshot to our servers.

Reference links:

https://firebase.google.com/docs/cli

https://firebase.google.com/docs/hosting/quickstart

https://firebase.google.com/docs/hosting/serverless-overview
