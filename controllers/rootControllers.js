import dbConn from "../config/dbConn.js";

export const getUsers = (req, res) => {
  dbConn.query("SELECT * FROM users", (err, result) => {
    if (err)
      return res.status(500).json({ error: `Couldn't fetch: ${err.message}` });
    if (result.rows.length === 0)
      return res.status(200).json({ error: "No user found." });

    res.json({ message: "success", result: result.rows });
  });
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const selectQuery = "SELECT * FROM users WHERE id = $1";
  dbConn.query(selectQuery, [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: `Couldn't fetch: ${err.message}` });

    if (result.rows.length === 0)
      return res.status(404).json({ error: "No user found." });

    res.json({ message: "success", result: result.rows });
  });
};

export const createUser = (req, res) => {
  if (!req?.body?.name || !req?.body?.email || !req?.body?.age)
    return res.status(400).json({ error: "Name, email, & age are required." });

  const { name, email, age } = req.body;
  const insertQuery =
    "INSERT INTO users (name,email,age) VALUES($1,$2,$3) RETURNING *";

  dbConn.query(insertQuery, [name, email, age], (err, result) => {
    if (err)
      return res.status(500).json({ error: `Couldn't post: ${err.message}` });

    res.status(201).json({ message: "User created.", result: result.rows[0] });
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name && !email && !age)
    return res.status(400).json({
      error:
        "Atleast one of these properties (name,email, or age) must be passed.",
    });

  let updateQuery =
    "UPDATE users SET name=COALESCE($1,name),email=COALESCE($2,email),age=COALESCE($3,age)  WHERE id=$4 RETURNING *";

  dbConn.query(
    updateQuery,
    [name || null, email || null, age || null, id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: `Couldn't update: ${err.message}` });

      if (result.rowCount === 0)
        return res.status(404).json({ error: "No user found." });

      return res.json({
        message: "Record updated.",
        result: result.rows[0],
      });
    }
  );
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM users WHERE id=$1";

  dbConn.query(deleteQuery, [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: `Couldn't delete: ${err.message}` });

    if (result.rowCount === 0)
      return res.status(404).json({ error: "No user found" });

    res.json({ message: "User deleted." });
  });
};
