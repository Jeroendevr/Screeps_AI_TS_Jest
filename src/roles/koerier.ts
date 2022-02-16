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

    }
}

export {
    roleKoerier,
    Koerier
};

