import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ImgBBUploadService } from './services/imgbbUpload';

const MODULES = [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule];

const MODULES_WITH_PROVIDERS = [];

const COMPONENTS = [];

const DIRECTIVES = [];

const PIPES = [SafeUrlPipe];

const SERVICES = [ImgBBUploadService];

const GUARDS = [];

const PROVIDERS = [];

@NgModule({
  imports: [...MODULES, ...MODULES_WITH_PROVIDERS],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...SERVICES, ...GUARDS, ...PROVIDERS, ...PIPES],
    };
  }
}
