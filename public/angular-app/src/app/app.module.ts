import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipComponent } from './ship/ship.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    ShipsComponent,
    ShipComponent,
    HomeComponent,
    SearchComponent,
    ErrorPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // issue 4
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "ships",
        component: ShipsComponent
      },
      {
        path: "ships/:shipId",
        component: ShipComponent
      },
      {
        path: "search",
        component: SearchComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
