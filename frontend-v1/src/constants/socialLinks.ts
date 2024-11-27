import { VkIcon, OkIcon, InstagramIcon, TelegramIcon } from 'assets/social/index';

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
        name: 'Телеграмм',
        url: 'https://t.me',
        icon: TelegramIcon
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com',
        icon: InstagramIcon
    }
];
