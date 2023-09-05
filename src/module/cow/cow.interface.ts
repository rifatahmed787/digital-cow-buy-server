import { Types } from 'mongoose'

type ILocation =
  | ' Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej'

export type ICow = {
  name: string
  age: number
  price: number
  location: ILocation
  breed: IBreed
  weight: number
  lebel?: 'For_Sale' | 'Sold_Out'
  category: 'Dairy' | 'Beef' | 'DualPurpose'
  seller: Types.ObjectId
}
