import Category from "../models/category.model.js";
import Medicine from "../models/medicine.model.js";


const createCategory = async (req, res) => {
    try{
     
        const { name,description,active } = req.body;
        console.log(name,description,active)

        if(!name){
            return res.status(400).json({
                message: "Category name is required",
                success : false
            })
        }

        const existingCategory = await Category.findOne({ name });
        if(existingCategory){
            return res.status(400).json({
                message : "Category with this name already exists",
                success : false
            })
        }
        const newCategory = await Category.create({name,description,active});
        return res.status(201).json({
            message : "Category created successfully",
            success : true,
            category : newCategory
        })


    }catch(error){
        return res.status(500).json({
            message : "Internal server error",
            success : false
        })
    }
};


const getAllCategories = async (req, res) => {
  try {
    
    const categories = await Category.find();

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.error("Get all categories error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Category ID is required",
        success: false,
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category fetched successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category by ID error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, active } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    if (name !== undefined) {
      category.name = name;
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (active !== undefined) {
      category.active = active;
    }

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Category ID is required",
        success: false,
      });
    }

    
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    
    const medicineExists = await Medicine.findOne({
      category: id,
    });

    if (medicineExists) {
      return res.status(400).json({
        message: "Cannot delete category because medicines are using it",
        success: false,
      });
    }

   
    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete category error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const getCategoryStats = async(req,res)=>{
  try{
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({active:true})
    const inactiveCategories = await Category.countDocuments({active:false})
    const productsAcrossCategories = await Medicine.countDocuments();

    return res.status(200).json({
      message :"Category statistics fetched successfully",
      success : true,
      stats : {
        totalCategories,
        activeCategories,
        inactiveCategories,
        productsAcrossCategories
      }
    })
  }catch(error){
    return res.status(500).json({
      message : "Internal server error",
      success : false
    })
  }
}

export{
    createCategory,
    getAllCategories,
    getCategoryById, 
    updateCategory,
    deleteCategory,
    getCategoryStats
    
}