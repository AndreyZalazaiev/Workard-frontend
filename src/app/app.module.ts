import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatOptionModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';
import {Guard} from './guard/guard';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RoomComponent } from './room/room.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import { EmployeeComponent } from './employee/employee.component';
import { RoomFormComponent } from './room/room-form/room-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'ngx-easy-table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';


const appRoutes: Routes = [
  { path: 'login',component: AuthComponent },
  {path:'register',component:RegisterComponent},
  {path:'',component:CompanyComponent,canActivate:[Guard]},
  ]
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainNavComponent,
    RegisterComponent,
    CompanyComponent,
    RoomComponent,
    CompanyFormComponent,
    ConfirmationDialogComponent,
    EmployeeComponent,
    RoomFormComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false, relativeLinkResolution: 'legacy'} // <-- debugging purposes only
      // <-- debugging purposes only
    ),
    NgCircleProgressModule.forRoot({
      radius: 50,
      outerStrokeWidth: 12,
      innerStrokeWidth: 6,
      outerStrokeColor: '#3F51B5',
      innerStrokeColor: '#FF6E40',
      animationDuration: 300,
      subtitleFontSize: '14',
      subtitle: [
        'fullness'
      ],
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    MatExpansionModule,
    MatTabsModule,
    NgbModule,
    TableModule,
    MatPaginatorModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
