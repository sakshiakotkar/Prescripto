import JobApplication from '../models/jobApplication.js';

export const applyForJob = async (req, res) => {
    try {
      console.log("Incoming form data:", req.body);
      console.log("Uploaded file:", req.file);
  
      const { name, email, phone, jobRole } = req.body;
      const resumeUrl = req.file?.path;
  
      if (!name || !email || !phone || !resumeUrl || !jobRole) {
        console.log("Validation failed: missing field(s)");
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newApplication = new JobApplication({
        name,
        email,
        phone,
        jobRole,
        resumeUrl,
      });
  
      await newApplication.save();
      res.status(201).json({ message: 'Application submitted' });
  
    } catch (err) {
      console.error('Job Apply Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
 