import React, { useState } from "react";
import { FaMapMarkerAlt, FaPaperclip, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    experience: "Fresher",
    location: "Remote",
    description: "Build user interfaces using React and Tailwind CSS."
  },
  {
    id: 2,
    title: "Backend Developer",
    experience: "1+ year",
    location: "Bangalore",
    description: "Build REST APIs using Node.js and MongoDB."
  },
  {
    id: 3,
    title: "UI/UX Designer",
    experience: "Fresher",
    location: "Pune",
    description: "Design intuitive user interfaces and experiences."
  },
  {
    id: 4,
    title: "Healthcare Assistant",
    experience: "2+ years",
    location: "Delhi",
    description: "Assist doctors and manage patient records."
  },
  {
    id: 5,
    title: "Nurse",
    experience: "Fresher",
    location: "Chennai",
    description: "Support healthcare team in daily routines."
  },
  {
    id: 6,
    title: "Doctor (General Physician)",
    experience: "5+ years",
    location: "Mumbai",
    description: "Consult patients and diagnose illnesses."
  },
  {
    id: 7,
    title: "Mobile App Developer",
    experience: "1+ year",
    location: "Remote",
    description: "Develop mobile applications using React Native."
  },
  {
    id: 8,
    title: "Data Analyst",
    experience: "Fresher",
    location: "Hyderabad",
    description: "Analyze data and prepare healthcare insights."
  },
  {
    id: 9,
    title: "Medical Lab Technician",
    experience: "2+ years",
    location: "Ahmedabad",
    description: "Manage lab tests and reports."
  },
  {
    id: 10,
    title: "Clinical Research Associate",
    experience: "Fresher",
    location: "Kolkata",
    description: "Support clinical trials and documentation."
  }
];

const Jobs = () => {
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "resume" ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submission = new FormData();
      submission.append("name", formData.name);
      submission.append("email", formData.email);
      submission.append("phone", formData.phone);
      submission.append("resume", formData.resume);
      submission.append("jobRole", selectedJob.title);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/apply`, submission, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Application submitted successfully");
      setShowForm(false);
      setFormData({ name: "", email: "", phone: "", resume: null });
    } catch (error) {
        console.error("Submission failed:", error.response?.data || error.message);
        toast.error("Submission failed ❌");
      }
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Jobs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(showAll ? jobData : jobData.slice(0, 6)).map((job) => (
          <div
            key={job.id}
            className="p-4 bg-white rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform border"
          >
            <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
              Experience: {job.experience}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-1" /> {job.location}
            </p>
            <p className="text-sm text-gray-600 mb-3">{job.description}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={() => handleApply(job)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 underline"
        >
          {showAll ? "See Less Jobs" : "See More Jobs"}
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
              onClick={() => setShowForm(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <div className="relative">
                <input
                  type="file"
                  name="resume"
                  required
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2 pr-10 text-sm text-gray-700"
                />
                <FaPaperclip className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded w-full"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
