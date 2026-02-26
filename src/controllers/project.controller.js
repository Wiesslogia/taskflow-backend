import { createProject,getProjects, getProjectById } from "../services/project.service.js";

export const create = async (req, res) => {
    try {
        const project = await createProject(req.body, req.user._id);
        res.status(201).json({
            success: true,
            message: 'Project created sucessfully',
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getAll = async (req,res)=>{
    try{
        const projects = await getProjects(req.user);
    
        res.status(200).json({
            success: true,
            data: projects
        });

    }catch{
        res.status(400).json({
            success: false,
            message: error.message 
        });
    }
};


export const getOne = async (req, res)=>{
    try{
        const project = await getProjectById(req.params.id, req.user);

        res.status(200).json({
            success: true,
            data: project
        });

    }catch(error){

        res.status(400).json({
            success: false,
            message: error.message 
        });

    }       
};