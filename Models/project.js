const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  heroSection: {
    name: { type: String },
    profileImage: { type: String },
    profileDescription: { type: String },
    resumePdf: { type: String }
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
  skills: {
    FrontEnd: [{ type: String }],
    BackEnd: [{ type: String }],
    Tools: [{ type: String }]
  },
  experience: [{
    company: { type: String },
    role: { type: String },
    duration: { type: String },
    description: { type: String }
  }],
 contactMe: [{
  name: { type: String },
  email: { type: String },
  message: { type: String },
  date: { type: Date, default: Date.now }
}]
,
  githubLink: { type: String },
  liveDemoLink: { type: String }   
});

module.exports = mongoose.model('Project', projectSchema);
