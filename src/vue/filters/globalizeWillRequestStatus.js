import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
import { globalize } from '@/vue/filters/globalize'

export function globalizeWillRequestStatus (value) {
  let translationId = ''
  switch (+value) {
    case WILL_REQUEST_STATUSES.approved: {
      translationId = 'filters.will-request-statuses.approved'
      break
    }
    case WILL_REQUEST_STATUSES.deleted: {
      translationId = 'filters.will-request-statuses.deleted'
      break
    }
    case WILL_REQUEST_STATUSES.rejected: {
      translationId = 'filters.will-request-statuses.rejected'
      break
    }
    case WILL_REQUEST_STATUSES.submitted: {
      translationId = 'filters.will-request-statuses.submitted'
      break
    }
    case WILL_REQUEST_STATUSES.notified: {
      translationId = 'filters.will-request-statuses.notified'
      break
    }
    case WILL_REQUEST_STATUSES.released: {
      translationId = 'filters.will-request-statuses.released'
      break
    }
    default: {
      translationId = 'filters.will-request-statuses.unknown'
      break
    }
  }
  return globalize(translationId)
}
