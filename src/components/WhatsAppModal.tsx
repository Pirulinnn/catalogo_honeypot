'use client';

import CheckoutModal, { CheckoutModalProps } from './CheckoutModal';

export type WhatsAppModalProps = CheckoutModalProps;

// Backwards-compatible alias for CheckoutModal
export default function WhatsAppModal(props: WhatsAppModalProps) {
  return <CheckoutModal {...props} />;
}
