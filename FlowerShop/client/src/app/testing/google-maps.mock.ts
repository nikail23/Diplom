import { MapsAPILoader } from '@agm/core';
import { MapTypeId } from '@agm/core/services/google-maps-types';

export class MapsAPILoaderTesting extends MapsAPILoader {
  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export class MockAutocomplete implements google.maps.places.Autocomplete {
  getBounds(): google.maps.LatLngBounds {
    return new google.maps.LatLngBounds();
  }
  getPlace(): google.maps.places.PlaceResult {
    return {name: ''};
  }
  setBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): void {

  }
  setComponentRestrictions(restrictions: google.maps.places.ComponentRestrictions): void {

  }
  setFields(fields: string[] | undefined): void {

  }
  setOptions(options: google.maps.places.AutocompleteOptions): void {

  }
  setTypes(types: string[]): void {

  }
  addListener(eventName: string, handler: google.maps.MVCEventHandler<this, any[]>): google.maps.MapsEventListener {
    return {remove: () => {}};
  }
  bindTo(key: string, target: google.maps.MVCObject, targetKey?: string, noNotify?: boolean): void {

  }
  changed(key: string): void {

  }
  get(key: string) {

  }
  notify(key: string): void {

  }
  set(key: string, value: any): void {

  }
  setValues(values: any): void {

  }
  unbind(key: string): void {

  }
  unbindAll(): void {}

}
export const mockAutocomplete = new MockAutocomplete();

export const geocoderSpy = jasmine.createSpyObj<google.maps.Geocoder>('Geocoder', ['geocode']);
geocoderSpy.geocode.and.callFake(() => {});
