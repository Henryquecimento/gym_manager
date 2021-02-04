const fs = require('fs');
const data = require('../data.json');
const { date, blood } = require('../utils');

// index
exports.index = (req, res) => {
    return res.render('members/index', { members: data.members});
};

// create
exports.create = (req, res) => {
    return res.render('members/create');
};

// put
exports.post = (req, res) => {

    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };

    birth = Date.parse(req.body.birth);
    let id = 1;
    const lastMember = data.members[data.members.length - 1].id; //selecting the last MEMBER

    if (lastMember) {
        id = lastMember + 1;
    }
    // o fato de retornar false e automaticamente ser setado como id = 1 vai ocorrer só na PRIMEIRA VEZ (essa lógica ocorre só uma vez), porque depois eu já terei outros id e sera retornado.

    data.members.push({
        ...req.body, 
        id,   // os demais(email, weight, height... já estão  sendo passados no req.body. Então desestruturei os dados e pus apenas o novo dado [id] e o que será sobrescrito [birth])
        birth
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!');

        return res.redirect("/members");
    });

};

// show
exports.show = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
        return member.id == id;
    });

    if(!foundMember) {
        return res.send("Member not found!");
    };

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        blood: blood(foundMember.blood)
    };

    return res.render("members/show", { member });
};

// edit
exports.edit = (req, res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
        return member.id == id;
    });

    if(!foundMember) {
        return res.send("Member not found!");
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render("members/edit", { member });
 };

 // put
 exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundMember = data.members.find((member, foundIndex) => {
        if(id == member.id) {
            index = foundIndex;

            return true;
        }
    });

    if(!foundMember) {
        return res.send("Member not found!")
   }

   const member = {
       ...foundMember,
       ...req.body,
       birth : Date.parse(req.body.birth),
       id : Number(req.body.id)
   }

    data.members[index] = member;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if(err) return res.send('Write error! - line 113');

        return res.redirect(`/members/${id}`);
    });
 };

 // delete
 exports.delete = (req, res) => {
    const { id } = req.body;
    
    const filteredMembers = data.members.filter(members => {
        return members.id != id;
    });

    data.members = filteredMembers;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Write error! -- line 130');

        return res.redirect('/members');
    });

 };