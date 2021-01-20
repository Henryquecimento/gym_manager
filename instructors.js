const fs = require('fs');
const data = require('./data.json');
const Intl = require('intl');
const { age, date } = require('./utils.js');


//show
exports.show = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id;
    });

    if(!foundInstructor) {
        return res.send("Instructor not found!");
    };

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    };

    return res.render("instructors/show", { instructor });
    //return res.send(foundInstructor);
}

// create
exports.post = (req, res) => {

    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };

    let {avatar_url, name, birth, gender, services} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number (data.instructors.length + 1);

    data.instructors.push({
        id,
        avatar_url,
        name, 
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!');

        return res.redirect("/instructors");
    });


    //return res.send(req.body);
};

// edit
exports.edit = (req, res) => {
    const { id } = req.params;

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id;
    });

    if(!foundInstructor) {
        return res.send("Instructor not found!")
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render("instructors/edit", { instructor });
 };

 // put
 exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if( id == instructor.id) {
            index = foundIndex;

            return true;
        }
    });

    if(!foundInstructor) {
        return res.send("Instructor not found!")
   }

   const instructor = {
       ...foundInstructor,
       ...req.body,
       birth : Date.parse(req.body.birth)
   }

    data.instructors[index] = instructor;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if(err) return res.send('Write error! - line 113');

        return res.redirect(`/instructors/${id}`);
    })
 }