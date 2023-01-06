import { FC, useState, useMemo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import FileInput from '../../components/FileInput';
import TextArea from '../../components/TextArea';
import { sendDocument, sendMessage } from '../../api';
import { isMobileOrTablet } from '../../utils/isMobileOrTablet';
import {
  TgBackButton,
  TgMainButton,
  tgWebApp,
} from '../../components/Telegram';

import './style.scss';

const ContactForm: FC = () => {
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const initialFormData = useMemo(() => {
    const user = tgWebApp.initDataUnsafe.user;
    if (!user) return {};

    return {
      name: `${user.first_name} ${user.last_name}`,
      username: user.username,
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<{
    name: string;
    organizationName: string;
    email: string;
    username: string;
    projectDescription: string;
    fileAttachment: FileList;
  }>({
    defaultValues: initialFormData,
  });

  const handleBackClick = useCallback(() => navigate(-1), [navigate]);

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      let text = `<b>Имя:</b> ${data.name}`;
      if (data.organizationName)
        text += `\n<b>Имя организации:</b> ${data.organizationName}`;
      text += `\n<b>Email:</b> ${data.email}`;
      text += `\n<b>Username:</b> @${data.username}`;
      text += `\n<b>Описание проекта:</b> ${data.projectDescription}`;
      await sendMessage({
        parse_mode: 'HTML',
        text: encodeURI(text),
      });

      if (data.fileAttachment) {
        const file = data.fileAttachment.item(0);
        if (file) await sendDocument({ document: file });
      }

      tgWebApp.disableClosingConfirmation();
      tgWebApp.close();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Что-то пошло не так',
      );
    }
  });

  useEffect(() => {
    const resetFormError = () => setFormError('');

    const timeoutId = setTimeout(resetFormError, 2000);

    return () => clearTimeout(timeoutId);
  }, [formError]);

  useEffect(() => {
    tgWebApp.expand();

    return () => {
      tgWebApp.disableClosingConfirmation();
    };
  }, []);

  useEffect(() => {
    if (isDirty) tgWebApp.enableClosingConfirmation();
  }, [isDirty]);

  return (
    <form className="screen contact-form" onSubmit={handleFormSubmit}>
      <div className="screen_group">
        <div className="screen_group_title">Информация о вас</div>
        <TextInput
          error={errors.name?.message}
          className="screen_group_text-input"
          label="Ваше имя"
          {...register('name', {
            required: 'Обязательный параметр',
            validate: (value) => !value.trim() && 'Обязательный параметр',
          })}
        />
        <TextInput
          error={errors.organizationName?.message}
          className="screen_group_text-input"
          label="Название организации (необязательно)"
          {...register('organizationName')}
        />
        <TextInput
          error={errors.email?.message}
          className="screen_group_text-input"
          autoCapitalize="none"
          label="Email для связи"
          {...register('email', {
            required: 'Обязательный параметр',
            validate: (value) => {
              if (!value.trim()) return 'Обязательный параметр';
              const regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/u;
              if (!value.match(regex)) return 'Некорректный формат';
            },
          })}
        />
        <TextInput
          error={errors.username?.message}
          className="screen_group_text-input"
          label="Ник в телеграм"
          {...register('username', {
            required: 'Имя пользователя обязательный параметр',
            validate: (value) =>
              !value.trim() && 'Имя пользователя обязательный параметр',
          })}
        />
      </div>
      <div className="screen_group">
        <div className="screen_group_title">Информация о проекте</div>
        <TextArea
          label="Краткое описание"
          error={errors.projectDescription?.message}
          className="screen_group_textarea"
          {...register('projectDescription', {
            required: 'Краткое описание проекта обязательно',
            validate: (value) => !value.trim() && 'Описание обязательно',
          })}
        />
        {isMobileOrTablet && (
          <FileInput
            error={errors.fileAttachment?.message}
            className="screen_group_file-input"
            {...register('fileAttachment', {
              validate: (fileList) => {
                if (!fileList.length) return;

                const file = fileList.item(0);
                if (!file) return;

                const fileSizeMB = file.size / (1024 * 1024);
                if (fileSizeMB > 50)
                  return 'Размер файла не должен превышать 50 мегабайт';
              },
            })}
          />
        )}
      </div>
      {formError && <div className="screen_error">Ошибка: {formError}</div>}
      <TgBackButton onClick={handleBackClick} />
      <TgMainButton
        onClick={handleFormSubmit}
        text="Отправить"
        active={!isSubmitting}
        progress={isSubmitting}
      />
    </form>
  );
};

export default ContactForm;
