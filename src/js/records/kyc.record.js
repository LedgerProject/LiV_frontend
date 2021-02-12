import _get from 'lodash/get'

export class KycRecord {
    constructor (record) {
        this._record = record

        this.id = _get(record, 'id')
    }
}
