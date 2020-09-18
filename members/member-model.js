const db = require('../data/connections.js');

module.exports = {
    add,
    find,
    findById,
    remove,
};

    
function find(){
    return db('members');
}

function findById(id){
    return db('members').where({id}).first()
}

async function add(member){
    try{
        const [id] = await db('members').insert(member, 'id');
        return findById(id)
    }catch(error){
        throw error;
    }
}

function remove(id){
    return db('members').where({ id }).delete();
}