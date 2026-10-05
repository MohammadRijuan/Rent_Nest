export interface CreatePaymentPayload {
  rental_id: string;
}


export interface SSLCommerzCallbackPayload {
  status?: string;
  tran_id?: string;
  val_id?: string;
  amount?: string;
  currency?: string;
}