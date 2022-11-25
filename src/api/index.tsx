import { tgWebApp } from '../components/Telegram';

const url = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}`;

// TODO: Move all API calls to backend
const tgManagerId =
  process.env.TG_MANAGER_ID || tgWebApp.initDataUnsafe.user?.id;

const callMethod = async <T extends Record<string, unknown>>(
  method: string,
  params: T,
) => {
  const methodUrl = Object.entries(params).reduce(
    (accum, [key, value], index) => {
      if (!index) return `${accum}?${key}=${value}`;
      return `${accum}&${key}=${value}`;
    },
    `${url}/${method}`,
  );

  try {
    const response = await fetch(methodUrl);
    return await response.json();
  } catch (error) {
    throw new Error('Не удалось передать сообщение');
  }
};

export const sendMessage = (data: {
  text: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  entities?: string;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: boolean;
  allow_sending_without_reply?: boolean;
}) =>
  callMethod('sendMessage', {
    chat_id: tgManagerId,
    ...data,
  });

export const sendDocument = async ({
  document,
}: {
  document: File | string;
}) => {
  try {
    const formData = new FormData();
    formData.append('chat_id', tgManagerId as unknown as string);
    formData.append('document', document);
    const response = await fetch(`${url}/sendDocument`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    throw new Error('Не удалось загрузить файл');
  }
};
