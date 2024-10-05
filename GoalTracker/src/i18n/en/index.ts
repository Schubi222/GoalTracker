import type { BaseTranslation } from '../i18n-types'

const en = {
  test: 'hello',
  format: {
    number: '{{0:Number|number}}',
    currency: '{{0:Number|currency}}'
  }
} satisfies BaseTranslation

export default en
