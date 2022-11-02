import { MouseEvent } from 'react';

import classes from './style.module.scss';

type ParticleType = 'square' | 'symbol' | 'shadow' | 'line' | 'logo';

function removeParticle(event: AnimationPlaybackEvent) {
  const effect = event.target as unknown as KeyframeEffect;
  effect.target?.remove();
}

function createParticle(
  x: number,
  y: number,
  type: ParticleType,
  color: string,
) {
  const particle = document.createElement('particle');
  particle.className = classes.particle;
  document.body.appendChild(particle);
  const destinationX = (Math.random() - 0.5) * 300;
  const destinationY = (Math.random() - 0.5) * 300;
  const size = Math.floor(Math.random() * 30 + 8);
  let width: number | string = size;
  let height: number | string = size;
  let rotation = Math.random() * 520;
  let delay = Math.random() * 200;
  switch (type) {
    case 'square':
      particle.style.background = color; // Цвет квадратов
      particle.style.border = '1px solid white'; // Бордюр квадратов
      break;
    case 'symbol':
      particle.innerHTML = [
        '&#9729;',
        '&#9733;',
        '&#9787;',
        '&#9829;',
        '&#9884;',
        '&#9834;',
        '&#10054;',
      ][Math.floor(Math.random() * 7)]; // Символы
      particle.style.color = color; // Цвет символов
      particle.style.fontSize = `${Math.random() * 24 + 30}px`; // Размер символов
      width = height = 'auto';
      break;
    case 'logo':
      particle.style.backgroundImage =
        'url(https://atuin.ru/images/favicon.png)'; // Ссылка на картинку
      break;
    case 'shadow':
      particle.style.boxShadow = `0 0 ${Math.floor(
        Math.random() * 10 + 10,
      )}px ${color}`; // Тень
      particle.style.background = color;
      particle.style.borderRadius = '50%'; // Радиус
      width = height = Math.random() * 5 + 4; // Размеры
      break;
    case 'line':
      particle.style.background = color; // Цвет линий
      height = 1; // Размер
      rotation += 1000;
      delay = Math.random() * 1000;
      break;
  }
  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  const animation = particle.animate(
    [
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
          y + destinationY
        }px) rotate(${rotation}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 1000 + 5000, // Продолжительность всех эффектов
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: delay,
    },
  );
  animation.onfinish = removeParticle;
}

export function animateParticles(
  event: MouseEvent<SVGElement>,
  type: ParticleType,
  color: string,
) {
  let amount = 30;
  switch (type) {
    case 'shadow':
    case 'line':
      amount = 60;
      break;
  }
  if (!event.target) return;
  const target = event.target as HTMLElement;
  if (event.clientX === 0 && event.clientY === 0) {
    const bbox = target.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 30; i++) {
      createParticle(x, y, type, color);
    }
  } else {
    for (let i = 0; i < amount; i++) {
      createParticle(event.clientX, event.clientY, type, color);
    }
  }
}
