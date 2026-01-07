import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  askerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      ret.askerId = ret.askerId.toString();
      ret.expertId = ret.expertId.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Ensure unique chat between asker and expert
chatSchema.index({ askerId: 1, expertId: 1 }, { unique: true });

export default mongoose.model('Chat', chatSchema);