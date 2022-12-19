import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useNavigate,
  useNavigationType,
  useSearchParams,
} from 'react-router-dom';

import CloudDynamicText from '../../../components/CloudDynamicText';
import { TgBackButton, TgMainButton } from '../../../components/Telegram';
import { MessageType, MessagesRecordsType } from './types';
import SimpleITLogo from '../../../assets/SimpleIT-notebook.svg?react';

import './style.scss';

type ServiceScreenProps<T extends readonly [string, ...string[]]> = {
  messages: MessagesRecordsType<T>;
  messageTypes: T;
};

const GeneralServiceDescription = <T extends readonly [string, ...string[]]>({
  messages,
  messageTypes,
}: ServiceScreenProps<T>) => {
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const messageParam = searchParams.get('message');

  const [animateText, setAnimateText] = useState(navigationType !== 'POP');

  const logoRef = useRef<SVGElement>(null);
  const prevMessageRef = useRef<MessageType<T[number]>>(
    messages[messageTypes[0] as T[number]],
  );

  const message = useMemo(
    () =>
      messageParam
        ? messages[messageParam as T[number]] || prevMessageRef.current
        : messages[messageTypes[0] as T[number]],
    [messageParam],
  );

  const handleBackButtonClick = () => navigate(-1);

  const handleMainButtonClick = () => {
    if (!message.next) return navigate('/contact_form');
    else setSearchParams([['message', message.next]]);
  };

  useEffect(() => {
    prevMessageRef.current = message;
  }, [message]);

  useEffect(() => {
    setAnimateText(navigationType !== 'POP');
  }, [navigationType]);

  return (
    <div className="screen service-description">
      <CloudDynamicText
        animate={animateText}
        textSpeed={5}
        refOnElemToPoint={logoRef}
        text={message.text}
      />
      <SimpleITLogo className="service-description_logo-image" ref={logoRef} />
      <TgBackButton onClick={handleBackButtonClick} />
      <TgMainButton onClick={handleMainButtonClick} text={message.buttonText} />
    </div>
  );
};

export default GeneralServiceDescription;
