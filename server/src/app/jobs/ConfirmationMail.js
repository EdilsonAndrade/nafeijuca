import Cryptr from 'cryptr';
import pt from 'date-fns/locale/pt';
import { format, parseISO, addMinutes } from 'date-fns';
import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const cryptr = new Cryptr(process.env.CRYPTKEY);
    const { user } = data;

    const date = parseISO(user.expiration);
    const expirationDate = addMinutes(date, 60);
    await Mail.sendEmail({
      to:
        process.env.MAIL_FAKE !== ''
          ? `${user.name} -  <${process.env.MAIL_FAKE}>`
          : `${user.name} -  <${user.email}> `,
      subject: `Confirmação de e-mail/ ativação da conta Na Feijuca`,
      template: 'confirmation',
      context: {
        username: user.name,
        url: decodeURI(
          `${process.env.APP_URL}/users/${cryptr.encrypt(user.id)}/confirmation`
        ),
        expiration: format(expirationDate, "dd'/'MM'/'yyyy hh:MM'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new ConfirmationMail();
