const express = require("express");

const db = require("./data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .limit(3)
    .orderBy("budget", "desc")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ errorMessage: "failed to get the list of posts" });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({ errorMessage: "cannot add account" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("accounts")
    .where({ id })
    .delete()
    .then(remove => {
      console.log("remove sucess", remove);
      res.status(200).json({ successMessage: "account" });
    })
    .catch(err => {
      console.log("remove error", err);
      res.status(500).json({ errorMessage: "failed to remove account" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db("accounts")
    .where({ id })
    .update(body)
    .then(updated => {
      res
        .status(201)
        .json({ successMessage: "successfully updated your account" });
    })
    .catch(err => {
      console.log("update error", err);
      res
        .status(500)
        .json({ errorMessage: "cannot update account at this time" });
    });
});

module.exports = router;
