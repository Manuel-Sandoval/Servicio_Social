import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';

import {AppDashboardComponent} from './app-dashboard/app-dashboard.component';
import {PagesComponent} from './pages.component';
import {FosilComponent} from './fosil/fosil.component';
import {EonesComponent} from './eones/eones.component';
import {EpocasComponent} from './epocas/epocas.component';
import {ErasComponent} from './eras/eras.component';
import {EstadosComponent} from './estados/estados.component';
import {MunicipiosComponent} from './municipios/municipios.component';
import {PeriodosComponent} from './periodos/periodos.component';
import {PaisesComponent} from './paises/paises.component';
import {UsuariosComponent} from './usuarios/usuarios.component';

import {PAGES_ROUTES} from './pages.routes';
import { UsuarioComponent } from './usuario/usuario.component';
import { EonComponent } from './eon/eon.component';
import { EraComponent } from './era/era.component';
import { PaisComponent } from './pais/pais.component';
import { EstadoComponent } from './estado/estado.component';
import { MunicipioComponent } from './municipio/municipio.component';
import { EpocaComponent } from './epoca/epoca.component';
import { PeriodoComponent } from './periodo/periodo.component';

@NgModule({
  declarations: [
    PagesComponent,
    AppDashboardComponent,
    FosilComponent,
    PaisesComponent,
    EonesComponent,
    EpocasComponent,
    ErasComponent,
    EstadosComponent,
    MunicipiosComponent,
    PeriodosComponent,
    UsuariosComponent,
    UsuarioComponent,
    EonComponent,
    EraComponent,
    PaisComponent,
    EstadoComponent,
    MunicipioComponent,
    EpocaComponent,
    PeriodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    PAGES_ROUTES
  ]
})
export class PagesModule {
}
