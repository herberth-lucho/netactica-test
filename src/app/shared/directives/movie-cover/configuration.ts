import { SafeUrl } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';
export const CONFIGURATION = new InjectionToken<Configuration>('TEXT_VALUES');
export interface Configuration {
  url: SafeUrl;
  class: string;
}
