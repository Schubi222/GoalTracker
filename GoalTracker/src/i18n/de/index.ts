import type { Translation } from '../i18n-types'

const de = {
  test: 'hallo',
  format: {
    number: '{{0|Number}}',
    currency: '{{0|Currency}}'
  }
} satisfies Translation

export default de
