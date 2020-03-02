/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Users Login
 *    tags:
 *      - Users
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        type: object
 *        properties:
 *          userName:
 *            type: string
 *          passWord:
 *            type: string
 *        example: {
 *          "userName": "username",
 *          "passWord": "123123"
 *        }
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true,
 *             'data': {
                  "user": {
                    "_id": "5e4405edc31ea22892122665",
                    "online": true,
                    "userName": "admin",
                    "passWord": "UsPOKskG38RdthTtf5c2b5dc73aaf6c4b4b4b8c790110bd9",
                    "role": "root",
                    "createdAt": "2020-02-12T14:04:29.969Z",
                    "updatedAt": "2020-02-12T14:31:55.733Z",
                    "__v": 0
                  },
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQ0MDVlZGMzMWVhMjI4OTIxMjI2NjUiLCJyb2xlIjoicm9vdCIsImlhdCI6MTU4MTUxNzk0MCwiZXhwIjo0MTczNTE3OTQwfQ.ZHaYK2dPllwWFeQZmONBko8WKjjrmTSq2-gBxrRcM8M",
                  "expiredTime": 2592000000
                }
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */
/**
 * @swagger
 * /users/registry:
 *  post:
 *    summary: User registry account
 *    tags:
 *      - Users
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        type: object
 *        properties:
 *          fullName:
 *            type: string
 *          userName:
 *            type: string
 *          passWord:
 *            type: string
 *          email:
 *            type: string
 *          phoneNumber:
 *            type: string
 *        example: {
 *          "fullName": "Nguyen Van A",
 *          "userName": "username",
 *          "passWord": "123123",
 *          "email": "nguyenvana@gmail.com",
 *          "phoneNumber": "0964030454"
 *        }
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true,
 *             'data': {
                  "_id": "5e4410ba6050033ea0a46b2b",
                  "fullName": "Nguyen Van A",
                  "userName": "usernameee",
                  "email": "nguyenvaneea@gmail.com",
                  "phoneNumber": "0964030454",
                  "createdAt": "2020-02-12T14:50:34.758Z",
                  "updatedAt": "2020-02-12T14:50:34.758Z"
                }
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */

/**
 * @swagger
 * /users/user-buy-product:
 *  post:
 *    summary: User buy product
 *    tags:
 *      - Users
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        type: object
 *        properties:
 *          productID:
 *            type: string
 *          numOfProduct:
 *            type: string
 *        example: {
 *          "productID": "P01",
 *          "numOfProduct": "2"
 *        }
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true,
 *             'data': {
                  "_id": "5e4410ba6050033ea0a46b2b",
                  "fullName": "Nguyen Van A",
                  "userName": "usernameee",
                  "email": "nguyenvaneea@gmail.com",
                  "phoneNumber": "0964030454",
                  "createdAt": "2020-02-12T14:50:34.758Z",
                  "updatedAt": "2020-02-12T14:50:34.758Z"
                }
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */
