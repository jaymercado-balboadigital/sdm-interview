const dbConnection = require("../lib/dbConnection");

async function getProtectedCompanies() {
  return new Promise((resolve, reject) => {
    dbConnection.query("SELECT * FROM protected_company", (error, response) => {
      if (error) throw new Error("An error occurred");
      else resolve(response);
    });
  });
}

function getAdminUser(array) {
  // sort users by id since admin is always the first users
  const sortedArray = array.sort((a, b) => a.id - b.id);
  return sortedArray[0];
}

function getUsersByProgramID(req, res) {
  console.log("req.params", req.params);
  const programID = req.params.programID;
  
  if (!programID) res.status(400).send("A program ID is required");

  dbConnection.query(
    "SELECT * FROM program WHERE id = ? AND active = 1;",
    [programID],
    (error, programs) => {
      if (error) return res.status(500).send("An error occurred");
      const { name } = programs[0];

      if (!name) {
        return res.status(500).send("No program found or program is inactive");
      }

      dbConnection.query(
        "SELECT * FROM company WHERE programID = ?;",
        [programID],
        (error, companies) => {
          if (error) return res.status(500).send("An error occurred");

          const protectedCompanies = getProtectedCompanies();
          const allowedCompanies = companies.filter(
            (company) => !protectedCompanies.includes(company.name)
          );
          const quetionMarks = allowedCompanies.map(() => "?").join(",");

          dbConnection.query(
            `SELECT * FROM user WHERE companyID IN (${quetionMarks}) ORDER by NAME;`,
            [...allowedCompanies.map((company) => company.id)],
            (error, users) => {
              if (error) return res.status(500).send("An error occurred");
              else {
                const adminUser = getAdminUser(users);
                const allowedUsers = users.filter(
                  (user) => user.id !== adminUser.id
                );
                return res.send(allowedUsers);
              }
            }
          );
        }
      );
    }
  );

  dbConnection.query(
    `UPDATE request SET quantity = quantity + 1 WHERE programID = ?;`,
    [programID],
    (error, response) => {
      if (error || response?.affectedRows === 0) {
        return res.status(500).send("An error occurred");
      }
    }
  );
}

module.exports = { getUsersByProgramID };
