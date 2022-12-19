import { FC, RefObject, useEffect, useRef, useState } from 'react';

import { useResize } from '../../utils/hooks/resize';
import { isHTMLValid } from '../../utils/isValidHTML';
import { isClosedTag } from './utils';
import classes from './style.module.scss';

type CloudDynamicTextProps = {
  text: string;
  refOnElemToPoint: RefObject<Element>;
  animate?: boolean;
  textSpeed?: number;
  className?: string;
};

const CloudDynamicText: FC<CloudDynamicTextProps> = ({
  text,
  animate = false,
  textSpeed = 1,
  refOnElemToPoint,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [arrowLeft, setArrowLeft] = useState(0);

  const cloudWrapperRef = useRef<HTMLDivElement>(null);

  const screenSize = useResize();

  useEffect(() => {
    if (!animate) {
      setCurrentText(text);
      return;
    }

    setCurrentText('');
    const timeout = 100 / textSpeed;
    const symbolInMillisecond = textSpeed / 100;
    let timeoutId: NodeJS.Timeout;
    let prevTime = Date.now();

    const isValidHTML = isHTMLValid(`<div>${text}</div>`);
    function changeCurrentText(displayedText: string) {
      if (displayedText.length >= text.length) return;
      const currentTime = Date.now();
      const diff = currentTime - prevTime;
      prevTime = currentTime;
      const newSymbolsLength = diff * symbolInMillisecond;
      let newText = text.slice(
        displayedText.length,
        displayedText.length + newSymbolsLength,
      );

      if (isValidHTML) {
        while (isClosedTag(newText)) {
          if (text.length === displayedText.length + newText.length) break;
          newText += text[displayedText.length + newText.length];
        }
      }
      setCurrentText(displayedText + newText);
      timeoutId = setTimeout(
        () => changeCurrentText(displayedText + newText),
        timeout,
      );
    }

    timeoutId = setTimeout(() => changeCurrentText(''), timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, textSpeed, animate]);

  useEffect(() => {
    if (cloudWrapperRef.current && refOnElemToPoint.current) {
      const arrowSizes = cloudWrapperRef.current.getBoundingClientRect();
      const elemSizes = refOnElemToPoint.current.getBoundingClientRect();
      setArrowLeft(elemSizes.width / 2 + elemSizes.left - arrowSizes.left);
    }
  }, [screenSize]);

  return (
    <div className={classes.cloudDynamic} ref={cloudWrapperRef}>
      <div
        className={classes.cloudDynamic_text}
        dangerouslySetInnerHTML={{ __html: currentText }}
      ></div>
      <div className={classes.cloudDynamic_arrow} style={{ left: arrowLeft }} />
    </div>
  );
};

export default CloudDynamicText;
