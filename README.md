# Firebase function sample app
Backend API and host microservices with Cloud Functions

To add the Firebase Admin SDK to project please follow the instructions in this link: https://firebase.google.com/docs/admin/setup

Note: Currently, to authorize via service account. I explicitly pass the path to the service account key in code.

## Debugging in VS Code 1

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

## Debugging in VS Code 2

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

View a list of currently defined aliases for your project directory

	firebase use

The CLI uses this project as the currently "active project"

	firebase use PROJECT_ID|ALIAS

#### Apply production configuration

1. firebase-adminsdk.json
2. config.json
3. Change node version to 10

        "engines": {
        	"node": "10"
        }

#### Deploy to a Firebase project

When things are looking good, run `firebase deploy` to upload the latest snapshot to our servers.

Reference links:

https://firebase.google.com/docs/cli

https://firebase.google.com/docs/hosting/quickstart

https://firebase.google.com/docs/hosting/serverless-overview
