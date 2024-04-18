import { ConfigurableModuleBuilder } from '@nestjs/common';
export interface Options {
  datasourceUrl: string;
}
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<Options>().build();
