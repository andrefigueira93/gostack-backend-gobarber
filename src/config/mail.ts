interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: `${process.env.MAIL_DRIVER}` || 'ethereal',
  defaults: {
    from: {
      email: process.env.MAIL_SENDER_EMAIL,
      name: process.env.MAIL_SENDER_NAME,
    },
  },
} as IMailConfig;
