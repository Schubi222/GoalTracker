import type { FormattersInitializer } from 'typesafe-i18n'
import type { Locales, Formatters } from './i18n-types'
import { number } from 'typesafe-i18n/formatters'

export const initFormatters: FormattersInitializer<Locales, Formatters> = (locale: Locales) => {
  const formatters: Formatters = {
    Number: number(locale),
    Currency: number(locale, { style: 'currency', currency: 'EUR' })
  }

  return formatters
}
