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
    required: true
  },
  status: {
    type: String,
    default: 'active'
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Page = model('page', PageSchema);

export default Page;
