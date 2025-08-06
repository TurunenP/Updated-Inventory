const asyncHandler = require("express-async-handler");
const Borrow = require("../models/borrowedModel");
const Item = require("../models/itemModel"); // ⬅️ Make sure this is imported

// Request to borrow equipment
const borrowEquipment = async (req, res) => {
  const { studentName, studentEmail, equipmentName, returnDate, quantity } =
    req.body;

  if (
    !studentName ||
    !studentEmail ||
    !equipmentName ||
    !returnDate ||
    !quantity
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // 🔍 Find the equipment
  const item = await Item.findOne({ name: equipmentName });

  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }
  // ⚠️ Check if enough quantity is available
  if (item.quantity < quantity) {
    res.status(400);
    throw new Error(`Only ${item.quantity} units available`);
  }

  // ✅ Create borrow request
  const borrowRequest = await Borrow.create({
    studentName,
    studentEmail,
    equipmentName,
    itemId: item._id,
    returnDate,
    quantity,
  });

  res.status(201).json(borrowRequest);
};

// Approve borrow request
// const approveBorrow = asyncHandler(async (req, res) => {
//   //Find the borrow request
//   const borrow = await Borrow.findById(req.params.id);

//   if (!borrow) {
//     res.status(404);
//     throw new Error("Borrow request not found");
//   }

//   // 🛑 Prevent double-approval
//   if (borrow.status === "approved") {
//     return res
//       .status(400)
//       .json({ message: "This request is already approved." });
//   }

//   // ✅ Update borrow status to approved
//   borrow.status = "approved";
//   await borrow.save();

//   //🔍 Find the item
//   //const item = await Item.findOne({ name: borrow.equipmentName });
//   const item = await Item.findById(borrow.itemId);

//   if (!item) {
//     return res.status(404).json({ message: "Item not found" });
//   }

//   // ⚠️ Check if enough stock is still available
//   if (item.quantity < borrow.quantity) {
//     return res.status(400).json({
//       message: `Only ${item.quantity} units available. Cannot approve.`,
//     });
//   }
//   console.log(`Before update, item quantity: ${item.quantity}`);

//   // ✅ Reduce item quantity
//   if (item) {
//     item.quantity -= borrow.quantity;
//     await item.save();
//     console.log(`After update, item quantity: ${item.quantity}`);
//   }

//   // ✅ Respond with success
//   res.status(200).json({ message: "Request approved", borrow });
// });

const approveBorrow = asyncHandler(async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);

  if (!borrow) {
    res.status(404);
    throw new Error("Borrow request not found");
  }

  if (borrow.status === "approved") {
    return res
      .status(400)
      .json({ message: "This request is already approved." });
  }

  borrow.status = "approved";
  await borrow.save();

  const item = await Item.findById(borrow.itemId);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (item.quantity < borrow.quantity) {
    return res.status(400).json({
      message: `Only ${item.quantity} units available. Cannot approve.`,
    });
  }

  console.log(`Before update: quantity = ${item.quantity}`);

  // Use update instead of save to rule out save issues
  await Item.findByIdAndUpdate(item._id, {
    $inc: { quantity: -borrow.quantity },
  });

  console.log(`After update: quantity decreased by ${borrow.quantity}`);

  res.status(200).json({ message: "Request approved", borrow });
});

// Mark item as returned
const returnEquipment = asyncHandler(async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);

  if (!borrow) {
    res.status(404);
    throw new Error("Borrow request not found");
  }

  borrow.status = "returned";
  await borrow.save();

  // const item = await Item.findOne({ name: borrow.equipmentName });
  const item = await Item.findById(borrow.itemId);
  if (item) {
    item.quantity += borrow.quantity;
    await item.save();
  }

  res.status(200).json({ message: "Equipment returned", borrow });
});

// Get all borrow requests
const getAllBorrows = asyncHandler(async (req, res) => {
  const borrows = await Borrow.find();
  res.status(200).json(borrows);
});

// Fetch borrowed equipment by user email
const getUserBorrows = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400);
    throw new Error("User email is required");
  }

  const borrows = await Borrow.find({ studentEmail: email });

  if (!borrows.length) {
    res.status(404);
    throw new Error("No borrow records found for this user");
  }

  res.status(200).json(borrows);
});

module.exports = {
  borrowEquipment,
  approveBorrow,
  returnEquipment,
  getAllBorrows,
  getUserBorrows,
};
