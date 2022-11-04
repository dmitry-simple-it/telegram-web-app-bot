import { FC, MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SimpleITLogo from '../../assets/SimpleIT-logo.svg?react';
import TextLink from '../../components/TextLink';

import './style.scss';
import { useTgBackButton } from '../../utils/hooks/tgBackButton';
import { useTgMainButton } from '../../utils/hooks/tgMainButton';

const Contacts: FC = () => {
  const navigate = useNavigate();

  const handleNavigateBack = useCallback(() => navigate(-1), []);
  const handleNavigateToContactForm = useCallback(
    () => navigate('/contact_form'),
    [],
  );

  const handleUsernameClick: MouseEventHandler = (event) => {
    const target = event.target as HTMLAnchorElement;
    navigator.clipboard.writeText(target.text);
  };

  useTgBackButton(handleNavigateBack);
  useTgMainButton({
    text: 'Оставить заявку',
    onClick: handleNavigateToContactForm,
  });

  return (
    <div className="screen contacts">
      <SimpleITLogo className="contacts_logo-image" />
      <div className="screen_group">
        <div className="screen_group_title">Контакты для связи</div>
        <TextLink
          className="screen_group_text-input"
          text="+7 (499) 113-76-31"
          label="Телефон"
          href="tel:+74991137631"
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
          href="mailto:hello@simple-it.pro"
        />
        <TextLink
          className="screen_group_text-input"
          text="simple-it.pro"
          label="Сайт"
          href="https://simple-it.pro"
        />
      </div>
    </div>
  );
};

export default Contacts;
