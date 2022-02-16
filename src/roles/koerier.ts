interface Koerier extends Creep {
    memory: KoerierMemory;
}

interface KoerierMemory extends CreepMemory {
    hauling: boolean;
    role: 'koerier';
}

const roleKoerier = {
    run(creep: Creep): void {
        // Als leeg haal energie bij harvester
        if (creep.store.getFreeCapacity() > 0) {

        }
    }
}

export {
    roleKoerier,
    Koerier
}
