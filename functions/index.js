const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const functions = require("firebase-functions/v1");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// Update service provider when a user is created. This is done by adding 'user'
// credentials(uid, name, email and phone) onto a 'user' array in the 'serviceProvider' document.
// TODO: take care of the situation where the user migrates from one sp to another or is deleted
exports.updateServiceProvider = onDocumentCreated(
	"users/{spId}",
	async event => {
		console.log(`event`, event);

		// step X: Get an object representing the document created
		const snapshot = event.data;
		if (!snapshot) {
			console.log("No data associated with the event");
			return;
		}
		const data = snapshot.data();
		console.log(`data------------------------------`, data);

		// step X: update the 'serviceProvider' document with the user details
		const spRef = db.collection("serviceProviders").doc(data.spId);
		await spRef.update({
			users: FieldValue.arrayUnion({
				name: data?.name,
				email: data?.email,
				phone: data?.phoneNumber,
				uid: data?.metadata?.createdByUid
			}),
		});
		// console.log(`unionRes`, unionRes);
	}
);

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
				users.push({ id: userRecord.uid, ...userRecord });
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
	console.log(`auth`, auth);
	console.log(`auth.token.email`, auth.token.email);

	const { uid: claimUid, changeSet } = data;

	const customClaims = { roles: data.roles };

	// convert roles controlled object into an array
	const rolesControlledArray = [];
	for (const role in customClaims.roles) {
		// console.log(`role`, role);
		if (customClaims.roles[role]) {
			rolesControlledArray.push(role);
		}
	}

	// validation rules 1: only authenticated user is allowed to set a role
	if (!auth) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"only authenticated user is allowed to set a role"
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

	// validation rule 2: user cannot modify own roles
	if (controllerUid === claimUid) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"user CANNOT alter OWN role"
		);
	}

	// validation rule 3: only manager or superuser can modify roles
	if (
		!rolesControllerArray.includes("manager") &&
		!rolesControllerArray.includes("superuser")
	) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`only manager or superuser can modify roles`
		);
	}

	// validation rule 4: user has NO ROLE, CANNOT alter roles
	if (rolesControllerArray.length === 0) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`user has NO ROLE, CANNOT alter roles`
		);
	}

	// validation rule 5: only fikilekentane@gmail.com can set a superuser rle
	if (
		changeSet["superuser"]["change"] === true &&
		auth.token.email !== "fikilekentane@gmail.com"
	) {
		throw new functions.https.HttpsError(
			`permission-denied`,
			`user is NOT ALLOWED to modify a SUPERUSER role`
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
