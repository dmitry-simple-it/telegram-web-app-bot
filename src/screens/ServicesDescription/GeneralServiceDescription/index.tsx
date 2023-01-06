import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useNavigate,
  useNavigationType,
  useSearchParams,
} from 'react-router-dom';

import CloudDynamicText from '../../../components/CloudDynamicText';
import {
  TgBackButton,
  TgMainButton,
  themeParams,
} from '../../../components/Telegram';
import { MessageType, MessagesRecordsType } from './types';
import SimpleITLogo from '../../../assets/SimpleIT-notebook.svg?react';
import ArrowRightSVG from '../../../assets/arrow-circle-right.svg?react';

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

  const handleNextButton = () => {
    if (message.next) setSearchParams([['message', message.next]]);
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
        textSpeed={3}
        refOnElemToPoint={logoRef}
        text={message.text}
      />

      <SimpleITLogo className="service-description_logo-image" ref={logoRef} />

      <div className="next-button-container">
        {message.next && (
          <div className="next-button" onClick={handleNextButton}>
            <ArrowRightSVG
              width={80}
              height={80}
              fill={themeParams.linkColor}
            />
          </div>
        )}
      </div>

      <TgBackButton onClick={() => navigate(-1)} />
      <TgMainButton
        onClick={() => navigate('/contact_form')}
        text="Оставить заявку"
      />
    </div>
  );
};

export default GeneralServiceDescription;
