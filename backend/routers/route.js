const express = require("express");
const router = express.Router();
const { createTodo, getTodo, fullList,deleteTodo,completeTodo, failTodo ,completedList,failedList,fullTodoList} = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth")


// require auth for all todos
 //tüm isteklerde yetki ister


router.get("/", requireAuth,fullList);
router.get("/fullTodo",requireAuth,fullTodoList)
router.post("/", requireAuth,createTodo);

router.delete("/:id",requireAuth,deleteTodo)

router.put("/complete/:id",requireAuth,completeTodo,)

router.put("/fail/:id",requireAuth,failTodo)

router.get("/completed",requireAuth,completedList)

router.get("/failed",requireAuth,failedList)
 


router.get("/:id", getTodo);

// Buradaki endpoint'i kaldırın
// router.get("/:id", (req, res) => {
//     res.json({ msg: "User to do UPDATE" });
// });

module.exports = router;