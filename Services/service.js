const DB = require('../DB');


// INSERT

module.exports.insertTELUser = async (object) => {

    const result = await DB.query("SELECT id FROM users WHERE id = $1", [object.chat.id])
    // console.log(result.rows.length)
    if(result.rows.length < 1){
        const affectedRows = await DB.query("INSERT INTO users(id,name) VALUES($1,$2)", 
        [object.chat.id, object.chat.first_name])
        console.log(affectedRows);
    }
    
    // return affectedRows;
    
}

// ------------------------------------------------------------------------------------------------------------------
// BALANCE

module.exports.balance = async (obj) => {
    const result = await DB.query("SELECT balance FROM users WHERE id = $1", [obj.chat.id])

    return result.rows[0];
}

// ------------------------------------------------------------------------------------------------------------------


module.exports.users = async () => {
    const results = await DB.query("SELECT * FROM users")
    console.log(results.rows)
    return results;
}

module.exports.user = async (id) => {
    const result = await DB.query("SELECT * FROM users WHERE id = $1", [id])

    return result;
}


// module.exports.deleteUser = async (id) => {
//     const [{affectedRows}] = await DB.query("DELETE FROM user WHERE id = $1", [id])

//     return affectedRows;
// }

// module.exports.insertUser = async (object, id = 0) => {
//     const [{affectedRows}] = await DB.query("CALL INSERT_EDIT_user($1,$2,$3,$4)", 
//         [id,object.username,object.email,object.password])

//     return affectedRows;
// }

// module.exports.updateUser = async (object) => {
//     const [[[{affectedRows}]]] = await DB.query("CALL INSERT_EDIT_user($1,$2,$3,$4)", 
//         [object.id,object.username,object.email,object.password])

//     return affectedRows;
// }
 