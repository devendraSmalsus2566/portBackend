const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  heroSection: {
    name: { type: String },
    profileImage: { type: String }, // e.g., '/uploads/profile.jpg' or Cloudinary URL
    profileDescription: { type: String },
    resumePdf: { type: String } // same idea — store file path or URL
  },
  aboutSection: {
    aboutUserImage: { type: String },
    aboutDescription: { type: String }
  },
  projects: [{
    projectImage: { type: String },
    projectName: { type: String },
    projectDescription: { type: String },
    technologies: [{ type: String }],
    liveProjectLink: { type: String },
    githubProjectLink: { type: String }
  }],
  skills: [{ type: String }],
  technologies: [{ type: String }],
  experience: [{
    designation: { type: String },
    companyName: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    jobDescription: { type: String }
  }],
  contactMe: [{
    name: { type: String },
    email: { type: String },
    message: { type: String }
  }],
  githubLink: { type: String },
  liveDemoLink: { type: String }
});

module.exports = mongoose.model('Project', projectSchema);
