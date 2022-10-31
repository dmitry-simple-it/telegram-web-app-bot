import { FC, useState, useMemo, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import FileInput from '../../components/FileInput';

import { useTgBackButton } from '../../utils/hooks/tgBackButton';
import { useTgMainButton } from '../../utils/hooks/tgMainButton';

import Textarea from '../../components/Textarea';
import { WebApp } from '../../utils/tgWebApp';

import './style.scss';
import { sendDocument, sendMessage } from '../../api';

const ContactForm: FC = () => {
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const initialFormData = useMemo(() => {
    const user = WebApp.initDataUnsafe.user;
    if (!user) return {};

    return {
      name: `${user.first_name} ${user.last_name}`,
      username: user.username,
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const navigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      WebApp.MainButton.setParams({ is_active: false });
      let text = `*Имя:* ${data.name}`;
      if (data.organizationName)
        text += `\n*Имя организации:* ${data.organizationName}`;
      text += `\n*Email:* ${data.email}`;
      text += `\n*Username:* ${data.username}`;
      text += `\n*Описание проекта:* ${data.projectDescription}`;
      await sendMessage({
        parse_mode: 'MarkdownV2',
        text: encodeURI(text.replace(/\./g, '\\.')),
      });

      const file = data.fileAttachment.item(0);
      if (file) await sendDocument({ document: file });

      WebApp.close();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Что-то пошло не так',
      );
    } finally {
      WebApp.MainButton.setParams({ is_active: true });
    }
  });

  useTgBackButton(navigateBack);
  useTgMainButton({
    onClick: handleFormSubmit,
    text: 'Отправить',
  });

  useEffect(() => {
    const resetFormError = () => setFormError('');

    const timeoutId = setTimeout(resetFormError, 2000);

    return () => clearTimeout(timeoutId);
  }, [formError]);

  return (
    <form className="contact-form" onSubmit={handleFormSubmit}>
      <div className="contact-form_group">
        <div className="contact-form_title">Информация о вас</div>
        <TextInput
          error={errors.name?.message}
          className="contact-form_text-input"
          placeholder="Ваше имя"
          {...register('name', { required: 'Имя обязательный параметр' })}
        />
        <TextInput
          error={errors.organizationName?.message}
          className="contact-form_text-input"
          placeholder="Название организации (необязательно)"
          {...register('organizationName')}
        />
        <TextInput
          error={errors.email?.message}
          className="contact-form_text-input"
          placeholder="Email для связи"
          {...register('email', {
            required: 'Email обязательный параметр',
            validate: (value) => {
              const regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/u;
              if (!value.match(regex)) return 'Некорректный формат email';
            },
          })}
        />
        <TextInput
          error={errors.username?.message}
          className="contact-form_text-input"
          placeholder="Ник в телеграмм"
          {...register('username', {
            required: 'Имя пользователя обязательный параметр',
          })}
        />
      </div>
      <div className="contact-form_group">
        <div className="contact-form_title">Информация о проекте</div>
        <Textarea
          placeholder="Краткое описание проекта"
          error={errors.projectDescription?.message}
          className="contact-form_textarea"
          {...register('projectDescription', {
            required: 'Краткое описание проекта обязательно',
          })}
        />
        <FileInput
          error={errors.fileAttachment?.message}
          className="contact-form_file-input"
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
      </div>
      {formError && (
        <div className="contact-form_error">Ошибка: {formError}</div>
      )}
    </form>
  );
};

export default ContactForm;
