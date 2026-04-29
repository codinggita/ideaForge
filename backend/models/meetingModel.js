import mongoose from 'mongoose';

const meetingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Internal Sync', 'Client Meeting', 'Review', 'Other'],
      default: 'Internal Sync',
    },
    meetingLink: {
      type: String,
      required: false,
    },
    attendees: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
