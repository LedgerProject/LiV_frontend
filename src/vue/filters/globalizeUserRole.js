import { USER_ROLES } from '@/js/const/user-roles.const'
import { globalize } from '@/vue/filters/globalize'

export function globalizeUserRole (value) {
  let translationId = ''
  switch (+value) {
    case USER_ROLES.general: {
      translationId = 'filters.user-roles.general'
      break
    }
    case USER_ROLES.registry: {
      translationId = 'filters.user-roles.registry'
      break
    }
    case USER_ROLES.notary: {
      translationId = 'filters.user-roles.notary'
      break
    }
    default: {
      translationId = 'filters.user-roles.unknown'
      break
    }
  }
  return globalize(translationId)
}
