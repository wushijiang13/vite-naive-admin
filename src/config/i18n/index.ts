import { createI18n } from 'vue-i18n'
import {enMessage,zhMessage} from './message/index.ts'

export const i18n:any = createI18n({
    legacy: false,
    locale: 'zh',
    // fallbackLocale: 'zh',
    messages: {
      zh:zhMessage,
      en: enMessage,
    }
})