/**
 * @swagger
 * definitions:
 *   Post:
 *     type: object
 *     properties:
 *       author:
 *         type: string
 *       class:
 *         type: string
 *         title:
 *           type: string
 *       text_body:
 *         type: string
 *       createdAt:
 *         type: Date
 */

/**
 * @swagger
 * definitions:
 *   NewPost:
 *     type: object
 *     properties:
 *       author:
 *         type: string
 *       classId:
 *         type: string
 *         title:
 *           type: string
 *       text_body:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   UpdatePost:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       text_body:
 *         type: string
 */

/**
 * @swagger
 * /posts:
 *  get:
 *    tags:
 *      - Posts
 *    summary: Get all posts
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
 * /posts:
 *  post:
 *    tags:
 *      - Posts
 *    summary: Create a new Post
 *    description:
 *    security:
 *      - JWT: [admin]
 *    parameters:
 *        - title: post
 *          in: body
 *          description: New Post.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/NewPost"
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
 * /posts:
 *  put:
 *    tags:
 *      - Posts
 *    summary: update post
 *    description:
 *    security:
 *      - JWT: [admin]
 *    parameters:
 *        - title: post
 *          in: body
 *          description: update Post.
 *          required: True
 *          schema:
 *           type: object
 *           $ref: "#/definitions/UpdatePost"
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
 * /posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: delete post by id
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