/**
 * @swagger
 * definitions:
 *   Class:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       students:
 *         type: array
 *         items:
 *           type: string
 *       monitors:
 *         type: array
 *         items:
 *           type: string
 */

/**
 * @swagger
 * definitions:
 *   ClassUpdate:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       students:
 *         type: array
 *         items:
 *           type: string
 *       monitors:
 *         type: array
 *         items:
 *           type: string
 */

/**
 * @swagger
 * definitions:
 *   StudentId:
 *     type: object
 *     properties:
 *       studentId:
 *         type: string
 */

/**
 * @swagger
 * /classes:
 *  get:
 *    tags:
 *      - Classes
 *    summary: Get all classes
 *    description:
 *    produces:
 *      - application/json
 *    responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /classes:
 *  post:
 *    tags:
 *      - Classes
 *    summary: Create a new Class
 *    description:
 *    security:
 *      - JWT: [admin]
 *    parameters:
 *        - name: class
 *          in: body
 *          description: New class.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/Class"
 *    produces:
 *      - application/json
 *    responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /classes:
 *  put:
 *    tags:
 *      - Classes
 *    summary: Update a class
 *    description:
 *    security:
 *      - JWT: [admin]
 *    parameters:
 *        - name: class
 *          in: body
 *          description: Updated class.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/ClassUpdate"
 *    produces:
 *      - application/json
 *    responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     tags:
 *       - Classes
 *     summary: Remove a class by id.
 *     security:
 *      - JWT: [admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */

/**
 * @swagger
 * /classes/student/{classId}:
 *   delete:
 *     tags:
 *       - Classes
 *     summary: Remove a student from a class.
 *     security:
 *      - JWT: [admin]
 *     parameters:
 *       - name: classId
 *         in: path
 *         required: true
 *       - name: studentId
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: "#/definitions/StudentId"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Operation executed with success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized error
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *
 */
