import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SimpleITLogo from '../../assets/SimpleIT-logo.svg?react';
import TextLink from '../../components/TextLink';
import {
  TgBackButton,
  TgMainButton,
  tgWebApp,
} from '../../components/Telegram';
import { useSwitch } from '../../utils/hooks/switch';

import './style.scss';
import PhoneModal from './PhoneModal';
import EmailModal from './EmailModal';

const Contacts: FC = () => {
  const navigate = useNavigate();

  const [phoneModalOpen, openPhoneModal, closePhoneModal] = useSwitch();
  const [emailModalOpen, openEmailModal, closeEmailModal] = useSwitch();

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
          onClick={openPhoneModal}
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
          onClick={openEmailModal}
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
      <PhoneModal open={phoneModalOpen} onClose={closePhoneModal} />
      <EmailModal open={emailModalOpen} onClose={closeEmailModal} />
    </div>
  );
};

export default Contacts;
