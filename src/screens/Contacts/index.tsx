import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SimpleITLogo from '../../assets/SimpleIT-logo.svg?react';
import TextLink from '../../components/TextLink';
import {
  TgBackButton,
  TgMainButton,
  tgWebApp,
} from '../../components/Telegram';

import './style.scss';

const Contacts: FC = () => {
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => navigate(-1), []);
  const handleNavigateToContactForm = useCallback(
    () => navigate('/contact_form'),
    [],
  );

  useEffect(() => {
    tgWebApp.expand();
  }, []);

  return (
    <div className="screen contacts">
      <SimpleITLogo className="contacts_logo-image" />
      <div className="screen_group">
        <TextLink
          className="screen_group_text-input"
          text="+7 (499) 113-76-31"
          label="Телефон"
          target="_blank"
          href={`${process.env.SITE_URL}/phone.html`}
        />
        <TextLink
          className="screen_group_text-input"
          text="@SimpleIT_Devs"
          label="Имя пользователя"
          href="https://telegram.me/SimpleIT_Devs"
        />
        <TextLink
          className="screen_group_text-input"
          text="hello@simple-it.pro"
          label="E-mail"
          target="_blank"
          href={`${process.env.SITE_URL}/email.html`}
        />
        <TextLink
          className="screen_group_text-input"
          text="simple-it.pro"
          label="Сайт"
          target="_blank"
          href="https://simple-it.pro"
        />
      </div>
      <TgBackButton onClick={handleBackClick} />
      <TgMainButton
        onClick={handleNavigateToContactForm}
        text="Оставить заявку"
      />
    </div>
  );
};

export default Contacts;
