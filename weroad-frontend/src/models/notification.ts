export interface Notification {
  type: 'error' | 'info' | 'success'
  title: string
  message: string
}
