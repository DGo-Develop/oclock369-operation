const Department = require('../models/department');
const departmentRepository = require('../repositories/departmentRepository');
const httpResponse = require('../utils/httpResponse');
const logger = require('../utils/logger');

class DepartmentService {
    async getAllDepartments(page, pageSize) {
        logger.info(`Request for repository getAlldepartments params: [page: ${page}, pageSize: ${pageSize}]`);
        const departmentsPaginated = await departmentRepository.getAlldepartments(page, pageSize);

        return {
            departments: departmentsPaginated.data,
            page,
            pageSize,
            totalCount: departmentsPaginated.totalCount,
            totalPages: Math.ceil(departmentsPaginated.totalCount / pageSize),
        }
    }

    async getDepartamentById(departmentId) {
        const _departament = await departmentRepository.getDepartamentByID(departmentId);
        const departament = new Department({ ..._departament }).toSafeObject();

        if (!departament) {
            logger.warn(`Department By ID: ${departmentId} not found`);
            return null;
        }

        return departament;
    }
}

module.exports = new DepartmentService();
