import nodemailerhbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import { resolve } from 'path';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mailconfig';

class Mail {
  constructor() {
    const { host, auth, port, secure } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          partialsDir: resolve(viewPath, 'partials'),
          layoutsDir: resolve(viewPath, 'layouts'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendEmail(message) {
    this.transporter
      .sendMail({
        ...mailConfig.default,
        ...message,
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default new Mail();
