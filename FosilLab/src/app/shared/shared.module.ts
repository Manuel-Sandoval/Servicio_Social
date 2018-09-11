import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '../material.module';
import {AppNavComponent} from './app-nav/app-nav.component';
import {MessageComponent} from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    AppNavComponent,
    MessageComponent
  ],
  exports: [
    AppNavComponent,
    MessageComponent
  ],
  entryComponents: [MessageComponent]
})
export class SharedModule {
}
