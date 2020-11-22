module.exports = {
    age: (timestamp) => {
        const today = new Date();
        const birthDate = new Date(timestamp);
    
        //2019 - 1999
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
             
        // 11 - 12 = -1
        // 11 - 11 = 0
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
    
        return age;
    },
    date: (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();

        //Goes from 0 to 11 (I need do add + 1 = 12 months)
        const month = `0${(date.getUTCMonth() + 1)}`.slice(-2);

        const day = `0${date.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`;
    }
}

