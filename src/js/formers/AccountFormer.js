import { Former } from '@/js/formers/Former'
import { AccountRecord } from '@/js/records/account.record'

export class AccountFormer extends Former {
  attrs = this.attrs || this._defaultAttrs

  get _defaultAttrs () {
    return {
      id: '',
      email: '',
      role: '',
      address: '',
      firstName: '',
      middleName: '',
      lastName: '',
      passportNumber: ''
    }
  }

  _opBuilder = this._opBuilder || this._buildOpCreate

  get isCreateOpBuilder () {
    return this._opBuilder === this._buildOpCreate
  }

  get isUpdateOpBuilder () {
    return this._opBuilder === this._buildOpUpdate
  }

  useCreateOpBuilder () {
    this._opBuilder = this._buildOpCreate
    return this
  }

  useUpdateOpBuilder () {
    this._opBuilder = this._buildOpUpdate
    return this
  }

  buildOps () {
    const op = this._opBuilder()
    return op
  }

  populate (source) {
    switch (source.constructor) {
      case AccountRecord:
        this._populateFromRecord(source)
        break
      default:
        throw new TypeError('Unknown source type')
    }
    return this
  }

  _populateFromRecord (source) {
    this.useUpdateOpBuilder()
    this.attrs = this.attrs || this._defaultAttrs

    this.attrs.id = source.id
    this.attrs.email = source.email
    this.attrs.role = source.role
    this.attrs.address = source.address
    this.attrs.firstName = source.firstName
    this.attrs.middleName = source.middleName
    this.attrs.lastName = source.lastName
    this.attrs.passportNumber = source.passportNumber
  }

  _buildOpCreate () {
    const fd = new FormData()
    fd.append('email', this.attrs.email)
    fd.append('first_name', this.attrs.firstName)
    fd.append('middle_name', this.attrs.middleName)
    fd.append('last_name', this.attrs.middleName)
    fd.append('address', this.attrs.address)
    fd.append('passport_number', this.attrs.passportNumber)
    return fd
  }

  _buildOpUpdate () {
    const fd = new FormData()
    fd.append('email', this.attrs.email)
    fd.append('first_name', this.attrs.firstName)
    fd.append('middle_name', this.attrs.middleName)
    fd.append('last_name', this.attrs.middleName)
    fd.append('address', this.attrs.address)
    fd.append('passport_number', this.attrs.passportNumber)
    return fd
  }
}
