const { AreaModel } = require('../../models/areaModel'); // Assuming your model is defined in "area.js"

const Student = require('../models/studentModel');

const Equipment = require('../models/equipmentModel');

// Create a new area
const createArea = async (req, res) => {
  try {
    const { area_name } = req.body;
    const newArea = new AreaModel({ area_name });
    const savedArea = await newArea.save();
    res.status(201).json(savedArea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all areas
const getAreas = async (req, res) => {
  try {
    const areas = await AreaModel.find();
    res.status(200).json(areas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get area by id

const getAreaById = async (req, res) => {
  const areaId = req.params.id; // Get the 'id' parameter from the URL route

  try {
    const area = await AreaModel.findById(areaId);

    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    return res.status(200).json(area);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// create a cabinet in an area
const createCabinetInArea = async (req, res) => {
  const areaId = req.params.areaId;
  const cabinetData = req.body;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    area.cabinets.push(cabinetData);
    const updatedArea = await area.save();

    res.status(201).json(updatedArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createShelfInArea = async (req, res) => {
  const areaId = req.params.areaId;
  const shelfData = req.body;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    area.shelves.push(shelfData);
    const updatedArea = await area.save();

    res.status(201).json(updatedArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createBinInArea = async (req, res) => {
  const areaId = req.params.areaId;
  const binData = req.body;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    area.bins.push(binData);
    const updatedArea = await area.save();

    res.status(201).json(updatedArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// get cabinets in an area

// Get cabinets in a specific area
const getCabinetsInArea = async (req, res) => {
  const areaId = req.params.areaId;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    const cabinetsInArea = area.cabinets;
    res.json(cabinetsInArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// create a category in an cabinet in an area
const createCategoryInCabinetInArea = async (req, res) => {
  const areaId = req.params.areaId;
  const cabinetId = req.params.cabinetId;
  const categoryData = req.body;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    const cabinet = area.cabinets.id(cabinetId);
    if (!cabinet) {
      return res
        .status(404)
        .json({ message: 'Cabinet not found in the specified area' });
    }

    cabinet.categories.push(categoryData);
    const updatedArea = await area.save();

    res.status(201).json(updatedArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get category in a specific cabinet in an area

const getCategoriesInCabinetInArea = async (req, res) => {
  const areaId = req.params.areaId;
  const cabinetId = req.params.cabinetId;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    const cabinet = area.cabinets.id(cabinetId);
    if (!cabinet) {
      return res
        .status(404)
        .json({ message: 'Cabinet not found in the specified area' });
    }

    const categoriesInCabinet = cabinet.categories;
    res.json(categoriesInCabinet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// create a door in an category in an area
const createDoorincategory = async (req, res) => {
  const areaId = req.params.areaId;
  const cabinetId = req.params.cabinetId;
  const categoryId = req.params.categoryId;
  const doorsData = req.body;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    const cabinet = area.cabinets.id(cabinetId);
    if (!cabinet) {
      return res
        .status(404)
        .json({ message: 'Cabinet not found in the specified area' });
    }
    const category = cabinet.categories.id(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ message: 'Cabinet not found in the specified area' });
    }

    category.doors.push(doorsData);
    const updatedArea = await area.save();

    res.status(201).json(updatedArea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an area by ID
const updateArea = async (req, res) => {
  try {
    const { area_name } = req.body;
    const { id } = req.params;
    const updatedArea = await Area.findByIdAndUpdate(
      id,
      { area_name },
      { new: true }
    );
    res.status(200).json(updatedArea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an area by ID
const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArea = await Area.findByIdAndRemove(id);
    res.status(200).json(deletedArea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all Students

const getStudents = async (req, res) => {
  const users = await Student.find();

  res.status(200).json({
    message: 'success',
    data: users,
  });
};

const addEquipment = async (req, res) => {
  try {
    // Extract equipment details from the request body
    const {
      equipment_type,
      equipment_room,
      equipment_location,
      equipment_category,
      total_quantity,
    } = req.body;

    const current_quantity = total_quantity;

    // Create a new equipment instance
    const newEquipment = new Equipment({
      equipment_type,
      equipment_room,
      equipment_location,
      equipment_category,
      total_quantity,
      current_quantity,
    });

    // Save the new equipment to the database
    const savedEquipment = await newEquipment.save();

    // Respond with the saved equipment
    res.status(201).json(savedEquipment);
  } catch (error) {
    // Handle errors
    console.error('Error adding equipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllEquipments = async (req, res) => {
  try {
    // Fetch all equipment from the database
    const allEquipments = await Equipment.find();

    // Respond with the list of equipment
    res.status(200).json(allEquipments);
  } catch (error) {
    // Handle errors
    console.error('Error getting all equipment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryByIdInCabinetInArea = async (req, res) => {
  const areaId = req.params.areaId;
  const cabinetId = req.params.cabinetId;
  const categoryId = req.params.categoryId;

  try {
    const area = await AreaModel.findById(areaId);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    const cabinet = area.cabinets.id(cabinetId);
    if (!cabinet) {
      return res
        .status(404)
        .json({ message: 'Cabinet not found in the specified area' });
    }

    const category = cabinet.categories.id(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ message: 'Category not found in the specified cabinet' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createArea,
  getAreas,
  getAreaById,
  createCabinetInArea,
  createShelfInArea,
  createBinInArea,
  createDoorincategory,
  getCabinetsInArea,
  createCategoryInCabinetInArea,
  getCategoriesInCabinetInArea,
  getCategoryByIdInCabinetInArea,

  updateArea,
  deleteArea,

  // get users

  getStudents,

  addEquipment,
  getAllEquipments,
};
