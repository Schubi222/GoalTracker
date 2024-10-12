import type { BaseTranslation } from '../i18n-types'

const en = {
  test: 'hello',
  format: {
    number: '{{number:Number|number}}',
    currency: '{{number:Number|currency}}'
  }
} satisfies BaseTranslation

export default en
