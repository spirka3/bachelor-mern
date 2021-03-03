import { Schema, model } from 'mongoose';

const PageSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  path: {
    type: String,
    required: true,
    unique: true
  },
  hidden: {
    type: Boolean,
    default: false
  },
  onNavBar:{
    type: Boolean, // String
    default: true  // top or child or hide
  },
  children: {
    type: Array
    // TODO ref: "Page"
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  create_date: {
    type: Date,
    default: Date.now()
  },
  update_Date: {
    type: Date,
    default: Date.now()
  }
});

const Page = model('page', PageSchema);

export default Page;
