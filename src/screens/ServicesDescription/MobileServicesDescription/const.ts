import { MessagesRecordsType } from '../GeneralServiceDescription/types';

export const mobileMessagesTypes = [
  'initial',
  'additional',
  'techStack',
  'links',
] as const;

export const mobileMessages: MessagesRecordsType<typeof mobileMessagesTypes> = {
  initial: {
    text: 'Одно из наших направлений - разработка мобильных приложений. Опыт нашей команды позволит Вам реализовать даже самые нетривиальные проекты',
    buttonText: 'Далее',
    next: 'additional',
  },
  additional: {
    text: 'Приятным бонусом станет возможность не переплачивать за создание приложения для разных платформ (IOS/Android)',
    buttonText: 'Далее',
    next: 'techStack',
  },
  techStack: {
    text: 'Мы используем Современный и надежный фреймворк React Native, который позволяет создавать кроссплатформенные приложения и не требует написания отдельного кода для каждой из платформ.',
    buttonText: 'Далее',
    next: 'links',
  },
  links: {
    text:
      'Ознакомиться с открытыми примерами можно в нашем <a href="https://simple-it.pro/portfolio/all-our-projects/" target="_blank">портфолио</a>.\n' +
      '  Давайте обсудим Ваш проект? Это абсолютно бесплатно! Просто нажмите на кнопку ниже.',
    buttonText: 'Оставить заявку',
    next: null,
  },
};
