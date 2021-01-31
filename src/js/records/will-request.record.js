import _get from 'lodash/get'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'

export class WillRequestRecord {
    constructor (record) {
        this._record = record

        this.id = _get(record, '')
        this.email = _get(record, '')
        this.firstName = _get(record, '')
        this.lastName = _get(record, '')
        this.middleName = _get(record, '')
        this.address = _get(record, '')
        this.passportNumber = _get(record, '')
        this.status = _get(record, 'status', WILL_REQUEST_STATUSES.submitted)
    }
}
