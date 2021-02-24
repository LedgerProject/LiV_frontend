import _get from 'lodash/get'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'

export class WillRequestRecord {
    constructor (record) {
        this._record = record

        this.id = _get(record, 'id', '')

        this.address = _get(record, 'address', '')
        this.did = _get(record, 'did', '')
        this.documentHash = _get(record, 'documentHash', '')
        this.documentLink = _get(record, 'documentLink', '')
        this.email = _get(record, 'email', '')
        this.firstName = _get(record, 'firstName', '')
        this.middleName = _get(record, 'middleName', '')
        this.lastName = _get(record, 'lastName', '')
        this.passportId = _get(record, 'passportId', '')
        this.recipientId = _get(record, 'recipientId', '')
        this.statusId = _get(record, 'statusId', WILL_REQUEST_STATUSES.submitted)
        this.userId = _get(record, 'userId', '')
    }

    get fullName () {
        return `${this.firstName} ${this.middleName} ${this.lastName}`
    }
}
