import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({ name: String, email: String, phone: String, jobRole: String, resumeUrl: String, }, { timestamps: true });

export default mongoose.model('JobApplication', jobApplicationSchema);