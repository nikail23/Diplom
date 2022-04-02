import { PopupComponent } from './../popup/popup.component';
import { environment } from 'src/environments/environment.prod';
import {
  Component,
  OnInit,
  ElementRef,
  NgZone,
  ViewChild,
  Input,
} from '@angular/core';
import { LatLngLiteral, MapsAPILoader, MouseEvent } from '@agm/core';
import {
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  isFormControlHasError,
  isFormControlInvalid,
} from 'src/app/classes/forms';
import { paths } from './delivery-area';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  public readonly KmlLayerUrl = environment.googleMapsApi.kmlLayerUrl;

  public isFormControlInvalid = isFormControlInvalid;
  public isFormControlHasError = isFormControlHasError;

  @Input() control?: AbstractControl = new FormControl();

  public mapOptions = {
    latitude: 53.900293,
    longitude: 27.557667,
    zoom: 5,
    marker: {
      latitude: 53.900293,
      longitude: 27.557667,
      isPlaced: false,
      icon: {
        url: '../../../../assets/google-maps/marker.png',
      },
    },
  };

  private geocoder?: google.maps.Geocoder;

  @ViewChild('search')
  private searchInput?: ElementRef;

  @ViewChild(PopupComponent)
  private popup?: PopupComponent;

  private isFirstLoad: boolean = true;

  constructor(private mapsApiLoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges.subscribe((value) => {
        if (this.isFirstLoad) {
          this.control?.patchValue(value, { emitEvent: false });
          this.setLocationByAddress(this.control?.value);
          this.isFirstLoad = false;
        }
      });
    }

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchInput?.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const location: LatLngLiteral = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          if (this.checkInDeliveryArea(location)) {
            this.control?.setValue(place.formatted_address);
            this.mapOptions.marker.latitude = place.geometry.location.lat();
            this.mapOptions.marker.longitude = place.geometry.location.lng();
            this.mapOptions.marker.isPlaced = true;
            this.mapOptions.zoom = 12;
            this.recenterMap();
            this.setAddressByLocation();
          } else {
            this.showDeliveryAreaError();
          }
        });
      });
    });
  }

  public mapClickEventHandler(mouseEvent: MouseEvent) {
    if (this.checkInDeliveryArea(mouseEvent.coords)) {
      this.mapOptions.marker.latitude = mouseEvent.coords.lat;
      this.mapOptions.marker.longitude = mouseEvent.coords.lng;
      this.mapOptions.marker.isPlaced = true;
      this.recenterMap();
      this.setAddressByLocation();
    } else {
      this.showDeliveryAreaError();
    }
  }

  private checkInDeliveryArea(location: LatLngLiteral): boolean {
    const deliveryAreaPolygon = new google.maps.Polygon({ paths });
    const point = new google.maps.LatLng(location.lat, location.lng);

    if (
      google.maps.geometry.poly.containsLocation(point, deliveryAreaPolygon)
    ) {
      return true;
    }
    return false;
  }

  private setLocationByAddress(address: string) {
    const geocoderRequest: google.maps.GeocoderRequest = { address };
    this.geocoder?.geocode(geocoderRequest, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        this.mapOptions.marker.latitude = results[0].geometry.location.lat();
        this.mapOptions.marker.longitude = results[0].geometry.location.lng();
        this.mapOptions.marker.isPlaced = true;
      }
    });
  }

  private setAddressByLocation() {
    const location = new google.maps.LatLng(
      this.mapOptions.marker.latitude,
      this.mapOptions.marker.longitude
    );
    const geocoderRequest: google.maps.GeocoderRequest = { location };
    this.geocoder?.geocode(geocoderRequest, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        this.control?.setValue(results[0].formatted_address);
      } else {
        this.control?.setValue('');
      }
    });
  }

  private recenterMap() {
    this.mapOptions.latitude = this.mapOptions.marker.latitude;
    this.mapOptions.longitude = this.mapOptions.marker.longitude;
  }

  private showDeliveryAreaError() {
    this.control?.setValue('');
    this.popup?.show(
      'Sorry, we cannot deliver outside the delivery zone.',
      true
    );
  }
}
