import config from 'config';
import pino from 'pino';

const level = config.get<string>('logLevel');

const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level,
});

export default log;
