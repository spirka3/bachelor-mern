import { Schema, model } from 'mongoose';

const ModuleSchema = new Schema({
  page: {
    type: Schema.Types.ObjectId,
    ref: "Page"
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  position: {
    type: JSON,
    required: true
  },
  body: {
    type: JSON,
    required: true
  },
  status: {
    type: String,
    default: 'active'
  }
});

const Module = model('module', ModuleSchema);

export default Module;
