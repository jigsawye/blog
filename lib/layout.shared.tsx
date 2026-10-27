import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import Logo from '@/public/logo.svg';
import { i18n, localizedPath, type Locale } from './i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: 'English' },
    'zh-TW': {
      displayName: '繁體中文',
      'Choose a language(language switcher)': '選擇語言',
      'Choose a language(language switcher)(aria-label)': '選擇語言',
      'Toggle Menu(mobile menu)(aria-label)': '切換選單',
      'Toggle Theme(theme switcher)(aria-label)': '切換主題',
      'Light(theme switcher)(aria-label)': '淺色',
      'Dark(theme switcher)(aria-label)': '深色',
      'System(theme switcher)(aria-label)': '系統設定',
      'Table of Contents(inline table of contents)': '文章目錄',
      'On this page(table of contents)': '本頁內容',
      'No Headings(table of contents)': '沒有章節標題',
      'Copy Text(code block)(aria-label)': '複製程式碼',
      'Copied Text(code block)(aria-label)': '已複製程式碼',
      'Copy Anchor Link(heading anchor)(aria-label)': '複製章節連結',
      'Copied Anchor Link(heading anchor)(aria-label)': '已複製章節連結',
      'Image Viewer(image zoom)(aria-label)': '圖片檢視器',
      'Close(image zoom)(aria-label)': '關閉圖片',
      'Previous Image(image zoom)(aria-label)': '上一張圖片',
      'Next Image(image zoom)(aria-label)': '下一張圖片',
    },
  });

export const logo = (
  <>
    <Image alt="JIGSAWYE" src={Logo} width={20} height={20} aria-label="JIGSAWYE" />
  </>
);

export function baseOptions(locale: Locale): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      url: localizedPath('/', locale),
      title: (
        <>
          {logo}
          <span className="font-medium">JIGSAWYE</span>
        </>
      ),
    },
  };
}
