import { api } from '@/api'

export async function rejectWillRequest (willRequestId) {
  await api.post('/will-requests/reject', [
    {
      willRequestId: willRequestId
    }
  ])
}

export async function approveWillRequest (willRequestId) {
  await api.post('/will-requests/approve', [
    {
      willRequestId: willRequestId
    }
  ])
}

export async function notifyWillRequest (willRequestId) {
  await api.get(`/will-requests/notify/${willRequestId}`)
}

export async function releaseWillRequest (willRequestId) {
  await api.get(`/will-requests/release/${willRequestId}`)
}
