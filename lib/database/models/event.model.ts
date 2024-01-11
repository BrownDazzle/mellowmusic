import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  genre: { _id: string, name: string, type: string };
  createdAt: Date;
  imageUrl: string;
  videoUrl: string,
  audioUrl: string,
  views: number,
  likes: string;
  socialUrl?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
  };
  category: { _id: string, name: string, type: string }
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String },
  audioUrl: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: String },
  socialUrl: {
    facebook: { type: String },
    youtube: { type: String },
    instagram: { type: String },
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;