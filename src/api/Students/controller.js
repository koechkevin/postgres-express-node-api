import models from '../../database/models';

const createStudent = async (req, res) => {
  try {
    const student = await models.Student.create(req.body);
    res.status(200).json({
      message: 'success',
      student
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
export default { createStudent };
