import _get from 'lodash/get'
import { USER_ROLES } from '@/js/const/user-roles.const'

export class AccountRecord {
  constructor (record) {
    this._record = record

    this.id = _get(record, 'id', '')
    this.email = _get(record, 'email', '')
    this.role = _get(record, 'role', USER_ROLES.general)
  }
}
