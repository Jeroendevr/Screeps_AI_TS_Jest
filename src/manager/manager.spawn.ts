import { isAvailable } from "spawn";
import { countRole } from "utils/memory.role";

const spawnManager = {

    /** @param {Creep} creep **/
    spawn: function (): void {
        type roles = [
            'harvester',
            'builder'
        ]
        const screepAmount = {
            harvester: 3,
            builder: 2,
            upgrader: 2
        };

        const mySpawn = 'Spawn1'

        if (isAvailable(Game.spawns[mySpawn])) {
            const harvesters = countRole('harvester')
            const builders = countRole('builder')
            const upgrader = countRole('upgrader')

            if (harvesters < screepAmount.harvester) {
                const creepBody: BodyPartConstant[] = [WORK, CARRY, MOVE, WORK]
                if (sufficientCapacity(Game.spawns[mySpawn], creepBody) === true) {
                    const newName: string = 'Harvester' + String(Game.time);
                    console.log('Spawning new harvester: ' + newName);
                    Game.spawns[mySpawn].spawnCreep(creepBody, newName,
                        { memory: { role: 'harvester' } });
                }
            }
            else if (builders < screepAmount.builder) {
                const newName: string = 'Builders' + String(Game.time);
                const builderBody: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE]
                if (sufficientCapacity(Game.spawns[mySpawn], builderBody) === true) {
                    console.log('Spwaning new builders: ' + newName);
                    Game.spawns[mySpawn].spawnCreep(builderBody, newName,
                        { memory: { role: 'builder' } })
                }
            } else if (upgrader < screepAmount.upgrader) {
                const creepBody: BodyPartConstant[] = [WORK, CARRY, CARRY, MOVE]
                if (sufficientCapacity(Game.spawns[mySpawn], creepBody) === true) {
                    const newName: string = 'Upgrader' + String(Game.time);
                    console.log('Spawning new upgrader: ' + newName);
                    Game.spawns[mySpawn].spawnCreep(creepBody, newName,
                        { memory: { role: 'upgrader' } })
                }
            }
        }
    }
}


function sufficientCapacity(creepSpawn: StructureSpawn, creepBody: BodyPartConstant[]): Boolean {
    if (_.sum(creepBody, part => BODYPART_COST[part]) >
        creepSpawn.store.getUsedCapacity(RESOURCE_ENERGY)) {
        return false
    } else {
        return true
    }
};

export {
    spawnManager,
    sufficientCapacity
};
