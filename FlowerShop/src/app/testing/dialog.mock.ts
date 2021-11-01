import { MatDialog } from '@angular/material/dialog';

export const dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
