import { experiences as en, type Experience } from './experience.en';
import { experiences as zhTW } from './experience.zh-TW';
import type { Locale } from './i18n';

export const experiences = { en, 'zh-TW': zhTW } satisfies Record<Locale, Experience[]>;
