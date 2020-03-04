import { notifier } from '@beyonk/svelte-notifications'

export function showSuccessToast(event) {
    let msg = event.detail.msg || 'Success';
    notifier.success(msg);
}
export function showErrorToast(event) {
    let msg = event.detail.msg || 'Error';
    notifier.danger(msg);
}