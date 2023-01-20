import { HomeComponent } from './home/home.component';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {

    const appce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('app-root1', appce);

    const ce = createCustomElement(HomeComponent, {injector: this.injector});
    customElements.define('angular-element2', ce);
  }
}
