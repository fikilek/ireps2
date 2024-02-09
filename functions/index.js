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

exports.listAllUsers = functions.https.onCall(async (data, context) => {
	let users = [];
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
			return `Error listing users: ${error.meesage}`;
		});
});

exports.disableUserAcc = functions.https.onCall(async (data, context) => {
	const { uid, action } = data;
	return admin
		.auth()
		.updateUser(uid, {
			disabled: action,
		})
		.then(() => {
			return `User Account succesfully ${action ? "ENABLED" : "DISABLED"} `;
		})
		.catch(error => {
			return `Error enabling/disabling users account: ${error.message}`;
		});
});
