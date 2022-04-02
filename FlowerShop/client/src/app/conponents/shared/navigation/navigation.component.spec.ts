import { Path } from '../../../classes/path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set paths input property', () => {
    const paths: Path[] = [{ name: 'Home', routerLink: '/home' }];

    component.paths = paths;

    expect(component.paths[0].name).toBe('Home');
    expect(component.paths[0].routerLink).toBe('/home');
  });

  it('should render right navigation template', () => {
    const paths: Path[] = [
      { name: 'Home', routerLink: '/home' },
      { name: 'News', routerLink: '/news' },
    ];

    component.paths = paths;
    fixture.detectChanges();

    const navigationBlock = fixture.debugElement.query(By.css('.path'));
    expect(navigationBlock.children.length).toBe(2);

    const pathIteratorFirst = navigationBlock.children[0];
    const pathIteratorSecond = navigationBlock.children[1];
    expect(pathIteratorFirst.classes['path__iterator']).toBeTrue();
    expect(pathIteratorSecond.classes['path__iterator']).toBeTrue();

    const firstIteratorChildren = pathIteratorFirst.children;
    expect(firstIteratorChildren.length).toBe(2);
    expect(firstIteratorChildren[0].classes['path__link']).toBeTrue();
    expect(firstIteratorChildren[1].classes['path__separator']).toBeTrue();
    expect(firstIteratorChildren[0].properties.innerText).toBe('Home');

    const secondIteratorChildren = pathIteratorSecond.children;
    expect(secondIteratorChildren.length).toBe(1);
    expect(secondIteratorChildren[0].classes['path__link']).toBeTrue();
    expect(secondIteratorChildren[0].properties.innerText).toBe('News');
  });
});
