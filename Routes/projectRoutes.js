// const express = require('express');
// const router = express.Router();
// const Project = require('../Models/project');
// const multer = require('multer');
// const path = require('path');
// // Get all projects



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });


// // Create a new project
// router.post('/', async (req, res) => {
//   const project = new Project(req.body);
//   try {
//     const newProject = await project.save();
//     res.status(201).json(newProject);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Update a project


// // Delete a project
// router.delete('/:id', async (req, res) => {
//   try {
//     await Project.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Project deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Project = require('../Models/project'); // Your Mongoose schema

// Ensure "uploads/" directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer disk storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to upload portfolio data
router.post(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resumePdf', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const profileImagePath = req.files['profileImage']?.[0]?.path || '';
      const resumePdfPath = req.files['resumePdf']?.[0]?.path || '';
      const data = JSON.parse(req.body.data); // JSON string sent from frontend

      const project = new Project({
        heroSection: {
          name: data.heroSection.name,
          profileDescription: data.heroSection.profileDescription,
          profileImage: profileImagePath.replace(/\\/g, '/'), // normalize for URLs
          resumePdf: resumePdfPath.replace(/\\/g, '/')
        },
        aboutSection: data.aboutSection,
        projects: data.projects,
        skills: data.skills,
        technologies: data.technologies,
        experience: data.experience,
        contactMe: data.contactMe,
        githubLink: data.githubLink,
        liveDemoLink: data.liveDemoLink
      });

      const saved = await project.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('❌ Error saving project:', err.message);
      res.status(400).json({ message: 'Upload failed', error: err.message });
    }
  }
);



// router.put(
//   '/:id',
//   upload.fields([
//     { name: 'profileImage', maxCount: 1 },
//     { name: 'resumePdf', maxCount: 1 }
//   ]),
//   async (req, res) => {
//     try {
//       const profileImagePath = req.files['profileImage']?.[0]?.path || '';
//       const resumePdfPath = req.files['resumePdf']?.[0]?.path || '';
//       const data = JSON.parse(req.body.data); // sent as JSON string from frontend

//       const updateFields = {
//         heroSection: {
//           ...data.heroSection,
//           ...(profileImagePath && { profileImage: profileImagePath.replace(/\\/g, '/') }),
//           ...(resumePdfPath && { resumePdf: resumePdfPath.replace(/\\/g, '/') })
//         },
//         aboutSection: data.aboutSection,
//         projects: data.projects,
//         skills: data.skills,
//         technologies: data.technologies,
//         experience: data.experience,
//         contactMe: data.contactMe,
//         githubLink: data.githubLink,
//         liveDemoLink: data.liveDemoLink
//       };

//       const updated = await Project.findByIdAndUpdate(req.params.id, updateFields, { new: true });
//       res.json(updated);
//     } catch (err) {
//       console.error('❌ Update error:', err.message);
//       res.status(400).json({ message: err.message });
//     }
//   }
// );
router.put(
  '/:id',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resumePdf', maxCount: 1 },
    { name: 'aboutUserImage', maxCount: 1 } // Optional for about section
  ]),
  async (req, res) => {
    try {
      const data = JSON.parse(req.body.data);
      const updateFields = {};

      // Handle hero section if present
      if (data.heroSection) {
        updateFields.heroSection = {
          ...data.heroSection,
          ...(req.files['profileImage']?.[0]?.path && {
            profileImage: req.files['profileImage'][0].path.replace(/\\/g, '/')
          }),
          ...(req.files['resumePdf']?.[0]?.path && {
            resumePdf: req.files['resumePdf'][0].path.replace(/\\/g, '/')
          })
        };
      }

      // Handle about section
      if (data.aboutSection) {
        updateFields.aboutSection = {
          ...data.aboutSection,
          ...(req.files['aboutUserImage']?.[0]?.path && {
            aboutUserImage: req.files['aboutUserImage'][0].path.replace(/\\/g, '/')
          })
        };
      }

      // Handle rest of the sections
      if (data.projects) updateFields.projects = data.projects;
      if (data.skills) updateFields.skills = data.skills;
      if (data.technologies) updateFields.technologies = data.technologies;
      if (data.experience) updateFields.experience = data.experience;
      if (data.contactMe) updateFields.contactMe = data.contactMe;
      if (data.githubLink) updateFields.githubLink = data.githubLink;
      if (data.liveDemoLink) updateFields.liveDemoLink = data.liveDemoLink;

      const updated = await Project.findByIdAndUpdate(req.params.id, updateFields, { new: true });
      res.json(updated);
    } catch (err) {
      console.error('❌ Update error:', err.message);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
