import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { USER_ROLES } from '@/js/const/user-roles.const'

export class AccountRecord {
  constructor (record) {
    this._record = record

    this.id = _get(record, 'id', '')
    this.email = _get(record, 'email', '')
    this.role = _get(record, 'role', USER_ROLES.general)
    this.address = _get(record, 'address')
    this.firstName = _get(record, 'firstName')
    this.birthday = _get(record, 'birthday')
    this.secondName = _get(record, 'secondName')
    this.lastName = _get(record, 'lastName')
    this.nif = _get(record, 'nif')
  }

  get fullName () {
    return `${this.firstName} ${this.secondName} ${this.lastName}`
  }

  get isKycExist () {
    return !_isEmpty(this.address) &&
      !_isEmpty(this.firstName) &&
      !_isEmpty(this.secondName) &&
      !_isEmpty(this.birthday) &&
      !_isEmpty(this.lastName) &&
      !_isEmpty(this.nif)
  }
}
