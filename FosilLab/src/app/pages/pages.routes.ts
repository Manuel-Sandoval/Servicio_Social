import {RouterModule, Routes} from '@angular/router';

import {LoginGuard} from '../services/login.guard';
import {AdminGuard} from '../services/admin.guard';

import {PagesComponent} from './pages.component';
import {AppDashboardComponent} from './app-dashboard/app-dashboard.component';
import {FosilComponent} from './fosil/fosil.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {EonesComponent} from './eones/eones.component';
import {EonComponent} from './eon/eon.component';
import {ErasComponent} from './eras/eras.component';
import {EraComponent} from './era/era.component';
import {PaisesComponent} from './paises/paises.component';
import {PaisComponent} from './pais/pais.component';
import {EstadosComponent} from './estados/estados.component';
import {EstadoComponent} from './estado/estado.component';
import {MunicipiosComponent} from './municipios/municipios.component';
import {MunicipioComponent} from './municipio/municipio.component';
import {EpocasComponent} from './epocas/epocas.component';
import {EpocaComponent} from './epoca/epoca.component';
import {PeriodosComponent} from './periodos/periodos.component';
import {PeriodoComponent} from './periodo/periodo.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {path: 'dashboard', component: AppDashboardComponent},
      {path: 'fosil/:id', component: FosilComponent},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard]},
      {path: 'usuarios/:id', component: UsuarioComponent, canActivate: [AdminGuard]},
      {path: 'eones', component: EonesComponent},
      {path: 'eones/:id', component: EonComponent},
      {path: 'eras', component: ErasComponent},
      {path: 'eras/:id', component: EraComponent},
      {path: 'paises', component: PaisesComponent},
      {path: 'paises/:id', component: PaisComponent},
      {path: 'estados', component: EstadosComponent},
      {path: 'estados/:id', component: EstadoComponent},
      {path: 'municipios', component: MunicipiosComponent},
      {path: 'municipios/:id', component: MunicipioComponent},
      {path: 'epocas', component: EpocasComponent},
      {path: 'epocas/:id', component: EpocaComponent},
      {path: 'periodos', component: PeriodosComponent},
      {path: 'periodos/:id', component: PeriodoComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
