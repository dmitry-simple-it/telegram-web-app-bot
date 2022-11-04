import { AnchorHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

type TextLinkProps = {
  text: string;
  label?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const TextLink: FC<TextLinkProps> = ({ text, label, className, ...props }) => {
  return (
    <div className={classNames(classes.textLink, className)}>
      <div className={classes.textLink_linkWrapper}>
        <a className={classes.textLink_linkWrapper_text} {...props}>
          {text}
        </a>
        <div />
      </div>
      <label className={classes.textLink_label}>{label}</label>
    </div>
  );
};

export default TextLink;
