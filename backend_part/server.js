const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        name TEXT,
        password TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message);
        }
      }
    );
    db.run(
      `create table if not exists friendships 
    (
        email_1 TEXT not null
            constraint friendships_users_email_fk_2
                references users
                on update cascade on delete cascade,
        email_2 TEXT
            constraint friendships_users_email_fk
                references users
                on update cascade on delete cascade,
        id      integer
            constraint friendships_pk
                primary key autoincrement
    );`,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message);
        }
      }
    );
    db.run(
      `CREATE TABLE if not exists travel_card
      (
          id         integer
              constraint travel_card_pk
                  primary key autoincrement,
          "from"     TEXT not null,
          "to"       TEXT not null,
          start_date TEXT not null,
          end_date   TEXT not null
      , description TEXT, active integer)
      
      
        `,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message);
        }
      }
    );
    db.run(
      `create table if not exists user_card
        (
            id         integer
                constraint user_card_pk
                    primary key autoincrement,
            card_id    integer
                constraint user_card_travel_card_id_fk
                    references travel_card
                    on update cascade on delete cascade,
            user_email TEXT
                constraint user_card_users_email_fk
                    references users
                    on update cascade on delete cascade
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message);
        }
      }
    );
    db.run(
      `CREATE TABLE if not exists "todo_list"
      (
          id      integer
              constraint todo_list_pk
                  primary key autoincrement,
          task    TEXT    not null,
          done    INT default FALSE,
          card_id integer null on conflict fail
              constraint todo_list_travel_card_id_fk
                  references travel_card
                  on update cascade on delete cascade
      )      
      `,
      (err) => {
        if (err) {
          console.error("Error creating table", err.message);
        }
      }
    );
  }
});

// db.run("DELETE from travel_card")
// db.run("DELETE from user_card")
// db.run("DELETE from todo_list")

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ success: true, users: rows });
  });
});

app.get('/get-user', async (req, res) => {
  const email = req.query.email;
  const userExists = await checkUserExists(email);
  if (userExists) {
    const user = getUser(email)
    res.json({ exists: userExists, email: user.email, name: user.name, message: "User found succesfully!" });
  } else {
    res.json({ exists: userExists, email: null, name: null, message: "User not found!" });
  }
});

// Registration endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered!" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert new user into the database
    db.run(
      "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
      [email, name, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Registration failed. Please try again later!",
          });
        }
        res.status(200).json({ success: true, name: name, email: email });
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again later!",
    });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists in the database
    const userExists = await checkUserExists(email);
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    // Compare hashed password with provided password
    const user = await getUser(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password!" });
    }
    res.status(200).json({ success: true, name: user.name, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again later!",
    });
  }
});

app.post("/add-friend", async (req, res) => {
  const { email_1, email_2 } = req.body;
  try {
    const userExists = await checkUserExists(email_2);
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    const friendshipExists = await checkFriendshipExists(email_1, email_2);
    if (friendshipExists) {
      return res
        .status(400)
        .json({ success: false, message: "You are alredy friends!" });
    }
    db.run(
      "INSERT INTO friendships (email_1, email_2) VALUES (?, ?)",
      [email_1, email_2],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Adding a friend failed. Please try again later!",
          });
        }
      }
    );
    db.run(
      "INSERT INTO friendships (email_1, email_2) VALUES (?, ?)",
      [email_2, email_1],
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Adding a friend failed. Please try again later!",
          });
        }
        res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Adding a friend failed. Please try again later!",
    });
  }
});

app.post("/add-travel-card", (req, res) => {
  const { from, to, start_date, end_date, description, active, emails, tasks } = req.body;

  if (
    !from ||
    !to ||
    !start_date ||
    !end_date
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message:
          "All fields are required and lists must have at least one entry",
      });
  }

  db.serialize(() => {
    // Insert new travel card
    const cardQuery = `INSERT INTO travel_card ("from", "to", start_date, end_date, description, active) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(cardQuery, [from, to, start_date, end_date, description, active], function (err) {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to add travel card" });
      }

      const cardId = this.lastID;

      // Insert user-card relations
      const userCardQuery = `INSERT INTO user_card (user_email, card_id) VALUES (?, ?)`;
      const userStmt = db.prepare(userCardQuery);
      emails.forEach((email) => {
        userStmt.run(email, cardId, (err) => {
          if (err) {
            console.error("Database error:", err);
          }
        });
      });
      userStmt.finalize((err) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({
              success: false,
              message: "Failed to associate users with travel card",
            });
        }
      });

      // Insert tasks into todo_list
      const taskQuery = `INSERT INTO todo_list (task, done, card_id) VALUES (?, 0, ?)`;
      const taskStmt = db.prepare(taskQuery);
      tasks.forEach((task) => {
        taskStmt.run(task, cardId, (err) => {
          if (err) {
            console.error("Database error:", err);
          }
        });
      });
      taskStmt.finalize((err) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({
              success: false,
              message: "Failed to add tasks to todo list",
            });
        }

        res
          .status(200)
          .json({
            success: true,
            message:
              "Travel card, user associations, and tasks added successfully",
            cardId,
          });
      });
    });
  });
});

app.get("/friends", (req, res) => {
  const email_1 = req.query.email;
  db.all(
    "SELECT email_2 AS friend_email FROM friendships WHERE email_1 = ?",
    [email_1],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      const friends = rows.map((row) => row.friend_email);
      res.status(200).json({ success: true, friends });
    }
  );
});

app.get("/user-travel-cards", (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  db.serialize(() => {
    const travelCardQuery = `
        SELECT travel_card.id, travel_card."from", travel_card."to", travel_card.start_date, travel_card.end_date, travel_card.description, travel_card.active
        FROM travel_card
        JOIN user_card ON travel_card.id = user_card.card_id
        WHERE user_card.user_email = ?
      `;
    db.all(travelCardQuery, [email], (err, travelCards) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to retrieve travel cards" });
      }

      if (travelCards.length === 0) {
        return res.status(200).json({ success: true, travelCards: [] });
      }

      // Get todo-lists for each travel card
      const travelCardIds = travelCards.map((card) => card.id);
      const todoListQuery = `
          SELECT id, task, done, card_id
          FROM todo_list
          WHERE card_id IN (${travelCardIds.map(() => "?").join(",")})
        `;
      db.all(todoListQuery, travelCardIds, (err, todoLists) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Failed to retrieve todo lists" });
        }
        // Combine travel cards and their todo-lists
        const result = travelCards.map((card) => ({
          ...card,
          todoList: todoLists.filter((task) => task.card_id === card.id),
        }));
        travelCards = result;
      });
      const emailsListQuery = `
      SELECT user_email, card_id
      FROM user_card
      WHERE card_id IN (${travelCardIds.map(() => "?").join(",")})
      `;
      db.all(emailsListQuery, travelCardIds, (err, emails) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Failed to retrieve emails" });
        }

        // Combine travel cards and their todo-lists
        const result = travelCards.map((card) => ({
          ...card,
          emails: emails.filter((email) => email.card_id === card.id),
        }));
        res.status(200).json({ success: true, travelCards: result });
      });
    });
  });
});

app.put("/todo-list", (req, res) => {
  const { taskId, done } = req.body;
  console.log(done);
  db.run(
    `UPDATE todo_list SET done = ? WHERE id = ?`,
    [done ? 1 : 0, taskId],
    function (err) {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Failed to update task state" });
      }

      if (this.changes === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found" });
      }

      res.status(200).json({ success: true, message: "Task state updated successfully" });
    }
  );
});

app.post('/todo-list', (req, res) => {
  const { task, done, card_id } = req.body;

  if (!task || !card_id) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  db.run(`INSERT INTO todo_list (task, done, card_id) VALUES (?, ?, ?)`, [task, done ? 1 : 0, card_id], function (err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Failed to add new task' });
    }

    res.status(200).json({ success: true, message: 'Task added successfully', taskId: this.lastID });
  });
});


function getUser(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
}

function checkUserExists(email) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row !== undefined);
    });
  });
}

function checkFriendshipExists(email_1, email_2) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM friendships WHERE email_1 = ? AND email_2 = ?`,
      [email_1, email_2],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows.length > 0);
      }
    );
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
