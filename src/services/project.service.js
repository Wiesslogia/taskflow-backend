import Project from '../models/project.model.js';

export const createProject = async (data,userId) => {

    const project = await Project.create({
        ...data,
        createdBy: userId
    });
    return project;
};

export const getProjects = async (user) => {
    if (user.role === 'admin') {
        return await Project.find().populate('createdBy', 'name email');
    }  
    return await Project.find({ createdBy: user._id });
   
};

export const getProjectById = async (id, user) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid Project ID');
    }

    const project = await Project.findById(id).populate(
        'createdBy',
        'name email'
    );

    if (!project) {
        throw new Error('Project not found');
    }
    if (user.role !== 'admin' && project.createdBy._id.toString() !== user._id.toString()) {
        throw new Error('Unauthorized access');
    }

    return project;
};

export const updateProject = async (projectId, userId, data) => {   
    const project = await Project.findOneAndUpdate(
        { _id: projectId, createdBy: userId },
        data,
        { new: true }
    ).populate('createdBy', 'name email');

    if (!project) {
        throw new Error('Project not found or unauthorized');
    }
    return project;
};

export const deleteProject = async (projectId, userId) => {
    const project = await Project.findOneAndDelete({ _id: projectId, createdBy: userId });  
    if (!project) {
        throw new Error('Project not found or unauthorized');
    }
    return project;
};  