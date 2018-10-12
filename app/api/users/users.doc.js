/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 *
 */

/**
 * @swagger
 * definitions:
 *   UserLogin:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */


/**
 * @swagger
 * definitions:
 *   ClassCode:
 *     type: object
 *     properties:
 *       code:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - User
 *    summary: Get all users
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
 * /users/classes:
 *  get:
 *    tags:
 *      - User
 *    summary: Get all classes from current user
 *    security:
 *      - JWT: [admin]   # Use OAuth with a different scope
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
 * /users:
 *  post:
 *    tags:
 *      - User
 *    summary: Create a new user
 *    description:
 *    parameters:
 *        - name: user
 *          in: body
 *          description: New user.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/User"
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
 * /users/login:
 *  post:
 *    tags:
 *      - User
 *    summary: Login
 *    description:
 *    parameters:
 *        - name: user
 *          in: body
 *          description: User credentials.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/UserLogin"
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
 * /users/joinAClass:
 *  post:
 *    tags:
 *      - User
 *    summary: Join in a class
 *    security:
 *      - JWT: [admin]
 *    parameters:
 *        - name: Class Code
 *          in: body
 *          description: Code corresponding to the class the user want to join.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/ClassCode"
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
 * /users:
 *  put:
 *    tags:
 *      - User
 *    summary: Update a user
 *    description:
 *    security:
 *      - JWT: [admin]
 *    parameters:
 *        - name: user
 *          in: body
 *          description: Updated user.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/User"
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
 * /users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Remove a user by id.
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
 * /users/quitClass/{classId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Quit from a class
 *     security:
 *      - JWT: [admin]
 *     parameters:
 *       - name: classId
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
