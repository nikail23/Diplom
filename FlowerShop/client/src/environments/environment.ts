// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    url: '/api/'
  },
  googleMapsApi: {
    key: 'AIzaSyDA0KwCakQXgp3q1rJLhSRLh2L3CWsvUh8',
    kmlLayerUrl: 'https://www.dropbox.com/s/cwr0vqw0ozfzr5c/Flower%20Shop.kml?dl=1'
  },
  stripe: {
    key: 'pk_test_51JCHjNDOmUi0GX61HsV9ISkpXLZ0F0iAf9KjJhyhf3RlsdCf062Vf5jpOD4bUwrbnV246xpekRjSScfe8lPNV7eF00YKMa72sG',
    email: 'angtrainx@gmail.com'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
