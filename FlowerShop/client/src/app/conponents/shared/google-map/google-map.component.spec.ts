import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { geocoderSpy, MapsAPILoaderTesting, mockAutocomplete } from '../../../testing/google-maps.mock';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapComponent } from './google-map.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeEach(async () => {
    spyOn(window['google']['maps']['places'], 'Autocomplete').and.returnValue(mockAutocomplete);
    spyOn(window['google']['maps'], 'Geocoder').and.returnValue(geocoderSpy);
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapComponent ],
      imports: [ AgmCoreModule, ReactiveFormsModule, FormsModule ],
      providers: [{provide: MapsAPILoader, useClass: MapsAPILoaderTesting}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });
});
