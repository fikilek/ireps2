const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const functions = require("firebase-functions/v1");

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
	// log(`request`, request);

	const { uid, action } = request.data;
	// log(`uid`, uid);
	// log(`action`, action);

	const { auth } = request;
	// log(`auth`, { auth });

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
			// log(`updatedUserRecord ----`, updatedUserRecord);
			// log(`User Account succesfully ${action ? "DISABLED" : "ENABLED"} ......`);
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

exports.updateUserRole = onCall(async request => {
	const { data, auth } = request;

	const customClaims = { roles: data.roles };

	// convert roles controlled object into an array
	const rolesControlledArray = [];
	for (const role in customClaims.roles) {
		// console.log(`role`, role);
		if (customClaims.roles[role]) {
			rolesControlledArray.push(role);
		}
	}

	const claimUid = data.uid;

	// check if there is an auth object - if the user is authenticated
	if (!auth) {
		throw new functions.https.HttpsError(
			`Error in updateUserRole method. User not authenticated`
		);
	}

	// get current user auth uid
	const controllerUid = auth.uid;

	// get current user roles
	const rolesControllerObj = auth.token.roles;

	// convert roles controller object into an array
	const rolesControllerArray = [];
	for (const role in rolesControllerObj) {
		if (rolesControllerObj[role]) {
			rolesControllerArray.push(role);
		}
	}

	// validation 0: user cannot modify own roles
	if (controllerUid === claimUid) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"user CANNOT alter OWN role"
		);
	}

	// validation 1: manager is not allowed to change manager or supervisor. he can change guest, fieldworker or supervisor
	if (
		!rolesControllerArray.includes("manager") &&
		!rolesControllerArray.includes("superuser")
	) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`only manager or superuser can modify roles`
		);
	}

	// validation 2: user must have roles
	if (rolesControllerArray.length === 0) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`user has NO ROLE, CANNOT alter roles`
		);
	}

	return admin
		.auth()
		.setCustomUserClaims(claimUid, customClaims)
		.then(result => {
			return admin.auth().getUser(claimUid);
		})
		.then(userRecord => {
			return {
				userRecord,
			};
		})
		.catch(err => {
			console.log("Error updating custom claim:", err);
			return `${err.message}`;
		});
});
