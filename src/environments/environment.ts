// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  firebase: {
    projectId: 'crm-poc-48b12',
    appId: '1:664408853958:web:9d16c89fa9aff91ad476c7',
    storageBucket: 'crm-poc-48b12.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyA5S2T3oZ3VsLF4xtlbJxQX7qBvy31oogw',
    authDomain: 'crm-poc-48b12.firebaseapp.com',
    messagingSenderId: '664408853958',
  },
  production: false,
  useEmulator: true,
  FIRESTORE_EMULATOR_HOST:"localhost:8080"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
