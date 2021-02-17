import { Former } from '@/js/formers/Former'
import { WillRequestRecord } from '@/js/records/will-request.record'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
import cloneDeep from 'lodash/cloneDeep'

export class WillRequestFormer extends Former {
    attrs = this.attrs || this._defaultAttrs
    _initAttrs = cloneDeep(this.attrs)

    get _defaultAttrs () {
        return {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            middleName: '',
            address: '',
            passportNumber: '',
            statusId: WILL_REQUEST_STATUSES.submitted,
            document: null,
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
        this.attrs.passportNumber = source.passportId
        this.attrs.statusId = source.statusId
    }

    _buildOpCreate () {
        const fd = new FormData()
        fd.append('email', this.attrs.email)
        fd.append('firstName', this.attrs.firstName)
        fd.append('middleName', this.attrs.middleName)
        fd.append('lastName', this.attrs.lastName)
        fd.append('address', this.attrs.address)
        fd.append('passportNumber', this.attrs.passportNumber)
        fd.append('document', 'this.attrs.document')
        return fd
        // let opts = {}
        // opts = {
        //     email: this.attrs.email,
        //     firstName: this.attrs.firstName,
        //     middleName: this.attrs.middleName,
        //     lastName: this.attrs.lastName,
        //     address: this.attrs.address,
        //     passportNumber: this.attrs.passportNumber,
        //     document: 'this.attrs.document',
        // }
        // return opts
    }

    _buildOpUpdate () {
        const fd = new FormData()
        fd.append('email', this.attrs.email)
        fd.append('firstName', this.attrs.firstName)
        fd.append('middleName', this.attrs.middleName)
        fd.append('lastName', this.attrs.lastName)
        fd.append('address', this.attrs.address)
        fd.append('passportNumber', this.attrs.passportNumber)
        fd.append('document', 'this.attrs.document')
        return fd
        // let opts = {}
        // opts = {
        //     email: this.attrs.email,
        //     firstName: this.attrs.firstName,
        //     middleName: this.attrs.middleName,
        //     lastName: this.attrs.lastName,
        //     address: this.attrs.address,
        //     passportNumber: this.attrs.passportNumber,
        //     document: 'this.attrs.document',
        // }
        // return opts
    }
}
