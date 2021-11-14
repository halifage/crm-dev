export interface Client {
  id?: string;
  createdBy?: string;
  dateCreated?: Date;
  name?: string;
  type?: string;
  paymentMode?: string;
  industry: string;
  annualVolumes?: number;
  phone?: number;
  address?:string;
  email?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: number;
  contactPersonRole?: string;
}
//Name
//     address
//     phone
//     email
//     contact person
//         Name
//         phone
//         email
//         role
//     type
//         A
//         B
//         C
//     payment mode
//         cash
//         account
//     industry
//         transport
//         retail
//     annnual potential
//         volumes/year
//
//     INTERNAL
//         actvity ID
//         order ID
