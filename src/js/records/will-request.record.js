import _get from 'lodash/get'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
import { AccountRecord } from '@/js/records/account.record'

export class WillRequestRecord {
  constructor (record) {
    this._record = record

    this.id = _get(record, 'id', '')
    this.documentHash = _get(record, 'documentHash', '')
    this.documentLink = _get(record, 'documentLink', '')
    const creator = _get(record, 'creator', '')
    this.creator = new AccountRecord(creator)
    const recipient = _get(record, 'recipient', '')
    this.recipient = new AccountRecord(recipient)
    this.statusId = _get(record, 'statusId', WILL_REQUEST_STATUSES.submitted)
  }
}
