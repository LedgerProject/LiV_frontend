import _get from 'lodash/get'
import { USER_ROLES } from '@/js/const/user-roles.const'

export class AccountRecord {
  constructor (record) {
    this._record = record

    this.id = _get(record, 'user_id', '')
    this.email = _get(record, 'email', '')
    this.role = _get(record, 'account_type_id', USER_ROLES.general)
    this.address = _get(record, 'address')
    this.firstName = _get(record, 'first_name')
    this.middleName = _get(record, 'middle_name')
    this.lastName = _get(record, 'last_name')
    this.passportNumber = _get(record, 'passport_number')
  }

  get fullName () {
    return `${this.firstName} ${this.middleName} ${this.lastName}`
  }
}
