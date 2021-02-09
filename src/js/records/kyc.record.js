import _get from 'lodash/get'

export class KycRecord {
  constructor (record) {
    this._record = record

    this.id = _get(record, 'id')
    this.firstName = _get(record, 'first_name')
    this.middleName = _get(record, 'middle_name')
    this.lastName = _get(record, 'last_name')
    this.address = _get(record, 'address')
    this.country = _get(record, 'country')
    this.city = _get(record, 'city')
    this.postalCode = _get(record, 'postal_code')
    this.passportNumber = _get(record, 'passport_number')
    this.about = _get(record, 'about')
  }
}
