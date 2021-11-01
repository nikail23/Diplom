import { DomSanitizer } from '@angular/platform-browser';


export const sanitizerSpy = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', ['bypassSecurityTrustResourceUrl', 'sanitize', 'bypassSecurityTrustUrl']);
sanitizerSpy.sanitize.and.returnValue('');
sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue('');
sanitizerSpy.bypassSecurityTrustUrl.and.returnValue('');
