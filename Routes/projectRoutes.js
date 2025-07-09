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


//------------------------------------------------------------------------------------------------
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const router = express.Router();
// const Project = require('../Models/project'); // Your Mongoose schema

// // Ensure "uploads/" directory exists
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer disk storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + file.originalname;
//     cb(null, uniqueSuffix);
//   }
// });

// const upload = multer({ storage });
// router.get('/', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }); 


// router.get('/', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST route to upload portfolio data
// router.post(
//   '/',
//   upload.fields([
//     { name: 'profileImage', maxCount: 1 },
//     { name: 'resumePdf', maxCount: 1 }
//   ]),
//   async (req, res) => {
//     try {
//       const profileImagePath = req.files['profileImage']?.[0]?.path || '';
//       const resumePdfPath = req.files['resumePdf']?.[0]?.path || '';
//       const data = JSON.parse(req.body.data); // JSON string sent from frontend

//       const project = new Project({
//         heroSection: {
//           name: data.heroSection.name,
//           profileDescription: data.heroSection.profileDescription,
//           profileImage: profileImagePath.replace(/\\/g, '/'), // normalize for URLs
//           resumePdf: resumePdfPath.replace(/\\/g, '/')
//         },
//         aboutSection: data.aboutSection,
//         projects: data.projects,
//         skills: data.skills,
//         technologies: data.technologies,
//         experience: data.experience,
//         contactMe: data.contactMe,
//         githubLink: data.githubLink,
//         liveDemoLink: data.liveDemoLink
//       });

//       const saved = await project.save();
//       res.status(201).json(saved);
//     } catch (err) {
//       console.error('❌ Error saving project:', err.message);
//       res.status(400).json({ message: 'Upload failed', error: err.message });
//     }
//   }
// );



// // router.put(
// //   '/:id',
// //   upload.fields([
// //     { name: 'profileImage', maxCount: 1 },
// //     { name: 'resumePdf', maxCount: 1 }
// //   ]),
// //   async (req, res) => {
// //     try {
// //       const profileImagePath = req.files['profileImage']?.[0]?.path || '';
// //       const resumePdfPath = req.files['resumePdf']?.[0]?.path || '';
// //       const data = JSON.parse(req.body.data); // sent as JSON string from frontend

// //       const updateFields = {
// //         heroSection: {
// //           ...data.heroSection,
// //           ...(profileImagePath && { profileImage: profileImagePath.replace(/\\/g, '/') }),
// //           ...(resumePdfPath && { resumePdf: resumePdfPath.replace(/\\/g, '/') })
// //         },
// //         aboutSection: data.aboutSection,
// //         projects: data.projects,
// //         skills: data.skills,
// //         technologies: data.technologies,
// //         experience: data.experience,
// //         contactMe: data.contactMe,
// //         githubLink: data.githubLink,
// //         liveDemoLink: data.liveDemoLink
// //       };

// //       const updated = await Project.findByIdAndUpdate(req.params.id, updateFields, { new: true });
// //       res.json(updated);
// //     } catch (err) {
// //       console.error('❌ Update error:', err.message);
// //       res.status(400).json({ message: err.message });
// //     }
// //   }
// // );
// router.put(
//   '/:id',
//   upload.fields([
//     { name: 'profileImage', maxCount: 1 },
//     { name: 'resumePdf', maxCount: 1 },
//     { name: 'aboutUserImage', maxCount: 1 } // Optional for about section
//   ]),
//   async (req, res) => {
//     try {
//       const data = JSON.parse(req.body.data);
//       const updateFields = {};

//       // Handle hero section if present
//       if (data.heroSection) {
//         updateFields.heroSection = {
//           ...data.heroSection,
//           ...(req.files['profileImage']?.[0]?.path && {
//             profileImage: req.files['profileImage'][0].path.replace(/\\/g, '/')
//           }),
//           ...(req.files['resumePdf']?.[0]?.path && {
//             resumePdf: req.files['resumePdf'][0].path.replace(/\\/g, '/')
//           })
//         };
//       }

//       // Handle about section
//       if (data.aboutSection) {
//         updateFields.aboutSection = {
//           ...data.aboutSection,
//           ...(req.files['aboutUserImage']?.[0]?.path && {
//             aboutUserImage: req.files['aboutUserImage'][0].path.replace(/\\/g, '/')
//           })
//         };
//       }

//       // Handle rest of the sections
//       if (data.projects) updateFields.projects = data.projects;
//       if (data.skills) updateFields.skills = data.skills;
//       if (data.technologies) updateFields.technologies = data.technologies;
//       if (data.experience) updateFields.experience = data.experience;
//       if (data.contactMe) updateFields.contactMe = data.contactMe;
//       if (data.githubLink) updateFields.githubLink = data.githubLink;
//       if (data.liveDemoLink) updateFields.liveDemoLink = data.liveDemoLink;

//       const updated = await Project.findByIdAndUpdate(req.params.id, updateFields, { new: true });
//       res.json(updated);
//     } catch (err) {
//       console.error('❌ Update error:', err.message);
//       res.status(500).json({ message: err.message });
//     }
//   }
// );
//'''''''''''''''''''''''''''''''''''''''''''''''
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

// Multer storage setup
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


// ==================== ROUTES ==================== //

// ✅ GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ POST new portfolio
router.post(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resumePdf', maxCount: 1 }
  ]),
  async (req, res) => {
    const baseUrl = 'http://localhost:5000'

    try {
     // const profileImagePath = req.files['profileImage']?.[0]?.path || '';
     const profileImagePath = req.files['profileImage']?.[0]?.filename? `${baseUrl}/uploads/${req.files['profileImage'][0].filename}` : '';

      //const resumePdfPath = req.files['resumePdf']?.[0]?.path || '';
      const resumePdfPath = req.files['resumePdf']?.[0]?.filename? `${baseUrl}/uploads/${req.files['resumePdf'][0].filename}`: '';

      const data = JSON.parse(req.body.data);

      const project = new Project({
        heroSection: {
          name: data.heroSection.name,
          profileDescription: data.heroSection.profileDescription,
          profileImage: profileImagePath.replace(/\\/g, '/'),
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


// ✅ PUT update entire portfolio
router.put(
  '/:id',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resumePdf', maxCount: 1 },
    { name: 'aboutUserImage', maxCount: 1 }
  ]),
  async (req, res) => {
    const baseUrl = 'http://localhost:5000'
    try {
      const data = JSON.parse(req.body.data);
      const updateFields = {};

      // Hero section
      if (data.heroSection) {
        updateFields.heroSection = {
          ...data.heroSection,
          ...(req.files['profileImage']?.[0]?.path && {
           // profileImage: req.files['profileImage'][0].path.replace(/\\/g, '/')
           profileImage: `${baseUrl}/uploads/${req.files['profileImage'][0].filename}`

          }),
          ...(req.files['resumePdf']?.[0]?.path && {
           // resumePdf: req.files['resumePdf'][0].path.replace(/\\/g, '/')

           resumePdf: `${baseUrl}/uploads/${req.files['resumePdf'][0].filename}`
          })
        };
      }

      // About section
      if (data.aboutSection) {
        updateFields.aboutSection = {
          ...data.aboutSection,
          ...(req.files['aboutUserImage']?.[0]?.path && {
          //  aboutUserImage: req.files['aboutUserImage'][0].path.replace(/\\/g, '/')
          aboutUserImage:   `${baseUrl}/uploads/${req.files['aboutUserImage'][0].filename}`
 

          })
        };
      }

      // Other sections
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


// ✅ PUT add a new project to the projects array// ✅ PUT /api/projects/:id/add-projects
router.put('/:id/add-project', upload.single('projectImage'), async (req, res) => {
  try { 


    const data = JSON.parse(req.body.data);
   const baseUrl = 'http://localhost:5000'
    //const imagePath = req.file?.path?.replace(/\\/g, '/'); 
     const imagePath = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null


    const newProject = {
      ...data.newProject,
      ...(imagePath && { projectImage: imagePath })
    };

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { projects: newProject } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project added successfully', project: updated });
  } catch (err) {
    console.error('❌ Error adding project:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// In projectRoutes.js
router.put('/:id/add-skills', async (req, res) => {
  try {
    const { FrontEnd, BackEnd, Tools } = req.body.skills;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          skills: { FrontEnd, BackEnd, Tools }
        }
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Add skills error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/add-experience', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          experience: req.body.experience,
        }
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Add experience error:', err.message);
    res.status(500).json({ message: err.message });
  }
});// PUT /api/projects/:id/contact
router.put('/:id/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const contactEntry = { name, email, message };

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $push: { contactMe: contactEntry }
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Contact saved successfully', project: updatedProject });
  } catch (err) {
    console.error('❌ Error saving contact:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});






 


module.exports = router;



