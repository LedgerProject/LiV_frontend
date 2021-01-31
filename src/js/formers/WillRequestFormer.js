import { Former } from '@/js/formers/Former'
import { WillRequestRecord } from '@/js/records/will-request.record'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'

export class WillRequestFormer extends Former {
    attrs = this.attrs || this._defaultAttrs

    get _defaultAttrs () {
        return {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            middleName: '',
            address: '',
            passportNumber: '',
            status: WILL_REQUEST_STATUSES.submitted,
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
            case WillRequestRecord:
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
        this.attrs.firstName = source.firstName
        this.attrs.lastName = source.lastName
        this.attrs.middleName = source.middleName
        this.attrs.address = source.address
        this.attrs.passportNumber = source.passportNumber
        this.attrs.status = source.status
    }

    _buildOpCreate () {
        const opts = {

        }
        return opts
    }

    _buildOpUpdate () {
        const opts = {

        }
        return opts
    }
}
