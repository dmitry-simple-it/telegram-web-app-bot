import { FC, useEffect, useMemo, useRef, useState } from 'react';
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
import { MessageType } from './types';
import SimpleITLogo from '../../../assets/SimpleIT-notebook.svg?react';
import ArrowRightSVG from '../../../assets/arrow-circle-right.svg?react';
import ProgressDots from '../../../components/ProgressDots';

import './style.scss';

type ServiceScreenProps = {
  messages: Array<MessageType>;
};

const GeneralServiceDescription: FC<ServiceScreenProps> = ({ messages }) => {
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const messageParam = Number(searchParams.get('message'));

  const [animateText, setAnimateText] = useState(navigationType !== 'POP');

  const logoRef = useRef<SVGElement>(null);
  const prevMessageRef = useRef<MessageType>(messages[0]);

  const message = useMemo(
    () =>
      messageParam
        ? messages[messageParam] || prevMessageRef.current
        : messages[0],
    [messageParam],
  );

  const handleBackButton = () => navigate(-1);

  const handleMainButton = () => navigate('/contact_form');

  const handleNextButton = () => {
    if (messages.length - 1 > messageParam)
      setSearchParams([['message', `${messageParam + 1}`]]);
  };

  useEffect(() => {
    prevMessageRef.current = message;
  }, [message]);

  useEffect(() => {
    setAnimateText(navigationType !== 'POP');
  }, [navigationType]);

  return (
    <div className="screen service-description">
      <div className="service-description_message">
        <CloudDynamicText
          animate={animateText}
          textSpeed={4}
          refOnElemToPoint={logoRef}
          text={message.text}
        />
        <SimpleITLogo
          className="service-description_message_logo-image"
          ref={logoRef}
        />
      </div>

      <div className="service-description_controls">
        <div className="service-description_controls_empty" />
        <ProgressDots
          dotsNum={Object.entries(messages).length}
          activeDot={messageParam}
        />
        <ArrowRightSVG
          width={40}
          height={40}
          fill={themeParams.linkColor}
          onClick={handleNextButton}
        />
      </div>

      <TgBackButton onClick={handleBackButton} />
      {message.buttonText && (
        <TgMainButton onClick={handleMainButton} text={message.buttonText} />
      )}
    </div>
  );
};

export default GeneralServiceDescription;
