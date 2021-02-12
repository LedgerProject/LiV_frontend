import _get from 'lodash/get'
import { USER_ROLES } from '@/js/const/user-roles.const'

export class AccountRecord {
  constructor (record) {
    this._record = record

    this.id = _get(record, 'user_id', '')
    this.email = _get(record, 'email', '')
    this.role = _get(record, 'account_Type_id', USER_ROLES.general)
  }
}
