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

const getStudents = async (req, res) => {
  try {
    const { query: { page } } = req;
    const limit = req.query.limit || 10;
    const admQuery = req.query.adm ? {
      id: req.query.adm
    } : {};
    const count = await models.Student.count({
      where: {
        ...admQuery,
        deletedAt: null
      }
    });
    const pageCount = Math.ceil(count / limit);
    const currentPage = page < 1 || !page || pageCount === 0 ? 1 : Math.min(page, pageCount);
    const offset = limit * (currentPage - 1);
    const students = await models.Student.findAll({
      where: {
        deletedAt: null,
        ...admQuery,
      },
      offset,
      limit,
      order: [['id', 'DESC']]
    });
    res.status(200).json({
      status: 'success',
      students,
      pagination: {
        count, pageCount, currentPage
      }
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};
export default { createStudent, getStudents };
