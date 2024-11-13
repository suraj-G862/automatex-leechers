const TimeSchedule = require("./../models/TimeSchedule");
const asyncHandler = require("express-async-handler");
const Staff = require("./../models/Staff");

const getTimeSchedule = async (req, res) => {
  const timeSchedule = await TimeSchedule.findOne().exec();
  if (!timeSchedule) {
    return res.status(404).json({
      message: `Time Schedule not found`,
    });
  }
  res.json(timeSchedule);
};

const addTimeSchedule = asyncHandler(async (req, res) => {
  const { user, schedule } = req.body;

  if (!user || !schedule) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Fields Missing" });
  }
  const isStaff = await Staff.findById(user).exec();

  if (!isStaff) {
    return res
      .status(400)
      .json({ message: "You are not authorized to add TimeTable." });
  }
  const duplicate = await TimeSchedule.findOne({
    user: user,
  })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Time Schedule already exists" });
  }

  const TimeScheduleObj = {
    user,
    schedule,
  };

  const record = await TimeSchedule.create(TimeScheduleObj);

  if (record) {
    res.status(201).json({
      message: `Time Schedule added successfully`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

const updateTimeSchedule = asyncHandler(async (req, res) => {
  const { user, schedule } = req.body;

  if (!user || !schedule) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const record = await TimeSchedule.findOne({ user: user }).exec();

  if (!record) {
    return res.status(404).json({ message: "Time Schedule doesn't exist" });
  }

  const isStaff = await Staff.findById(user).exec();

  if (!isStaff) {
    return res
      .status(400)
      .json({ message: "You are not authorized to edit TimeTable." });
  }

  record.schedule = schedule;

  const save = await record.save();
  if (save) {
    res.json({ message: `Time Schedule Updated` });
  } else {
    res.json({ message: "Save Failed" });
  }
});

const deleteTimeSchedule = asyncHandler(async (req, res) => {
  if (!req?.params?.user_id) {
    return res.status(400).json({ message: "ID Required" });
  }
  const isStaff = await Staff.findById(req.params.user_id).exec();

  if (!isStaff) {
    return res
      .status(400)
      .json({ message: "You are not authorized to delete TimeTable." });
  }
  const record = await TimeSchedule.findById(req.params.user_id).exec();
  if (!record) {
    return res.status(404).json({ message: "Time Schedule not found" });
  }
  await record.deleteOne();
  res.json({ message: `Time Schedule deleted` });
});

module.exports = {
  getTimeSchedule,
  addTimeSchedule,
  updateTimeSchedule,
  deleteTimeSchedule,
};
