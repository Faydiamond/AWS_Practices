let students = [{ "name": "Andres", "age": 25, "id_fighter": 2 },
    { "name": "Andrea", "age": 23, "id_fighter": 1 }, { "name": "Connor", "age": 33, "id_fighter": 3 }
    ]
    
    export const handler = async (event) => {
    
      //let metod = event.metod
      console.log("METTTTT :: ", event)
    
      console.log(` Que::  ${event.path} , ${event.httpMethod} `);
    
    
      if (event.path === '/students' && event.httpMethod === 'GET') {
        console.log("Entra!! ");
        return getComputedStyle(event);
      }
    
      if (event.path === '/students' && event.httpMethod === 'POST') {
        console.log("POST!! ");
        return postStu(event);
      }
    
      if (event.path === '/students' && event.httpMethod === 'PATCH') {
        console.log("PATCH ");
        return patchStu(event);
      }
      if (event.path === '/students' && event.httpMethod === 'DELETE') {
        console.log("DELETE ");
        return deleteStu(event);
      }
    
    };
    
    
    function deleteStu(event) {
    
      let body = JSON.parse(event.body);
      let response ;  
      
          let studentUpdate = students.find((f) => f.id_fighter === body.id_fighter);
          let message = "";
          if (studentUpdate) {
            message = "deleted!";
            students.filter((s) => s.id_fighter !== body.id_fighter)
    
            response= {
              statusCode: 200,
              body: JSON.stringify({
                message: message
              })
            };
    
          } else {
            message = "fighter does not exist!";
            response= {
              statusCode: 404,
              body: JSON.stringify({
                message: message
              })
            };
          }
    
      return response;
    }
    
    
    function patchStu(event) {
    
      let body = JSON.parse(event.body);
      let response ;  
      
          let studentUpdate = students.find((f) => f.id_fighter === body.id_fighter);
          let message = "";
          if (studentUpdate) {
            studentUpdate.name = body.name;
            studentUpdate.age = body.age;
            message = "updated";
            response= {
              statusCode: 200,
              body: JSON.stringify({
                message: message
              })
            };
    
          } else {
            message = "fighter does not exist!";
            response= {
              statusCode: 404,
              body: JSON.stringify({
                message: message
              })
            };
          }
    
      return response;
    }
    
    function postStu(event) {
    
      let body = JSON.parse(event.body);
      console.log(JSON.stringify(body));
      const newUser = { "name": body.name, "age": body.age, "id_fighter": body.id_fighter };
      students.push(newUser)
      console.log(students);
      const response1 = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Creado",
          detail: body
        })
      };
      return response1;
    }
    
    function getComputedStyle(event) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(students),
      };
      return response;
    }