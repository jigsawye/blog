import type { Locale } from './i18n';

export const zawa = {
  name: 'zawa.archive',
  url: 'https://zawa.tw',
  translations: {
    en: {
      heading: 'Side Projects',
      description: 'A curated store for pre-owned Japanese menswear.',
      role: 'I build the website and handle product curation, brand direction, and daily operations.',
    },
    'zh-TW': {
      heading: '個人專案',
      description: '精選二手日牌男裝，讓喜愛的衣物繼續流動。',
      role: '負責網站開發、選品、品牌與日常營運，將對服裝的興趣做成實際運作的商店。',
    },
  } satisfies Record<Locale, Record<string, string>>,
};
