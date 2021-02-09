import { Former } from '@/js/formers/Former'
import { KycRecord } from '@/js/records/kyc.record'
import _cloneDeep from 'lodash/cloneDeep'

export class KycFormer extends Former {
  attrs = this.attrs || this._defaultAttrs
  _initAttrs = _cloneDeep(this.attrs)

  get _defaultAttrs () {
    return {
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      country: '',
      city: '',
      postalCode: '',
      passportNumber: '',
      about: '',
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

  async buildOps () {
    const op = await this._opBuilder()
    return op
  }

  populate (source) {
    switch (source.constructor) {
      case KycRecord:
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
    this.attrs.firstName = source.firstName
    this.attrs.middleName = source.middleName
    this.attrs.lastName = source.lastName
    this.attrs.address = source.address
    this.attrs.country = source.country
    this.attrs.city = source.city
    this.attrs.postalCode = source.postalCode
    this.attrs.passportNumber = source.passportNumber
    this.attrs.about = source.about
  }

  _buildOpCreate () {
    let opts = {}
    opts = {
      id: this.attrs.id,
      first_name: this.attrs.firstName,
      middle_name: this.attrs.middleName,
      last_name: this.attrs.lastName,
      address: this.attrs.address,
      country: this.attrs.country,
      city: this.attrs.city,
      postal_code: this.attrs.postalCode,
      passport_number: this.attrs.passportNumber,
      about: this.attrs.about,
    }
    return opts
  }

  _buildOpUpdate () {
    let opts = {}
    opts = {
      id: this.attrs.id,
      first_name: this.attrs.firstName,
      middle_name: this.attrs.middleName,
      last_name: this.attrs.lastName,
      address: this.attrs.address,
      country: this.attrs.country,
      city: this.attrs.city,
      postal_code: this.attrs.postalCode,
      passport_number: this.attrs.passportNumber,
      about: this.attrs.about,
    }
    return opts
  }
}
