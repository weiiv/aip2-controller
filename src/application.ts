import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer';
import { LoggingBindings, LoggingComponent } from '@loopback/logging';
import { LoggerOptions, format } from 'winston';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import * as path from 'path';
import { MySequence } from './sequence';
import * as helper from './helpers';
import { ApiKeyAuthenticationStrategy } from './strategies/apikey.strategy';

export { ApplicationConfig };

export class DilabapiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Mount authentication system
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, ApiKeyAuthenticationStrategy);

    // Set up default home page
    //this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      //path: '/explorer',
      indexTemplatePath: path.resolve(__dirname, '../public/explorer.ejs'),
    });
    this.component(RestExplorerComponent);

    // Set up logging
    this.configure(LoggingBindings.COMPONENT).to({
      enableFluent: false, // default to true
      enableHttpAccessLog: true, // default to true
    });

    this.configure(LoggingBindings.WINSTON_HTTP_ACCESS_LOGGER).to({
      format: ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] :response-time ms',
    });
    this.configure<LoggerOptions>(LoggingBindings.WINSTON_LOGGER).to({
      level: helper.getEnv('LOG_LEVEL'),
      format: format.json(),
      defaultMeta: { date: `[${new Date().toISOString()}]` },
    });
    this.component(LoggingComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
