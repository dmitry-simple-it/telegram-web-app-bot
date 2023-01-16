import { FC, useEffect, useRef, useState } from 'react';
import {
  useLocation,
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
import { MessageRecordsType } from './types';
import { useIsMount } from '../../../utils/hooks/isMount';
import SimpleITLogo from '../../../assets/SimpleIT-notebook.svg?react';
import ArrowRightSVG from '../../../assets/arrow-circle-right.svg?react';
import ProgressDots from '../../../components/ProgressDots';

import './style.scss';

type ServiceScreenProps = {
  messages: MessageRecordsType;
};

const GeneralServiceDescription: FC<ServiceScreenProps> = ({ messages }) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const messageParam = Number(searchParams.get('message'));
  const isMessageParamExists = !!searchParams.get('message');

  const isMounted = useIsMount();

  const [message, setMessage] = useState(messages[messageParam] || messages[0]);
  const [animateText, setAnimateText] = useState(navigationType !== 'POP');

  const screenPathnameRef = useRef(location.pathname);
  const logoRef = useRef<SVGElement>(null);

  const handleBackButton = () => navigate(-1);

  const handleMainButton = () => navigate('/contact_form');

  const handleNextButton = () => {
    if (messages.length - 1 > messageParam)
      setSearchParams([['message', `${messageParam + 1}`]]);
  };

  useEffect(() => {
    if (!isMounted) {
      if (!isMessageParamExists || messageParam < 0)
        setSearchParams([['message', '0']], { replace: true });

      if (messageParam > messages.length - 1)
        setSearchParams([['message', `${messages.length - 1}`]], {
          replace: true,
        });
    }
  }, [messageParam, messages, isMessageParamExists, setSearchParams]);

  useEffect(() => {
    isMessageParamExists &&
      messages[messageParam] &&
      setMessage(messages[messageParam]);
  }, [messages, isMessageParamExists, messageParam]);

  useEffect(() => {
    screenPathnameRef.current === location.pathname &&
      setAnimateText(navigationType !== 'POP');
  }, [navigationType, location.pathname]);

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
