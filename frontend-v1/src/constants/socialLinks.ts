import { VkIcon, OkIcon, YouTubeIcon, TelegramIcon } from 'assets/social/index';

interface SocialLink {
    name: string;
    url: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: 'Вконтакте',
        url: 'https://vk.com',
        icon: VkIcon
    },
    {
        name: 'Одноклассники',
        url: 'https://ok.ru',
        icon: OkIcon
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com',
        icon: YouTubeIcon
    },
    {
        name: 'Телеграмм',
        url: 'https://t.me',
        icon: TelegramIcon
    }
];
