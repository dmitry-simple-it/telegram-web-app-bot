import React, { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SimpleITLogo from '../../assets/SimpleIT-logo.svg?react';
import TextLink from '../../components/TextLink';
import { useTgBackButton } from '../../utils/hooks/tgBackButton';
import { useTgMainButton } from '../../utils/hooks/tgMainButton';
import PhoneCallModal from './PhoneCallModal';
import { useSwitch } from '../../utils/hooks/switch';
import EmailModal from './EmailModal';
import customToast from '../../components/CustomToast';
import { WebApp } from '../../utils/tgWebApp';

import './style.scss';

const usernameToastID = 'usernameToastID';

const Contacts: FC = () => {
  const [isPhoneModalOpen, openPhoneModal, closePhoneModal] = useSwitch();
  const [isEmailModalOpen, openEmailModal, closeEmailModal] = useSwitch();

  const navigate = useNavigate();

  const handleNavigateBack = useCallback(() => navigate(-1), []);
  const handleNavigateToContactForm = useCallback(
    () => navigate('/contact_form'),
    [],
  );

  const handleUsernameClick: MouseEventHandler = async (event) => {
    const target = event.target as HTMLAnchorElement;
    await navigator.clipboard.writeText(target.text);
    customToast({
      text: 'Имя пользователя скопировано',
      toastId: usernameToastID,
    });
  };

  useTgBackButton(handleNavigateBack);
  useTgMainButton({
    text: 'Оставить заявку',
    onClick: handleNavigateToContactForm,
  });

  useEffect(() => {
    WebApp.expand();
  });

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
          onClick={handleUsernameClick}
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
        <PhoneCallModal open={isPhoneModalOpen} onClose={closePhoneModal} />
        <EmailModal open={isEmailModalOpen} onClose={closeEmailModal} />
      </div>
    </div>
  );
};

export default Contacts;
