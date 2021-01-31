import _get from 'lodash/get'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'

export class WillRequestRecord {
    constructor (record) {
        this._record = record

        this.address = _get(record, 'address', '')
        this.did = _get(record, 'did', '')
        this.documentHash = _get(record, 'documentHash', '')
        this.documentLink = _get(record, 'documentLink', '')
        this.email = _get(record, 'email', '')
        this.fullName = _get(record, 'fullName', '')
        this.passportId = _get(record, 'passportId', '')
        this.requestId = _get(record, 'requestId', '')
        this.statusId = _get(record, 'statusId', WILL_REQUEST_STATUSES.submitted)
        this.userId = _get(record, 'userId', '')
    }
}
