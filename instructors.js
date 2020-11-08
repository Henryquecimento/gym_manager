const fs = require('fs');
const data = require('./data.json');

// create
exports.post = (req, res) => {

    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };

    let {avatar_url, name, birth, gender, services} = req.body;

    birth = Date.parse(req.body.birth);
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