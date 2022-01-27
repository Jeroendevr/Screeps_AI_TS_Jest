import { stringify } from "querystring";
import { isAvailable } from "spawn";
import { countRole } from "utils/memory.role";

export const spawnManager = {

    /** @param {Creep} creep **/
    spawn: function (): void {
        type roles = [
            'harvester',
            'builder'
        ]
        const screepAmount = {
            harvester: 3,
            builder: 2,
            upgrader: 1
        };

        const mySpawn = 'Spawn1'

        if (isAvailable(Game.spawns[mySpawn])) {
            const harvesters = countRole('harvester')
            const builders = countRole('builder')
            const upgrader = countRole('upgrader')

            if (harvesters < screepAmount.harvester) {
                const newName: string = 'Harvester' + stringify(Game.time);
                console.log('Spawning new harvester: ' + newName);
                Game.spawns[mySpawn].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'harvester' } });
            }
            else if (builders < screepAmount.builder) {
                const newName: string = 'Builders' + stringify(Game.time);
                const builderBody: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE]
                if (_.sum(builderBody, part => BODYPART_COST[part]) >
                    Game.spawns[mySpawn].store.getFreeCapacity(RESOURCE_ENERGY)) {
                    console.log('Spwaning new builders: ' + newName);
                    Game.spawns[mySpawn].spawnCreep(builderBody, newName,
                        { memory: { role: 'builder' } })
                }
            } else if (upgrader < screepAmount.upgrader) {
                const newName: string = 'Upgrader' + stringify(Game.time);
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns[mySpawn].spawnCreep([WORK, CARRY, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } })
            }
        }
    }
}


