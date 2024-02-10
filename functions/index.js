const { onCall, HttpsError } = require("firebase-functions/v2/https");

const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const functions = require("firebase-functions/v1");
const { log } = require("firebase-functions/logger");

initializeApp();

exports.addDefaultUserRole = functions.auth.user().onCreate(async user => {
	let uid = user.uid;

	const customClaims = {
		roles: {
			guest: true,
			fieldworker: false,
			supervisor: false,
			manager: false,
			superuser: false,
		},
	};

	return admin
		.auth()
		.setCustomUserClaims(uid, customClaims)
		.then(() => {
			return null;
		})
		.catch(err => {
			console.log("Error setting custom claim:", err.message);
			return err.msg;
		});
});

exports.listAllUsers = onCall(async request => {
	let users = [];

	if (!request.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new HttpsError(`Error in listAllUsers. User not authenticated`);
	}

	return admin
		.auth()
		.listUsers(1000)
		.then(listUsersResult => {
			listUsersResult.users.forEach(userRecord => {
				users.push(userRecord);
			});
			return users;
		})
		.catch(error => {
			return `Error listing users: ${error.message}`;
		});
});

exports.disableUserAcc = onCall(async request => {
	log(`request`, request);

	const { uid, action } = request.data;
	log(`uid`, uid);
	log(`action`, action);

	const { auth } = request;
	log(`auth`, { auth });

	if (!request.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new HttpsError(
			`Error in disableUserAcc method. User not authenticated`
		);
	}

	return admin
		.auth()
		.updateUser(uid, {
			disabled: action,
		})
		.then(updatedUserRecord => {
			log(`updatedUserRecord ----`, updatedUserRecord);
			log(`User Account succesfully ${action ? "DISABLED" : "ENABLED"} ......`);
			return {
				result: `User Account with uid [${uid}] succesfully [${
					action ? "DISABLED" : "ENABLED"
				}] `,
				success: true,
			};
		})
		.catch(error => {
			error(`Error enabling/disabling users account: ${error.message}`, error);
			return `Error enabling/disabling users account: ${error.message}`;
		});
});
