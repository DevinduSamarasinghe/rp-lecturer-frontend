import { Schema, model, models } from 'mongoose';

const SessionSchema = new Schema({
    user_email: { type: String, required: true },
    session_id: { type: String, required: true },
    session_start_time: { type: String, required: true },
    session_end_time: { type: String, required: true },
    session_duration: { type: String, required: true },
    session_intervals: [
        {
            interval_time: { type: String, required: true },
            interval_closing_time: { type: String, required: true },
            face_name: { type: String, required: true },
            bbox: { type: [Number], required: true },
            face_detected_time: { type: String, required: true },
            is_hand_recognized: { type: Boolean, required: true },
            hand_gesture_classifier_name: { type: String, required: true },
            tracking_duration: { type: Number, required: true },
            posture: { type: String, required: true },
            nose_coords : {
                x: { type: Number, required: false },
                y: { type: Number, required: false },
                z: { type: Number, required: false }
            }
        }
    ]
}, { timestamps: true, collection: 'rp-lecturer' });  // Specify collection name here

// Use a consistent model name and avoid re-compiling the model
const Session = models.Session || model('Session', SessionSchema);

export default Session;
