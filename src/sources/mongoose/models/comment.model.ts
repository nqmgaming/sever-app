import { model, Schema, Types } from 'mongoose';

export interface Comment {
  content: string;
  flagged: boolean;
  article: Types.ObjectId;
  image: [string];
  createdAt: Date;
  updatedAt: Date;
}

export const CommentSchema = new Schema<Comment>({
  content: { type: 'String', required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  image: [{ type: 'String' }],
  flagged: { type: 'Boolean' },
  createdAt: { type: 'Date', required: true },
});

export const CommentModel = model<Comment>('Comment', CommentSchema);
