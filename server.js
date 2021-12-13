require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const db = require("./db/index");


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// INSERT A NEW EMPLOYEE DATA
app.post('/student', async (req, res) => {
    console.log(req.body);
    try {
        const { name, designation, salary } = req.body;
        const results = await db.query(
            "INSERT INTO student (name, regd, dept) VALUES ($1, $2, $3) returning *",
            [name, designation, salary]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                employee: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// GET ALL EMPLOYEE DATA
app.get('/student', async (req, res) => {
    try {
        const employeedata = await db.query(
            "SELECT * FROM student;"
        );
        res.status(200).json({
            status: "success",
            results: employeedata.rows.length,
            data: {
                allemployee: employeedata.rows,
            },
        });
    } catch (err) {
        console.log(err);
    } 
});



// // TEST CASE - 3 EMPLOYEE CAN UPDATE THEIR DETAILS, AND VIEW THEIR UPDATED DETAILS
// app.put("/employeeUpd/:id", async (req, res) => {
//     console.log(req.body);
//     try {
//         const results = await db.query(
//             "UPDATE employee SET name = $1, designation = $2, salary = $3 where id = $4 returning *",
//             [req.body.name, req.body.designation, req.body.salary, req.params.id]
//         );
  
//       res.status(200).json({
//         status: "success",
//         data: {
//           employee: results.rows[0],
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//     console.log(req.params.id);
//     console.log(req.body);
//   });


  // // GET A SINGLE EMPLOYEE
  // app.get("/employeeDetails/:id", async (req, res) => {
  //   console.log(req.params.id);
  
  //   try {
  //     const employee = await db.query(
  //       "SELECT * FROM employee WHERE id = $1",
  //       [req.params.id]
  //     );
  
  //     res.status(200).json({
  //       status: "success",
  //       data: {
  //         employee: employee.rows[0]
          
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });




// run express server
const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
}); 