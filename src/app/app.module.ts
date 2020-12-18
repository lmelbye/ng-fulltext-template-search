import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ContainerComponent } from './container/container.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './container/users/users.component';
import { InventoryComponent } from './container/inventory/inventory.component';
import { GenerelComponent } from './container/generel/generel.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContainerComponent,
    UsersComponent,
    InventoryComponent,
    GenerelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
