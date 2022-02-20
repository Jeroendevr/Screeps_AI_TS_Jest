interface Koerier extends Creep {
    memory: KoerierMemory;
}

interface KoerierMemory extends CreepMemory {
    hauling: boolean;
    role: 'koerier';
}

const roleKoerier = {
    run(creep: Koerier): void {
        if (creep.memory.hauling && creep.store.getFreeCapacity() === 0) {
            creep.memory.hauling = false
        }
        // Als leeg haal energie bij harvester
        if (!creep.memory.hauling && creep.store[RESOURCE_ENERGY] > 0) {
            creep.memory.hauling = true;
            creep.say('💼 Hauling')
        }
        if (creep.memory.hauling) {
            haul_energy(creep)
        } else {
            deposit_energy(creep)
        }

    }
}

function haul_energy(creep: Koerier): void {
    //find harvester with energy and haul withdraw from it
    const harvesters = creep.room.find(FIND_MY_CREEPS, { filter: { Memory: { role: 'harvester' } } })
    creep.moveTo(harvesters[0], { visualizePathStyle: { stroke: '#95e0e8' } })
}
function deposit_energy(creep: Koerier): void {

}

export {
    roleKoerier,
    Koerier
};

