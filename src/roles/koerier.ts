import { isToBeFilled } from './harvester';

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
        if (!creep.memory.hauling && creep.store.getFreeCapacity() > 0) {
            creep.memory.hauling = true;
            creep.say('💼 Hauling')
        }
        if (creep.memory.hauling) {
            haul_energy(creep)
        } else {
            this.transferEnergy
        }

    },
    transferEnergy(creep: Creep): void {
        const targets = creep.room.find(FIND_MY_STRUCTURES, { filter: isToBeFilled });

        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}

function haul_energy(creep: Koerier): void {
    //find harvester with energy and haul withdraw from it
    const harvesters = creep.room.find(FIND_MY_CREEPS, { filter: { memory: { role: 'harvester' } } })
    creep.moveTo(harvesters[0], { visualizePathStyle: { stroke: '#95e0e8' } })

}

export {
    roleKoerier,
    Koerier
};

