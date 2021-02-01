import _get from 'lodash/get'
import { USER_ROLES } from '@/js/const/user-roles.const'

export class AccountRecord {
    constructor (record) {
        this._record = record

        this.email = _get(record, 'email', '')
        this.roleId = _get(record, 'account_type_id', USER_ROLES.general)
    }
}
