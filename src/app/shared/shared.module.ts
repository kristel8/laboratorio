import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TableComponent } from './components/table/table/table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from './components/button/button.component';
import { ButtonModule } from 'primeng/button';
import { StyleButtonDirective } from './directives/style-button.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { SidebarTemplateComponent } from './components/sidebar-template/sidebar-template.component';
import { NavbarTemplateComponent } from './components/navbar-template/navbar-template.component';
import { FooterTemplateComponent } from './components/footer-template/footer-template.component';
import { FlagsPipe } from './pipes/flags.pipe';
import { StyleEstadoDirective } from './directives/style-estado.directive';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from './components/loading/loading.component';
import { BodyComponent } from './components/body/body.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToUpperCaseDirective } from './directives/toUpperCase.directive';
import { TipoPagoIconPipe } from './pipes/tipo-pago.pipe';
import { OnlyTextDirective } from './directives/text-only.directive';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

registerLocaleData(localeEsPe); // Registrar localización peruana

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    TableComponent,
    ButtonComponent,
    StyleButtonDirective,
    NumbersOnlyDirective,
    OnlyTextDirective,
    ToUpperCaseDirective,
    SidebarTemplateComponent,
    NavbarTemplateComponent,
    FooterTemplateComponent,
    FlagsPipe,
    TipoPagoIconPipe,
    SafeHtmlPipe,
    StyleEstadoDirective,
    LoadingComponent,
    BodyComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ToastModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TableComponent,
    ButtonComponent,
    SidebarTemplateComponent,
    LoadingComponent,
    StyleButtonDirective,
    OnlyTextDirective,
    NumbersOnlyDirective,
    ToUpperCaseDirective,
    StyleEstadoDirective,
    LoaderComponent,
    TipoPagoIconPipe,
    SafeHtmlPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    MessageService,
    CurrencyPipe]
})
export class SharedModule { }
